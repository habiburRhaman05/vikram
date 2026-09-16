import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { Reveal } from "@/components/home/primitives.jsx";
import { SITE } from "@/data/site";
import "@/styles/service-form.css";

/**
 * "Get this service" - the inline enquiry form on every service detail page.
 *
 * Posts to the same GoHighLevel inbound webhook the lead popup uses
 * (VITE_LEAD_WEBHOOK_URL), so both entry points land in one workflow. The
 * difference is `service` and `source`: this form knows which service page
 * it was submitted from and sends that with the lead, so nobody has to
 * guess what the enquiry was about.
 *
 * It is a real section rather than a modal on purpose - a visitor who has
 * read the whole page should not have to hunt for a button to open a popup.
 *
 * Validation is on submit, not per keystroke: flagging an email as invalid
 * while someone is still halfway through typing it is noise. Once a field
 * has been flagged, correcting it clears its own error immediately.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/* Deliberately loose: people write numbers with spaces, brackets, dots and
   country codes, and rejecting a real number is far more costly here than
   accepting a malformed one that a human will read anyway. */
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

const WEBHOOK = import.meta.env.VITE_LEAD_WEBHOOK_URL;

const BUDGETS = ["Not sure yet", "Under $1,000", "$1,000 - $3,000", "$3,000 - $7,500", "$7,500+"];
const TIMELINES = ["As soon as possible", "Within a month", "This quarter", "Just researching"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  business: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
};

