import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Icon from "@/components/common/Icon.jsx";
import { Reveal } from "@/components/home/primitives.jsx";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/serviceLinks.js";
import { COUNTRIES, countryByCode, digitsOnly } from "@/data/phoneCountries.js";
import "@/styles/service-form.css";

/**
 * "Get a free consultation" - the inline lead form on every service detail
 * page, and the consultation form at the foot of every blog post. One
 * shared component, so a design or validation change here is a change
 * everywhere it's dropped in.
 *
 * TWO STEPS. Step 1 is who you are (service, name, business, email,
 * phone); step 2 is what you need (role, brief, consent) and the submit.
 * Nine required fields in one column is a wall, and the fields that are
 * cheap to answer are the ones that should be asked first - somebody who
 * has filled in step 1 is far more likely to finish step 2 than somebody
 * who is looking at all nine at once.
 *
 * Both steps live in one <form> and one useForm(), so nothing is submitted
 * until the last step and nothing is lost going back. React Hook Form
 * keeps the values of unmounted fields (shouldUnregister defaults to
 * false), which is what lets step 1 be unmounted rather than hidden -
 * hidden fields stay in the tab order unless every stylesheet agrees not
 * to show them, and unmounting is the version that cannot be got wrong.
 *
 * Validated with react-hook-form + zod: every field is required (see
 * `schema` below), the phone number is checked against the digit count the
 * selected country actually uses, and the whole form re-validates on
 * change once a field has been touched, not only on submit - so a mistake
 * gets corrected before someone submits a second time. Step 1 validates
 * its OWN fields before it will advance (see STEP_FIELDS), so an error is
 * never carried into a step where the field that caused it is off screen.
 *
 * Posts to a GoHighLevel inbound webhook. This form has its own trigger,
 * separate from the lead popup's, so consultation requests and popup leads
 * can be worked as two different workflows - see WEBHOOK below. It sends
 * `service` and `source` with the lead, so nobody has to guess what the
 * request was about: on a service page that is the service, on a blog post
 * it is the article, which is the only way the reply can be written by
 * someone who has read what the visitor just read.
 */

/* This form's own GoHighLevel trigger. VITE_CONSULT_WEBHOOK_URL is the
   one to set; it falls back to the lead popup's trigger only so that a
   build with the new variable missing still delivers the lead somewhere
   real rather than dropping it. Both are committed in .env for the reason
   documented at the top of that file. */
const WEBHOOK = import.meta.env.VITE_CONSULT_WEBHOOK_URL || import.meta.env.VITE_LEAD_WEBHOOK_URL;

/* Which fields belong to which step. Step 1 is validated against this list
   before it will advance; the schema itself still validates everything on
   the final submit. `country` rides with `phone` because the phone rule is
   a cross-field check between the two. */
const STEP_FIELDS = {
  1: ["interest", "name", "business", "email", "country", "phone"],
  2: ["role", "message", "consent"],
};

const STEPS = [
  { n: 1, label: "About you" },
  { n: 2, label: "What you need" },
];

const ROLES = ["Owner / Founder", "CEO / President", "Manager", "Marketing lead", "Other"];

const schema = z
  .object({
    interest: z.string().min(1, "Select the service you need."),
    name: z.string().trim().min(1, "Please tell us your name."),
    business: z.string().trim().min(1, "Please tell us your business name."),
    email: z.string().trim().min(1, "We need an email to reply to.").email("That email doesn't look right."),
    country: z.string().min(1),
    phone: z.string().trim().min(1, "Please add a phone number we can reach you on."),
    role: z.string().min(1, "Select your role."),
    message: z.string().trim().min(10, "A little more detail, if you don't mind."),
    consent: z.boolean().refine((v) => v === true, { message: "We need your permission before we can contact you." }),
  })
  /* The phone rule depends on which country is selected, so it's a
     cross-field check rather than something z.string() alone can express. */
  .superRefine((data, ctx) => {
    const country = countryByCode(data.country);
    const digits = digitsOnly(data.phone);
    const [min, max] = country.digits;
    if (digits.length < min || digits.length > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: `Enter a valid ${country.name} number (${min === max ? min : `${min}-${max}`} digits).`,
      });
    }
  });

