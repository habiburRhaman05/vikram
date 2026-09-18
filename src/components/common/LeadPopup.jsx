import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "@/styles/lead-popup.css";

/** How long after the page opens before the popup appears. Later than the
 *  cookie notice (2.5s) so the two never arrive in the same moment. */
const DELAY = 7000;
/** After a visitor closes it without submitting, stay away this long. */
const SNOOZE_DAYS = 7;
const STORAGE_KEY = "ghlu-lead-popup";
/* Module scope, not a ref: every page renders its own Layout, so a ref would
   reset on each navigation and the popup could come back page after page. */
let shownThisVisit = false;

/* Pages where the visitor is already converting (or reading legal text) -
   interrupting them there would cost leads, not win them. */
const QUIET_ROUTES = ["/book", "/contact", "/privacy", "/terms"];

/**
 * A CTA elsewhere in the app (the Industries page's profession cards)
 * opens this SAME popup on demand, rather than each one navigating to its
 * own page. LeadPopup is a singleton mounted once in Layout, so a plain
 * window event is enough to reach it from anywhere in the tree without
 * wiring a context provider through the whole app just for one on/off
 * signal.
 *
 * openLeadPopup() bypasses the auto-play gating entirely (shownThisVisit,
 * the snooze window, QUIET_ROUTES) - those exist to stop the TIMED popup
 * from being pushy, not to stop a visitor who explicitly clicked a button
 * asking to see this form.
 *
 * Pass `{ profession }` and the popup opens with that answer already made -
 * the Industries page's profession cards use it, so clicking "Realtor"
 * doesn't ask the visitor to type "Realtor" again. The optional payload is
 * read defensively: `onClick={openLeadPopup}` passes the click event itself
 * as the first argument, and an event has no `profession`.
 */
const OPEN_EVENT = "ghlu:open-lead-popup";
export function openLeadPopup(payload) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: payload || null }));
}

/* Where submissions go: a GoHighLevel "Inbound Webhook" workflow trigger
   (Automation > Workflows > Inbound Webhook). Set it in .env as
   VITE_LEAD_WEBHOOK_URL. Until it is set, the form does NOT pretend to
   succeed - it sends the visitor to the booking page instead, so a lead is
   never silently dropped. */
const WEBHOOK = import.meta.env.VITE_LEAD_WEBHOOK_URL;

const SERVICES = [
  "CRM & GoHighLevel",
  "AI Automation",
  "Marketing",
  "Funnels, Website & GHL Services",
  "Not sure yet",
];

const BENEFITS = [
  "A free 30-minute strategy call",
  "A clear plan for capturing and following up every lead",
  "No contracts, no hard sell",
];

function readState() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}
function writeState(state) {
  /* Dev never remembers a dismissal. Closing the popup once while working
     on something else otherwise hides it for a week, which is impossible
     to tell apart from the popup being broken. A real submission is still
     recorded, so the "thanks" path can be tested end to end. */
  if (import.meta.env.DEV && state === "dismissed") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    /* storage blocked - the popup may simply come back next visit */
  }
}
function shouldShow() {
  const saved = readState();
  if (!saved) return true;
  if (saved.state === "submitted") return false;
  return Date.now() - saved.at > SNOOZE_DAYS * 864e5;
}

/**
 * `?leadpopup` on any URL shows the popup straight away and ignores every
 * gate - the snooze window, the once-per-visit flag and QUIET_ROUTES.
 *
 * Without it there is no way to see the popup again on a built site once
 * it has been dismissed, short of clearing localStorage by hand. That is
 * what makes a working popup look like a broken one during review.
 */
function isForced() {
  try {
    return new URLSearchParams(window.location.search).has("leadpopup");
  } catch {
    return false;
  }
}

/**
 * Timed lead-capture popup, mounted once in Layout.
 *
 * A true modal (unlike the cookie notice): it takes focus, traps Tab
 * inside, closes on Escape or a click on the backdrop, locks page scroll,
 * and hands focus back to wherever it was when it closes.
 *
 * Shown once per visit at most; closing it snoozes it for SNOOZE_DAYS, and
 * submitting stops it for good.
 */
