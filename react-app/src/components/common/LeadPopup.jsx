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
  "Website or App Development",
  "Creative Design",
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
  const dialogRef = useRef(null);
  const returnFocus = useRef(null);

  const quiet = QUIET_ROUTES.includes(pathname);

  useEffect(() => {
    if (quiet || shownThisVisit || !shouldShow()) return;
    const id = setTimeout(() => {
      shownThisVisit = true;
      returnFocus.current = document.activeElement;
      setOpen(true);
    }, DELAY);
    return () => clearTimeout(id);
  }, [quiet]);

  const close = () => {
    if (status !== "done") writeState("dismissed");
    setLeaving(true);
    setTimeout(() => {
      setOpen(false);
      setLeaving(false);
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

  // Leaving a page for a quiet route (e.g. clicking "Book") closes it.
  useEffect(() => {
    if (open && quiet) setOpen(false);
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