export default function ServiceEnquiryForm({
  service,
  eyebrow = "Get started",
  title,
  lede,
  points = [],
  id = "enquiry",
  /* Where this form lives, for the lead record. Defaults to the wording the
     service pages have always sent, so their leads are unchanged; the blog
     passes its own so a lead that came from an article says which article
     rather than looking like a service page enquiry. */
  sourceLabel,
}) {
  const source = sourceLabel || `Service page consultation request - ${service}`;
  const options = serviceOptions(service);
  const [status, setStatus] = useState("idle"); // idle | sending | done | fallback
  const [step, setStep] = useState(1);
  const stepHeadRef = useRef(null);
  /* The step the focus effect below last acted on. Starts equal to the
     initial step, so no focus moves until the visitor actually changes
     step - see the effect for why the guard is shaped like this. */
  const prevStep = useRef(step);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      interest: service || "",
      name: "",
      business: "",
      email: "",
      country: "US",
      phone: "",
      role: "",
      message: "",
      consent: false,
    },
  });

  const interest = watch("interest");
  const country = countryByCode(watch("country"));
  const name = watch("name");
  const email = watch("email");

  /* Moving between steps replaces everything the visitor was looking at, so
     focus goes to the new step's heading. Without this, focus stays on the
     Continue button - which no longer exists - and a keyboard or screen
     reader user is dropped back at the top of the document.

     THE GUARD COMPARES THE PREVIOUS STEP, not whether this is the first
     render, and it has to stay that way. Focusing an element scrolls it
     into view, so anything that lets this run when the step did NOT change
     drags the whole page down to the form - which is what a "have I
     mounted yet" flag did: StrictMode invokes an effect twice on mount, the
     first run set the flag and the second sailed past it, so every service
     page opened scrolled to the consultation form instead of at the top.

     Written this way the effect is idempotent: a second invocation with
     the same step finds prev === step and does nothing, whether it comes
     from StrictMode, a re-render or a future concurrent replay. */
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    stepHeadRef.current?.focus();
  }, [step]);

  /* Step 1's own fields only. `shouldFocus` puts the cursor in the first
     one that failed, which is the whole point of validating here rather
     than letting someone press Continue into a step that will be rejected
     by fields they can no longer see. */
  const goNext = async () => {
    if (await trigger(STEP_FIELDS[1], { shouldFocus: true })) setStep(2);
  };

  /* One <form>, two behaviours. Enter inside step 1 has to advance rather
     than submit - a browser fires submit on Enter in any text input, and
     without this the first step would try to send a half-filled lead. */
  const onFormSubmit = (ev) => {
    if (step === 1) {
      ev.preventDefault();
      goNext();
      return;
    }
    handleSubmit(onValid)(ev);
  };

  const onValid = async (data, ev) => {
    /* Honeypot: hidden from people and screen readers, filled by bots. Not
       part of the zod schema - it isn't a real field, just a trap. */
    if (ev?.currentTarget?.company_website?.value) return;

    const dialedCountry = countryByCode(data.country);
    const lead = {
      first_name: data.name.trim(),
      email: data.email.trim(),
      phone: `${dialedCountry.dial} ${data.phone.trim()}`,
      phone_country: dialedCountry.code,
      business_name: data.business.trim(),
      role: data.role,
      message: data.message.trim(),
      service: data.interest,
      consent: true,
      source,
      page: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    /* Only reachable if BOTH webhook variables are missing from the build.
       It never pretends the lead was sent - it shows the phone and email
       instead, which is the one thing worse than an error message to get
       wrong here. */
    if (!WEBHOOK) {
      if (import.meta.env.DEV) {
        console.warn("[ServiceEnquiryForm] No consultation webhook configured - the request was not sent.");
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

  return (
    <section className="sd-form-sec" id={id}>
      <div className="hv-container">
        <div className="sd-form__inner">
          {/* -- Left: why bother filling this in ------------------------- */}
          <Reveal className="sd-form__aside">
            {/* The real brand mark, not a stand-in icon - same asset the
                header uses (Header.jsx). */}
            <div className="sd-form__brand">
              <picture>
                <source type="image/webp" srcSet="/img/logo.webp 1x, /img/logo@2x.webp 2x" />
                <img
                  src="/img/logo.png"
                  srcSet="/img/logo.png 1x, /img/logo@2x.png 2x"
                  alt="GHLevelUp"
                  width={40}
                  height={34}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span>GHLevelUp</span>
            </div>

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

            {/* Fills out the column and backs the "no obligation" promise
                with something concrete rather than leaving white space
                under the phone/email links. */}
            <ul className="sd-form__steps">
              <li>
                <span>1</span>
                <div>
                  <b>You tell us what's going on</b>
                  <p>A few lines is enough - we'll ask follow-up questions if we need them.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <b>We reply with a plan, not a pitch</b>
                  <p>What we'd build, in what order, and what it costs - within one business day.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <b>You decide, no pressure</b>
                  <p>No retainer to sign before you've seen it. Say no and nothing happens.</p>
                </div>
              </li>
            </ul>

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
                <h3>Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""} - that's in.</h3>
                <p>
                  We've got your request about <strong>{interest}</strong> and someone will come back to you within
                  one business day.
                </p>
                <ul className="sd-form__result-next">
                  <li>
                    <Icon name="mail" aria-hidden="true" />A confirmation is on its way to {email.trim()}
                  </li>
                  <li>
                    <Icon name="clock" aria-hidden="true" />
                    Expect a reply within one business day
                  </li>
                </ul>
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
                  Something went wrong on our end, so rather than lose your request - email{" "}
                  <a href={SITE.emailHref}>{SITE.email}</a> or call {SITE.phone} and we'll pick it up directly.
                </p>
                <div className="sd-form__result-actions">
                  <button type="button" className="hv-btn hv-btn--primary" onClick={() => setStatus("idle")}>
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onFormSubmit} noValidate>
                <div className="sd-form__card-head">
                  <div>
                    <span>Free consultation for</span>
                    <strong>{interest}</strong>
                  </div>
                  <span className="sd-form__stepcount">
                    Step {step} <i>of {STEPS.length}</i>
                  </span>
                </div>

                {/* The progress rail. aria-hidden because the same thing is
                    said in real words by the step heading below it and by
                    the live region - three announcements of "step 2 of 2"
                    is two too many. */}
                <ol className="sd-form__progress" aria-hidden="true">
                  {STEPS.map((s) => (
                    <li
                      key={s.n}
                      className={`sd-form__progress-item${
                        s.n === step ? " is-current" : s.n < step ? " is-done" : ""
                      }`}
                    >
                      <span className="sd-form__progress-dot">
                        {s.n < step ? <Icon name="check" strokeWidth={3} /> : s.n}
                      </span>
                      <span className="sd-form__progress-label">{s.label}</span>
                    </li>
                  ))}
                </ol>

                {/* The one announcement of the change, for anyone who
                    cannot see the rail above. tabIndex -1 so the effect
                    above can move focus here without adding a tab stop. */}
                <h3 className="sd-form__steptitle" ref={stepHeadRef} tabIndex={-1}>
                  {step === 1 ? "About you" : "What you need"}
                  <span className="hv-sr-only"> - step {step} of {STEPS.length}</span>
                </h3>

                {step === 1 && (
                  <div className="sd-form__step">
                    {/* Auto-detected from the page this form is on, and always
                        editable - a visitor reading about one service can still
                        redirect the request to a different one before sending. */}
                    <div className={`${field("interest")} sd-form__field--interest`}>
                      <label htmlFor={`${id}-interest`}>
                        Which service do you need? <span aria-hidden="true">*</span>
                      </label>
                      <div className="sd-form__control">
                        <Icon name="layers" className="sd-form__control-icon" aria-hidden="true" />
                        <select id={`${id}-interest`} {...register("interest")}>
                          {options.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <Icon name="chevronDown" className="sd-form__chevron" aria-hidden="true" />
                      </div>
                      <p className="sd-form__hint">Auto-detected from this page - change it if you're after something else.</p>
                    </div>

                    <div className="sd-form__row">
                      <div className={field("name")}>
                        <label htmlFor={`${id}-name`}>
                          Your name <span aria-hidden="true">*</span>
                        </label>
                        <div className="sd-form__control">
                          <Icon name="users" className="sd-form__control-icon" aria-hidden="true" />
                          <input
                            id={`${id}-name`}
                            {...register("name")}
                            autoComplete="name"
                            placeholder="Jordan Reid"
                            aria-invalid={!!errors.name}
                          />
                        </div>
                        {errors.name && (
                          <p className="sd-form__err" role="alert">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className={field("business")}>
                        <label htmlFor={`${id}-business`}>
                          Business name <span aria-hidden="true">*</span>
                        </label>
                        <div className="sd-form__control">
                          <Icon name="building" className="sd-form__control-icon" aria-hidden="true" />
                          <input
                            id={`${id}-business`}
                            {...register("business")}
                            autoComplete="organization"
                            placeholder="Bright HVAC"
                            aria-invalid={!!errors.business}
                          />
                        </div>
                        {errors.business && (
                          <p className="sd-form__err" role="alert">
                            {errors.business.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sd-form__row">
                      <div className={field("email")}>
                        <label htmlFor={`${id}-email`}>
                          Email <span aria-hidden="true">*</span>
                        </label>
                        <div className="sd-form__control">
                          <Icon name="mail" className="sd-form__control-icon" aria-hidden="true" />
                          <input
                            id={`${id}-email`}
                            type="email"
                            {...register("email")}
                            autoComplete="email"
                            placeholder="you@business.com"
                            aria-invalid={!!errors.email}
                          />
                        </div>
                        {errors.email && (
                          <p className="sd-form__err" role="alert">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className={field("phone")}>
                        <label htmlFor={`${id}-phone`}>
                          Phone <span aria-hidden="true">*</span>
                        </label>
                        <div className="sd-form__phone">
                          <div className="sd-form__phone-country">
                            <span
                              className="sd-form__phone-badge"
                              aria-hidden="true"
                              style={{ "--badge-tint": country.tint }}
                            >
                              {country.code}
                            </span>
                            <select aria-label="Country" {...register("country")}>
                              {COUNTRIES.map((c) => (
                                <option key={c.code} value={c.code} title={c.name}>
                                  {c.dial}
                                </option>
                              ))}
                            </select>
                            <Icon name="chevronDown" className="sd-form__chevron" aria-hidden="true" />
                          </div>
                          <input
                            id={`${id}-phone`}
                            type="tel"
                            inputMode="tel"
                            {...register("phone")}
                            autoComplete="tel"
                            placeholder="(518) 555-0123"
                            aria-invalid={!!errors.phone}
                          />
                        </div>
                        {errors.phone && (
                          <p className="sd-form__err" role="alert">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="sd-form__step">
                    <div className={field("role")}>
                      <label htmlFor={`${id}-role`}>
                        Your role <span aria-hidden="true">*</span>
                      </label>
                      <div className="sd-form__control">
                        <Icon name="star" className="sd-form__control-icon" aria-hidden="true" />
                        <select id={`${id}-role`} {...register("role")}>
                          <option value="">Select your role</option>
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <Icon name="chevronDown" className="sd-form__chevron" aria-hidden="true" />
                      </div>
                      {errors.role && (
                        <p className="sd-form__err" role="alert">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    <div className={field("message")}>
                      <label htmlFor={`${id}-message`}>
                        What do you need? <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id={`${id}-message`}
                        rows={4}
                        {...register("message")}
                        placeholder="e.g. We miss most calls after 5pm and at weekends, and we want them booked instead of going to voicemail."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="sd-form__err" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className={`sd-form__consent${errors.consent ? " sd-form__consent--error" : ""}`}>
                      <label>
                        <input type="checkbox" {...register("consent")} aria-invalid={!!errors.consent} />
                        <span>
                          I agree to be contacted by GHLevelUp about this request. Msg &amp; data rates may apply; reply
                          STOP to opt out. See our <Link to="/privacy">Privacy Policy</Link>.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="sd-form__err" role="alert">
                          {errors.consent.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Honeypot - hidden from people and assistive tech, not a
                    registered react-hook-form field. Outside both steps, so
                    it is in the DOM for the whole time a bot is filling the
                    form in rather than only during the last step. */}
                <input className="sd-form__hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                {/* Back is a real button, not a link, and comes first in the
                    DOM so the tab order runs back-then-forward the way the
                    two buttons are read. On a phone they stack with the
                    forward action on top - see service-form.css. */}
                <div className="sd-form__actions">
                  {step === 2 && (
                    <button
                      type="button"
                      className="hv-btn hv-btn--outline hv-btn--lg sd-form__back"
                      onClick={() => setStep(1)}
                      disabled={status === "sending"}
                    >
                      <Icon name="chevronLeft" aria-hidden="true" />
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="hv-btn hv-btn--primary hv-btn--lg sd-form__submit"
                    disabled={status === "sending"}
                  >
                    {step === 1 ? "Continue" : status === "sending" ? "Sending..." : "Get Free Consultation"}
                    {status !== "sending" && <Icon name="arrowRight" aria-hidden="true" />}
                  </button>
                </div>

                <ul className="sd-form__trust">
                  <li>
                    <Icon name="shieldCheck" aria-hidden="true" />
                    Your details stay private
                  </li>
                  <li>
                    <Icon name="clock" aria-hidden="true" />
                    Reply within 1 business day
                  </li>
                </ul>

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

/* The full real-page service list, for the "which service" field every
   copy of this form now carries. `service` (the prop) is whatever the page
   that rendered this form calls itself - usually one of these titles
   exactly, since it's service pages that render it, but the blog and the
   Work case-study template pass their own descriptive string instead ("the
   Autumn Sale Campaign article", `A project like "X"`). Rather than force
   every caller's `service` to match this list, the dropdown is built from
   the real list PLUS the caller's own value if it isn't already in it - so
   the field is always genuinely pre-selected to what the visitor was just
   reading, never blank, and a blog reader can still redirect it to an
   actual service before they submit. */
function serviceOptions(current) {
  const known = Object.values(SERVICES).map((s) => s.title);
  if (!current || known.includes(current)) return known;
  return [current, ...known];
}