export default function ServiceEnquiryForm({
  service,
  eyebrow = "Get started",
  title,
  lede,
  points = [],
  id = "enquiry",
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | fallback

  const set = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => {
      if (!(field in e)) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Please tell us your name.";

    if (!values.email.trim()) e.email = "We need an email to reply to.";
    else if (!EMAIL_RE.test(values.email.trim())) e.email = "That email doesn't look right.";

    /* Phone is optional - but if it is filled in, it has to be usable. */
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) {
      e.phone = "Enter a phone number we can actually dial.";
    }

    if (!values.message.trim()) e.message = "Tell us briefly what you need - it makes the first reply useful.";
    else if (values.message.trim().length < 10) e.message = "A little more detail, if you don't mind.";

    if (!values.consent) e.consent = "We need your permission before we can contact you.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    /* Honeypot: hidden from people and screen readers, filled by bots. */
    if (ev.currentTarget.company_website?.value) return;

    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      requestAnimationFrame(() => {
        document
          .querySelector(`#${id} .sd-form__field--error input, #${id} .sd-form__field--error textarea`)
          ?.focus();
      });
      return;
    }
    setErrors({});

    const lead = {
      first_name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      business_name: values.business.trim(),
      budget: values.budget,
      timeline: values.timeline,
      message: values.message.trim(),
      /* What this form adds over the popup: which service was being read. */
      service,
      consent: true,
      source: `Service page enquiry - ${service}`,
      page: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    if (!WEBHOOK) {
      if (import.meta.env.DEV) {
        console.warn("[ServiceEnquiryForm] VITE_LEAD_WEBHOOK_URL is not set - enquiry was not sent.");
      }
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
      setStatus("done");
    } catch {
      /* Never pretend it worked - send them to a channel that does. */
      setStatus("fallback");
    }
  };

  const field = (name) => `sd-form__field${errors[name] ? " sd-form__field--error" : ""}`;
  const msgId = (name) => (errors[name] ? `${id}-${name}-err` : undefined);

  return (
    <section className="sd-form-sec" id={id}>
      <div className="hv-container">
        <div className="sd-form__inner">
          {/* -- Left: why bother filling this in ------------------------- */}
          <Reveal className="sd-form__aside">
            <span className="hv-eyebrow">{eyebrow}</span>
            <h2 className="sd-form__title">{title || `Get ${service}`}</h2>
            {lede && <p className="sd-form__lede">{lede}</p>}

            {points.length > 0 && (
              <ul className="sd-form__points">
                {points.map((p) => (
                  <li key={p}>
                    <Icon name="check" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <div className="sd-form__direct">
              <p>Would rather just talk?</p>
              <a href={SITE.phoneHref} className="sd-form__direct-link">
                <Icon name="phone" aria-hidden="true" />
                {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="sd-form__direct-link">
                <Icon name="mail" aria-hidden="true" />
                {SITE.email}
              </a>
            </div>
          </Reveal>

          {/* -- Right: the form ----------------------------------------- */}
          <Reveal className="sd-form__card" index={1}>
            {status === "done" ? (
              <div className="sd-form__result" role="status">
                <span className="sd-form__tick" aria-hidden="true">
                  <Icon name="check" />
                </span>
                <h3>Thanks{values.name.trim() ? `, ${values.name.trim().split(" ")[0]}` : ""} - that's in.</h3>
                <p>
                  We've got your enquiry about <strong>{service}</strong> and someone will come back to you
                  within one business day.
                </p>
                <div className="sd-form__result-actions">
                  <Link to="/book" className="hv-btn hv-btn--primary">
                    Pick a time now
                    <Icon name="arrowRight" />
                  </Link>
                  <Link to="/services" className="hv-btn hv-btn--ghost">
                    Browse other services
                  </Link>
                </div>
              </div>
            ) : status === "fallback" ? (
              <div className="sd-form__result" role="alert">
                <span className="sd-form__tick sd-form__tick--warn" aria-hidden="true">
                  <Icon name="phone" />
                </span>
                <h3>That didn't send</h3>
                <p>
                  Something went wrong on our end, so rather than lose your enquiry - email{" "}
                  <a href={SITE.emailHref}>{SITE.email}</a> or call {SITE.phone} and we'll pick it up directly.
                </p>
                <div className="sd-form__result-actions">
                  <button type="button" className="hv-btn hv-btn--primary" onClick={() => setStatus("idle")}>
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="sd-form__card-head">
                  <span>Enquiry for</span>
                  <strong>{service}</strong>
                </p>

                <div className="sd-form__row">
                  <div className={field("name")}>
                    <label htmlFor={`${id}-name`}>
                      Your name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${id}-name`}
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoComplete="name"
                      placeholder="Jordan Reid"
                      aria-invalid={!!errors.name}
                      aria-describedby={msgId("name")}
                    />
                    {errors.name && (
                      <p className="sd-form__err" id={`${id}-name-err`} role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={field("business")}>
                    <label htmlFor={`${id}-business`}>Business name</label>
                    <input
                      id={`${id}-business`}
                      value={values.business}
                      onChange={(e) => set("business", e.target.value)}
                      autoComplete="organization"
                      placeholder="Bright HVAC"
                    />
                  </div>
                </div>

                <div className="sd-form__row">
                  <div className={field("email")}>
                    <label htmlFor={`${id}-email`}>
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${id}-email`}
                      type="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                      placeholder="you@business.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={msgId("email")}
                    />
                    {errors.email && (
                      <p className="sd-form__err" id={`${id}-email-err`} role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className={field("phone")}>
                    <label htmlFor={`${id}-phone`}>
                      Phone <i>(optional)</i>
                    </label>
                    <input
                      id={`${id}-phone`}
                      type="tel"
                      inputMode="tel"
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      autoComplete="tel"
                      placeholder="(518) 555-0123"
                      aria-invalid={!!errors.phone}
                      aria-describedby={msgId("phone")}
                    />
                    {errors.phone && (
                      <p className="sd-form__err" id={`${id}-phone-err`} role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sd-form__row">
                  <div className={field("budget")}>
                    <label htmlFor={`${id}-budget`}>Rough budget</label>
                    <div className="sd-form__select">
                      <select id={`${id}-budget`} value={values.budget} onChange={(e) => set("budget", e.target.value)}>
                        <option value="">Select a range</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevronDown" aria-hidden="true" />
                    </div>
                  </div>

                  <div className={field("timeline")}>
                    <label htmlFor={`${id}-timeline`}>Timeline</label>
                    <div className="sd-form__select">
                      <select
                        id={`${id}-timeline`}
                        value={values.timeline}
                        onChange={(e) => set("timeline", e.target.value)}
                      >
                        <option value="">Select a timeline</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevronDown" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className={field("message")}>
                  <label htmlFor={`${id}-message`}>
                    What do you need? <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={`${id}-message`}
                    rows={4}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="e.g. We miss most calls after 5pm and at weekends, and we want them booked instead of going to voicemail."
                    aria-invalid={!!errors.message}
                    aria-describedby={msgId("message")}
                  />
                  {errors.message && (
                    <p className="sd-form__err" id={`${id}-message-err`} role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot - hidden from people and assistive tech. */}
                <input className="sd-form__hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className={`sd-form__consent${errors.consent ? " sd-form__consent--error" : ""}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                    />
                    <span>
                      I agree to be contacted by GHLevelUp about this enquiry. Msg &amp; data rates may apply;
                      reply STOP to opt out. See our <Link to="/privacy">Privacy Policy</Link>.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="sd-form__err" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button type="submit" className="hv-btn hv-btn--primary hv-btn--lg sd-form__submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send my enquiry"}
                  {status !== "sending" && <Icon name="arrowRight" />}
                </button>

                <p className="sd-form__small">
                  No obligation, and we reply within one business day. Prefer a call?{" "}
                  <Link to="/book">Book a 20-minute slot</Link>.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
