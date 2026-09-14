import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/cookie-consent.css";

const STORAGE_KEY = "ghlu-cookie-consent";
/** How long after the page opens before the notice slides in. */
const DELAY = 2500;

/* localStorage can throw (private windows, storage disabled, sandboxed
   iframes). A failure to read means "ask"; a failure to write just means
   the notice may come back next visit - never a broken page. */
function readChoice() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function saveChoice(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: new Date().toISOString() }));
  } catch {
    /* see readChoice */
  }
}

/**
 * Cookie & privacy notice, on every page (mounted once in Layout).
 *
 * Appears DELAY ms after the page opens, and only if the visitor has not
 * already answered. The answer is stored, so it is asked once per browser.
 *
 * Deliberately non-modal: it is a region announced politely, not a dialog
 * that grabs focus or traps the keyboard. Someone mid-way through reading
 * a page should not be yanked into a popup, and the site stays fully
 * usable while it is up.
 *
 * IMPORTANT - this records the choice; it does not yet enforce it. Any
 * non-essential script (the chat widget, analytics, ad pixels) still loads
 * regardless. To honour "Decline", those scripts need to check
 * `hasCookieConsent()` before loading. That wiring depends on which tools
 * you run, so it is not done here.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (readChoice()) return;
    const id = setTimeout(() => setVisible(true), DELAY);
    return () => clearTimeout(id);
  }, []);

  const answer = (value) => {
    saveChoice(value);
    window.dispatchEvent(new CustomEvent("ghlu:cookie-consent", { detail: value }));
    setLeaving(true);
    // Let the exit animation play before unmounting.
    setTimeout(() => setVisible(false), 320);
  };

  if (!visible) return null;

  return (
    <section
      className={`cc${leaving ? " is-leaving" : ""}`}
      role="region"
      aria-labelledby="cc-title"
      aria-live="polite"
    >
      <div className="cc__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01" />
        </svg>
      </div>

      <div className="cc__copy">
        <h2 className="cc__title" id="cc-title">
          We value your privacy
        </h2>
        <p className="cc__text">
          We use cookies to keep the site working, understand how it is used and improve your experience. Read our{" "}
          <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms</Link>.
        </p>
      </div>

      <div className="cc__actions">
        <button type="button" className="cc__btn cc__btn--ghost" onClick={() => answer("declined")}>
          Decline
        </button>
        <button type="button" className="cc__btn cc__btn--solid" onClick={() => answer("accepted")}>
          Accept all
        </button>
      </div>
    </section>
  );
}

/** For scripts that should only run with consent. */
export function hasCookieConsent() {
  try {
    return JSON.parse(readChoice() || "null")?.value === "accepted";
  } catch {
    return false;
  }
}