export default function LeadPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | fallback
  const [firstName, setFirstName] = useState("");
  /* The trade the visitor clicked through from ("Realtor", "CPA"), if any.
     Shown back to them as a removable chip and carried into the submitted
     lead, so the answer survives the click and reaches the CRM. */
  const [profession, setProfession] = useState("");
  const dialogRef = useRef(null);
  const returnFocus = useRef(null);

  const quiet = QUIET_ROUTES.includes(pathname);

  useEffect(() => {
    const forced = isForced();
    if (!forced && (quiet || shownThisVisit || !shouldShow())) return;
    const id = setTimeout(
      () => {
        shownThisVisit = true;
        returnFocus.current = document.activeElement;
        setOpen(true);
      },
      forced ? 300 : DELAY
    );
    return () => clearTimeout(id);
  }, [quiet]);

  // A CTA button elsewhere in the app asked for this explicitly - open
  // regardless of the timer, the snooze window or the current route.
  useEffect(() => {
    const onOpenRequest = (e) => {
      shownThisVisit = true;
      setProfession((e.detail && e.detail.profession) || "");
      returnFocus.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_EVENT, onOpenRequest);
  }, []);

  const close = () => {
    if (status !== "done") writeState("dismissed");
    setLeaving(true);
    setTimeout(() => {
      setOpen(false);
      setLeaving(false);
      /* Cleared on the way out: the timed popup can open days later, and it
         must not still be claiming a profession nobody asked about. */
      setProfession("");
      returnFocus.current?.focus?.();
    }, 300);
  };

  // Focus, scroll lock, Escape and the Tab trap - only while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        const items = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea'
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
    // close is stable enough for this purpose; re-binding on status change is unnecessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Leaving a page for a quiet route (e.g. clicking "Book") closes it -
  // unless ?leadpopup is on the URL, which outranks every gate by design.
  useEffect(() => {
    if (open && quiet && !isForced()) setOpen(false);
  }, [open, quiet]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("company_website")) return; // honeypot: bots fill hidden fields

    const lead = {
      first_name: String(form.get("first_name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      service: form.get("service") || "",
      /* Empty string rather than omitted, so a workflow in GoHighLevel sees
         the same field on every submission. */
      profession: profession || "",
      consent: form.get("consent") === "on",
      source: "Website lead popup",
      page: window.location.href,
      submitted_at: new Date().toISOString(),
    };
    setFirstName(lead.first_name);

    if (!WEBHOOK) {
      if (import.meta.env.DEV) console.warn("[LeadPopup] VITE_LEAD_WEBHOOK_URL is not set - lead was not sent.");
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeState("submitted");
      setStatus("done");
    } catch {
      setStatus("fallback");
    }
  };

  if (!open) return null;

  return (
    <div
      className={`lp${leaving ? " is-leaving" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="lp__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lp-title"
        aria-describedby="lp-desc"
        tabIndex={-1}
      >
        <button type="button" className="lp__close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <aside className="lp__brand">
          <span className="lp__glow" aria-hidden="true" />
          <div className="lp__logo">
            <picture>
              <source type="image/webp" srcSet="/img/logo.webp 1x, /img/logo@2x.webp 2x" />
              <img src="/img/logo.png" srcSet="/img/logo.png 1x, /img/logo@2x.png 2x" alt="" width="51" height="44" />
            </picture>
            <span>
              <b>GH</b>LevelUp
            </span>
          </div>

          <span className="lp__eyebrow">Free growth plan</span>
          <h2 className="lp__title" id="lp-title">
            Turn more visitors into <em>booked customers</em>
          </h2>
          <p className="lp__desc" id="lp-desc">
            Tell us a little about your business and we will map out the system that captures, follows up and converts
            every lead.
          </p>

          <ul className="lp__benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <p className="lp__foot">US-based team · Albany, NY</p>
        </aside>

        <div className="lp__panel">
          {status === "done" ? (
            <div className="lp__result" role="status">
              <span className="lp__tick" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
              </span>
              <h3>You're in{firstName ? `, ${firstName}` : ""}!</h3>
              <p>Thanks for reaching out. Someone from our team will contact you within one business day.</p>
              <div className="lp__result-actions">
                <Link to="/book" className="lp__submit" onClick={close}>
                  Pick a time now
                </Link>
                <button type="button" className="lp__text-btn" onClick={close}>
                  Keep browsing
                </button>
              </div>
            </div>
          ) : status === "fallback" ? (
            <div className="lp__result" role="alert">
              <span className="lp__tick lp__tick--warn" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 8v5M12 16.5v.01" />
                </svg>
              </span>
              <h3>Let's finish this on our booking page</h3>
              <p>
                We couldn't send your details from here. Grab a time on the calendar instead - it only takes a
                minute.
              </p>
              <div className="lp__result-actions">
                <Link to="/book" className="lp__submit" onClick={close}>
                  Book my free call
                </Link>
                <button type="button" className="lp__text-btn" onClick={() => setStatus("idle")}>
                  Try again
                </button>
              </div>
            </div>
          ) : (
            <form className="lp__form" onSubmit={onSubmit}>
              <h3 className="lp__form-title">Where should we send your plan?</h3>

              <div className="lp__row">
                <label className="lp__field">
                  <span>First name</span>
                  <input name="first_name" autoComplete="given-name" required placeholder="Jordan" />
                </label>
                <label className="lp__field">
                  <span>
                    Phone <i>(optional)</i>
                  </span>
                  <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(518) 555-0123" />
                </label>
              </div>

              <label className="lp__field">
                <span>Work email</span>
                <input name="email" type="email" autoComplete="email" required placeholder="you@business.com" />
              </label>

              <label className="lp__field">
                <span>What do you need help with?</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>

              {/* Only rendered when the visitor arrived by answering a
                  profession card on /industries - it is their own answer
                  echoed back, not a field they have to fill in. */}
              {profession && (
                <p className="lp__preset">
                  <span>
                    You picked <strong>{profession}</strong>
                  </span>
                  <button
                    type="button"
                    className="lp__preset-x"
                    onClick={() => setProfession("")}
                    aria-label={`Remove ${profession}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </p>
              )}

              {/* Honeypot - hidden from people and screen readers, filled by bots. */}
              <input className="lp__hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <label className="lp__consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I agree to be contacted by GHLevelUp by phone, text and email about my enquiry. Msg &amp; data rates
                  may apply; reply STOP to opt out. See our <Link to="/privacy">Privacy Policy</Link>.
                </span>
              </label>

              <button type="submit" className="lp__submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Get My Free Plan"}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>

              <button type="button" className="lp__text-btn lp__later" onClick={close}>
                No thanks, maybe later
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
