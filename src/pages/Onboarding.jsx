import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import { TextField, TextAreaField, RadioGroup, PillGroup, Checkbox } from "@/components/onboarding/fields.jsx";
import { SelectField, PhoneField } from "@/components/onboarding/Combobox.jsx";
import CredentialsRepeater from "@/components/onboarding/CredentialsRepeater.jsx";
import StepCard from "@/components/onboarding/StepCard.jsx";
import StepProgress from "@/components/onboarding/StepProgress.jsx";
import {
  validateStep,
  registrationTypesFor,
  registrationTypeMeta,
  phoneToE164,
  postalPlaceholder,
} from "@/lib/onboardingValidation.js";
import {
  COUNTRIES,
  LANGUAGES,
  citiesFor,
  countryByName,
  detectedTimeZone,
  languageNameForCode,
  postalLabelFor,
  regionLabelFor,
  regionsFor,
} from "@/data/locations.js";
import { SITE } from "@/data/site.js";
import {
  STEP_META,
  BUSINESS_NICHES,
  BUSINESS_TYPES,
  JOB_TITLES,
  SERVICES_WANTED,
  INTEGRATIONS,
  CRM_CONNECTIONS,
  WEBSITE_NEEDS,
  createInitialFormData,
} from "@/data/onboarding.js";

import "@/styles/home-redesign.css";
import "@/styles/onboarding.css";

/* Where a submission goes: a GoHighLevel "Inbound Webhook" workflow trigger,
   same pattern as LeadPopup.jsx's VITE_LEAD_WEBHOOK_URL. Every submission from
   this wizard - all four sections, flattened by buildPayload below - is POSTed
   here as one JSON body, and the workflow behind it is what turns that into a
   contact and kicks off onboarding.

   THIS TRIGGER IS THE ONBOARDING ONE, and only onboarding: the account's other
   workflows sit behind their own trigger ids (the consultation form and the
   lead popup each have their own), so pointing this at the wrong id does not
   fail loudly - the hook accepts the payload and the lead simply never reaches
   the pipeline. The live trigger URL is baked in below so the page works with
   no build-time config; set VITE_ONBOARDING_WEBHOOK_URL in .env to point a
   deployment at a different workflow (staging, a second sub-account). */
const DEFAULT_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/fF6CHXWPpn5wTiMZjc7x/webhook-trigger/537ba686-0127-4275-a729-9dafa41129d4";
const WEBHOOK = import.meta.env.VITE_ONBOARDING_WEBHOOK_URL || DEFAULT_WEBHOOK;

const LAST_STEP = STEP_META.length - 1;

/* GoHighLevel's inbound webhook sometimes accepts the connection but takes
   its time answering; without a deadline the submit button sits on
   "Submitting..." for as long as the browser is willing to wait, which is
   the "form hangs" report this constant answers. The workflow almost always
   fired long before this fires - we give up waiting, not sending. */
const SUBMIT_TIMEOUT_MS = 12000;

/* Option lists are built once at module scope: they're derived from static
   ISO data, and rebuilding 250 country objects on every keystroke would make
   typing in the country box stutter. */
const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  value: c.name,
  label: c.name,
  hint: c.dial,
  flag: c.flag,
  keywords: `${c.code} ${c.continent}`,
}));

/* Time Zone, Business Currency, Business Website, Branded Domain and
   Regions of Operation used to be fields on step 1 (and a 22-entry time zone
   picker, and a 160-entry currency picker, and a subsection of regions on
   step 2). None of them needed asking:
     - the time zone is the one the visitor's browser reports, and the CRM
       only ever used it to schedule in their local time;
     - the currency follows from the country that is already being asked for;
     - a website is either visible in the email domain they just gave us or
       it is the thing we build for them;
     - "where do you sell" was answered by country + the services they picked.
   The wizard is shorter for it, and every one of those answers still reaches
   the webhook (see buildPayload) because we can derive it.

   Everything that remains and is not required now says Optional in its own
   label - see FieldShell in components/onboarding/fields.jsx. */
const LANGUAGE_OPTIONS = LANGUAGES;
const NICHE_OPTIONS = BUSINESS_NICHES;
const JOB_TITLE_OPTIONS = JOB_TITLES;

/** Join a multi-select into one string - GoHighLevel's inbound trigger maps
 *  flat text fields, not arrays, and "Voice AI, Lead Nurture" reads the same
 *  in a workflow email as the list did on screen. */
const joinList = (values) => (Array.isArray(values) ? values.join(", ") : values || "");

const clean = (value) => String(value ?? "").trim();

/** Flat, snake_case keys: what comes out of the wizard is nested (arrays,
 *  a credentials repeater, booleans) and every one of those would land in
 *  GoHighLevel as an unusable blob. `message` carries the same information
 *  as readable text so a notification email can just print one field.
 *
 *  Phone numbers are sent in E.164 (+15182509662) because a workflow can
 *  text or dial that directly; the dial code the visitor picked is included
 *  separately in case the number itself looked odd. */
function buildPayload(formData, rowCount) {
  const countryCode =
    countryByName(formData.country)?.code || formData.businessPhoneCountry || "";

  const credentials = formData.credentials
    .filter((row) => clean(row.username) || clean(row.password))
    .map((row) => `${clean(row.platformName) || `Access ${row.id}`}: ${clean(row.username) || "-"} / ${clean(row.password) || "-"}`)
    .join(" | ");

  const payload = {
    source: "Onboarding wizard",
    page: window.location.href,
    submitted_at: new Date().toISOString(),

    // Section 1 - General Business Info
    /* The wizard asks for the business name once now (Legal Business Name -
       see StepBusinessInfo) rather than a separate "friendly" name.
       friendly_business_name is still sent, mirroring the same value, so an
       existing GoHighLevel workflow mapped to that key keeps working. */
    friendly_business_name: clean(formData.legalBusinessName),
    legal_business_name: clean(formData.legalBusinessName),
    business_email: clean(formData.businessEmail),
    business_phone: phoneToE164(formData.businessPhone, formData.businessPhoneCountry || countryCode),
    business_phone_raw: clean(formData.businessPhone),
    business_phone_country: formData.businessPhoneCountry || countryCode,
    business_niche: formData.businessNiche,
    business_currency: formData.businessCurrency,
    street_address: clean(formData.streetAddress),
    city: clean(formData.city),
    state_region: formData.stateRegion,
    postal_zip: clean(formData.postalZip),
    country: formData.country,
    country_code: countryCode,
    time_zone: formData.timeZone,
    platform_language: formData.platformLanguage,
    outbound_comm_language: formData.outboundCommLanguage,

    // Section 2 - Business Registration
    business_type: formData.businessType,
    registration_id_type: formData.registrationIdType,
    registration_number: clean(formData.registrationNumber),
    not_registered: formData.notRegistered ? "Yes" : "No",
    rep_first_name: clean(formData.repFirstName),
    rep_last_name: clean(formData.repLastName),
    rep_email: clean(formData.repEmail),
    rep_job_title: formData.repJobTitle,
    rep_phone: phoneToE164(formData.repPhone, formData.repPhoneCountry || countryCode),
    rep_phone_raw: clean(formData.repPhone),
    rep_phone_country: formData.repPhoneCountry || countryCode,

    // Section 3 - Services & Integrations
    services_wanted: joinList(formData.servicesWanted),
    goals_description: clean(formData.goalsDescription),
    integrations: joinList(formData.integrations),
    other_tool: clean(formData.otherTool),
    needs_new_website: formData.needsNewWebsite,
    connect_crm: joinList(formData.connectCrm),

    // Section 4 - Access & Credentials
    credentials,
    credentials_shared: rowCount ? String(rowCount) : "None",
  };

  payload.message = [
    `New CRM onboarding: ${payload.friendly_business_name || payload.legal_business_name || "(no name given)"}`,
    `Contact: ${payload.rep_first_name} ${payload.rep_last_name} - ${payload.rep_email} - ${payload.rep_phone}`,
    `Business: ${payload.business_phone} - ${payload.business_email}`,
    `Industry: ${payload.business_niche} | Currency: ${payload.business_currency} | Type: ${payload.business_type}`,
    `Address: ${payload.street_address}, ${payload.city}, ${payload.state_region} ${payload.postal_zip}, ${payload.country}`,
    `Services wanted: ${payload.services_wanted}`,
    `Goals: ${payload.goals_description || "-"}`,
    `Integrations: ${payload.integrations || "-"}${payload.other_tool ? `, ${payload.other_tool}` : ""}`,
    `Time zone: ${payload.time_zone} (${payload.country_code})`,
    `Credentials shared: ${credentials || "None"}`,
  ].join("\n");

  return payload;
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  /* The browser already knows the visitor's time zone, and it's right far
     more often than it's wrong - seeded here rather than in an effect so it
     never overwrites an answer on a return visit. */
  const [formData, setFormData] = useState(() => ({
    ...createInitialFormData(),
    timeZone: detectedTimeZone(),
  }));
  const [errors, setErrors] = useState({});
  /* "warn" shares the done screen but marks the tick amber: the visitor is
     through, the delivery just couldn't be confirmed. */
  const [status, setStatus] = useState("idle"); // idle | sending | done | warn
  const shellRef = useRef(null);
  const firstRender = useRef(true);
  /* The smooth scroll effect on `step` runs one frame later than the click
     that set the step (requestAnimationFrame inside focusFirstError), so a
     fast Back → Continue can leave a scroll scheduled for a step this visit
     is no longer on. Cancelling keeps the page from yanking back on its own
     - one of the small "it feels stuck" janks. */
  const scrollRaf = useRef(0);
  /* Once the visitor picks a dial code by hand, changing the country must
     stop overwriting that choice. */
  const manualPhoneCountry = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => cancelAnimationFrame(scrollRaf.current);
  }, [step]);

  /* The result card replaces four steps' worth of form, so a visitor who
     submits from the bottom of the page would otherwise land on a short card
     with the tick out of view. */
  useEffect(() => {
    if (status === "done" || status === "warn") shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  /** Choosing a country answers several other fields: currency, dial code,
     language, and which subdivisions and tax ID formats even exist. */
  const handleCountryChange = (name, value) => {
    const next = countryByName(value);
    const code = next?.code || "";
    const regions = regionsFor(code);
    const followsPhone = !manualPhoneCountry.current;
    const language = languageNameForCode(next?.languages?.[0]);

    setFormData((prev) => ({
      ...prev,
      country: value,
      businessCurrency: next?.currencies?.[0] || prev.businessCurrency,
      businessPhoneCountry: followsPhone ? code : prev.businessPhoneCountry,
      repPhoneCountry: followsPhone ? code : prev.repPhoneCountry,
      /* Keep the region only if the new country still lists it - "Ontario"
         left over from Canada would fail validation silently otherwise. */
      stateRegion: !regions || regions.includes(prev.stateRegion) ? prev.stateRegion : "",
      /* Neither of these has a field any more (see the note on the option
         lists above) - they're seeded from the country the visitor picked
         and reported, so the CRM still gets them. */
      timeZone: prev.timeZone || detectedTimeZone(),
      platformLanguage: prev.platformLanguage || language,
      outboundCommLanguage: prev.outboundCommLanguage || language,
      registrationIdType: registrationTypesFor(code).some((t) => t.value === prev.registrationIdType)
        ? prev.registrationIdType
        : "",
    }));

    setErrors((prev) => {
      const next = { ...prev };
      ["country", "stateRegion", "registrationIdType", "businessPhone"].forEach((key) => delete next[key]);
      return next;
    });
  };

  const toggleNotRegistered = (name, checked) => {
    /* One update, not three: each updateField was its own setState round
       trip, and the second read `registrationIdType` before the first had
       landed - enough of a stutter on the step-2 checkbox to read as a
       hang on a slow device. */
    setFormData((prev) => ({
      ...prev,
      notRegistered: checked,
      ...(checked ? { registrationIdType: "", registrationNumber: "" } : {}),
    }));
    setErrors((prev) => {
      if (!("notRegistered" in prev || "registrationIdType" in prev || "registrationNumber" in prev)) return prev;
      const next = { ...prev };
      delete next.notRegistered;
      delete next.registrationIdType;
      delete next.registrationNumber;
      return next;
    });
  };

  const updateCredential = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      credentials: prev.credentials.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    }));
    setErrors((prev) => {
      if (!prev.credentials?.[id]) return prev;
      const nextCreds = { ...prev.credentials };
      delete nextCreds[id];
      return { ...prev, credentials: nextCreds };
    });
  };

  const addCredential = () => {
    setFormData((prev) => ({
      ...prev,
      credentials: [
        ...prev.credentials,
        { id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, platformName: "", username: "", password: "" },
      ],
    }));
  };

  const removeCredential = (id) => {
    setFormData((prev) => ({ ...prev, credentials: prev.credentials.filter((row) => row.id !== id) }));
  };

  const focusFirstError = (stepErrors) => {
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const el = shellRef.current?.querySelector(".ob-field--error input, .ob-field--error select, .ob-field--error textarea");
      el?.focus();
      if (!el) {
        // credential-row errors don't carry a .ob-field--error wrapper
        shellRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      }
    });
    return stepErrors;
  };

  const goNext = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => {
      const next = Math.min(s + 1, LAST_STEP);
      setMaxStepReached((m) => Math.max(m, next));
      return next;
    });
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const jumpToStep = (i) => {
    if (i > maxStepReached) return;
    setErrors({});
    setStep(i);
  };

  const submit = async () => {
    /* Every step is re-checked here, not just the last one: the tab strip and
       Back button let a visitor return to step 1, edit it into an invalid
       state, and come forward again. */
    const allErrors = STEP_META.reduce((acc, _meta, i) => ({ ...acc, ...validateStep(i, formData) }), {});
    if (Object.keys(allErrors).length) {
      const firstBadStep = STEP_META.findIndex((_m, i) => Object.keys(validateStep(i, formData)).length > 0);
      setStep(firstBadStep);
      setErrors(validateStep(firstBadStep, formData));
      focusFirstError(allErrors);
      return;
    }
    setErrors({});

    const credentialsShared = formData.credentials.filter(
      (row) => clean(row.username) || clean(row.password)
    ).length;

    setStatus("sending");
    /* AbortController is the deadline: GHL inbound webhooks occasionally
       stall (their answer just never arrives, though the workflow fired).
       Without it the button stayed on "Submitting..." for minutes - the
       hang being reported. 12s is past every normal answer; past it we stop
       waiting and show the done screen with a delivery note. */
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(buildPayload(formData, credentialsShared)),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("done");
    } catch (err) {
      /* That hook endpoint answers with Access-Control-Allow-Origin: *, so a
         throw here means the request never left the browser (or we gave up
         waiting on it - the abort lands here too). The visitor has still
         just spent four steps on this form - they get the success screen
         and the support address below, not a dead end. */
      console.error("[Onboarding] submission failed:", err);
      setStatus("warn");
    } finally {
      clearTimeout(timer);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return; // Enter in a field must not double-fire Submit
    if (step === LAST_STEP) submit();
    else goNext();
  };

  const sending = status === "sending";

  const meta = STEP_META[step];

  return (
    <div className="home-v2 ob-page">
      <PageMeta
        title="Onboarding - GHLevelUp"
        description="Business profile and CRM setup for GHLevelUp clients."
        noIndex
      />

      <div className="ob-shell" ref={shellRef}>
        <div className="ob-logo">
          <Link to="/" aria-label="GHLevelUp home">
            <picture>
              <source type="image/webp" srcSet="/img/logo.webp 1x, /img/logo@2x.webp 2x" />
              <img src="/img/logo.png" srcSet="/img/logo.png 1x, /img/logo@2x.png 2x" alt="" width={34} height={29} />
            </picture>
            <span>
              <b>GH</b>LevelUp
            </span>
          </Link>
        </div>

        {status === "done" || status === "warn" ? (
          <div className="ob-card ob-result" role="status">
            <span className={`ob-result__tick${status === "warn" ? " ob-result__tick--warn" : ""}`} aria-hidden="true">
              <Icon name="check" />
            </span>
            <h2>You&rsquo;re all set{formData.legalBusinessName ? `, ${formData.legalBusinessName}` : ""}!</h2>
            {status === "warn" && (
              <p className="ob-result__warning">
                We couldn&rsquo;t confirm delivery of your answers - the connection to our system didn&rsquo;t respond
                in time. Nothing is lost on your end; email {SITE.email} so nothing slips through.
              </p>
            )}

            <ol className="ob-result__steps">
              <li>We review your profile, services and goals, and flag anything we need to clarify.</li>
              <li>Your onboarding specialist calls or emails to lock in the setup and next steps.</li>
              <li>We build the CRM, automations and integrations, then walk you through it live.</li>
            </ol>

            <p className="ob-result__note">
              Don&rsquo;t hear from us within one business day? Email{" "}
              <a href={SITE.emailHref}>{SITE.email}</a> so nothing slips through.
            </p>

            <Link to="/" className="ob-btn ob-btn--primary">
              Return to homepage
            </Link>
          </div>
        ) : (
          <>
            <header className="ob-header">
              <span className="ob-eyebrow">Onboarding</span>
              <h1>Business Profile &amp; CRM Setup</h1>
              <p>Complete the survey below so our team can configure your CRM exactly the way your business runs.</p>
            </header>

            <StepProgress current={step} maxStepReached={maxStepReached} onJump={jumpToStep} />

            <form onSubmit={onFormSubmit} noValidate>
              <StepCard icon={meta.icon} heading={meta.heading} description={meta.description}>
                {step === 0 && (
                  <StepBusinessInfo
                    data={formData}
                    errors={errors}
                    onChange={updateField}
                    onCountryChange={handleCountryChange}
                    onPhoneCountryChange={(name) => (value) => {
                      manualPhoneCountry.current = true;
                      updateField(name, value);
                    }}
                  />
                )}
                {step === 1 && (
                  <StepRegistration
                    data={formData}
                    errors={errors}
                    onChange={updateField}
                    onNotRegistered={toggleNotRegistered}
                    onPhoneCountryChange={(name) => (value) => {
                      manualPhoneCountry.current = true;
                      updateField(name, value);
                    }}
                  />
                )}
                {step === 2 && <StepServices data={formData} errors={errors} onChange={updateField} />}
                {step === 3 && (
                  <StepCredentials
                    data={formData}
                    errors={errors.credentials || {}}
                    onChange={updateCredential}
                    onAdd={addCredential}
                    onRemove={removeCredential}
                  />
                )}
              </StepCard>

              <div className="ob-actions">
                <button type="button" className="ob-btn ob-btn--ghost" onClick={goBack} disabled={step === 0}>
                  <Icon name="chevronLeft" />
                  Back
                </button>
                {step === LAST_STEP ? (
                  <button type="submit" className="ob-btn ob-btn--primary" disabled={sending}>
                    {sending ? "Submitting..." : "Submit Onboarding"}
                    <Icon name="check" />
                  </button>
                ) : (
                  <button type="submit" className="ob-btn ob-btn--primary">
                    Continue
                    <Icon name="arrowRight" />
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Step 1: General Business Info ──────────────────────────────────────── */

/**
 * Only what no setup can start without: who the business is, how to reach it,
 * what industry it's in (that picks the CRM template and the automations), and
 * where it is.
 *
 * The street address, city and postal code are required (region stays
 * optional) - they're what the sender identity, the local number and the
 * local review flows are built from, so the wizard needs a real answer
 * before moving on rather than letting the address go unset.
 */
function StepBusinessInfo({ data, errors, onChange, onCountryChange, onPhoneCountryChange }) {
  const country = countryByName(data.country);
  const countryCode = country?.code || "";
  const regions = regionsFor(countryCode);
  const cities = citiesFor(countryCode);

  return (
    <>
      <div className="ob-row">
        <TextField label="Legal Business Name" name="legalBusinessName" required placeholder="Exactly as registered" value={data.legalBusinessName} error={errors.legalBusinessName} onChange={onChange} />
        <TextField label="Business Email" name="businessEmail" type="email" required placeholder="you@yourbusiness.com" autoComplete="email" value={data.businessEmail} error={errors.businessEmail} onChange={onChange} />
      </div>
      <div className="ob-row">
        <PhoneField
          label="Business Phone"
          name="businessPhone"
          required
          value={data.businessPhone}
          countryCode={data.businessPhoneCountry}
          onCountryChange={onPhoneCountryChange("businessPhoneCountry")}
          error={errors.businessPhone}
          onChange={onChange}
        />
        <SelectField
          label="Business Niche/Industry"
          name="businessNiche"
          required
          placeholder="Search your industry"
          options={NICHE_OPTIONS}
          value={data.businessNiche}
          error={errors.businessNiche}
          onChange={onChange}
        />
      </div>
      <div className="ob-row ob-row--1">
        <SelectField
          label="Country"
          name="country"
          required
          placeholder="Search countries"
          options={COUNTRY_OPTIONS}
          value={data.country}
          error={errors.country}
          helper={country ? `Sets your currency and calling code.` : "Pick where the business is registered."}
          onChange={onCountryChange}
        />
      </div>
      <div className="ob-row ob-row--1">
        <TextField label="Street Address" name="streetAddress" required placeholder="Street number and name" autoComplete="address-line1" value={data.streetAddress} error={errors.streetAddress} onChange={onChange} />
      </div>
      <div className="ob-row">
        {cities ? (
          <SelectField
            label="City"
            name="city"
            required
            freeText
            placeholder={`Start typing your city${cities[0] ? `, e.g. ${cities[0]}` : ""}`}
            options={cities}
            value={data.city}
            error={errors.city}
            helper={`${cities.length} suggestions for ${country.name} - anything else can be typed.`}
            onChange={onChange}
          />
        ) : (
          <TextField label="City" name="city" required placeholder="Your city" autoComplete="address-level2" value={data.city} error={errors.city} onChange={onChange} />
        )}
        {regions ? (
          <SelectField
            label={regionLabelFor(countryCode)}
            name="stateRegion"
            placeholder={`Search ${regionLabelFor(countryCode).toLowerCase()}`}
            options={regions}
            value={data.stateRegion}
            error={errors.stateRegion}
            onChange={onChange}
          />
        ) : (
          <TextField
            label={country ? regionLabelFor(countryCode) : "State/Prov/Region"}
            name="stateRegion"
            placeholder="Your region"
            autoComplete="address-level1"
            value={data.stateRegion}
            error={errors.stateRegion}
            helper={country ? `We don't list ${country.name}'s regions - type yours in.` : "Pick a country first for a list."}
            onChange={onChange}
          />
        )}
      </div>
      <div className="ob-row">
        <TextField label={countryCode ? postalLabelFor(countryCode) : "Postal/Zip Code"} name="postalZip" required={countryCode !== "AE"} placeholder={postalPlaceholder(countryCode)} autoComplete="postal-code" value={data.postalZip} error={errors.postalZip} onChange={onChange} />
        <SelectField
          label="Platform Language"
          name="platformLanguage"
          placeholder="Search languages"
          options={LANGUAGE_OPTIONS}
          value={data.platformLanguage}
          error={errors.platformLanguage}
          helper="The language your CRM is set up in."
          onChange={onChange}
        />
      </div>
      <div className="ob-row ob-row--1">
        <SelectField
          label="Outbound Communication Language"
          name="outboundCommLanguage"
          placeholder="Search languages"
          options={LANGUAGE_OPTIONS}
          value={data.outboundCommLanguage}
          error={errors.outboundCommLanguage}
          helper="The language our AI agents and campaigns will use with your customers."
          onChange={onChange}
        />
      </div>
    </>
  );
}

/* ── Step 2: Business Registration ──────────────────────────────────────── */

/**
 * The whole of this step is Optional, and it is the step that used to turn
 * people away: not every client has a registration number to hand at intake
 * time (plenty are sole traders, and plenty simply haven't got the letter
 * with them). None of it blocks the build - we can add the registration
 * details to the account later, from the documents they send us.
 *
 * The one rule kept is a consistency rule, not a requirement: if they type a
 * number, we ask them which ID it is, because an EIN and an ABN cannot be
 * checked by the same rule and an unidentified number reaches us as noise.
 * "My business is not registered" stays too - it is what turns the two
 * registration fields off on purpose, so "no" and "not answered yet" don't
 * look the same.
 */
function StepRegistration({ data, errors, onChange, onNotRegistered, onPhoneCountryChange }) {
  const countryCode = countryByName(data.country)?.code || "";
  const types = registrationTypesFor(countryCode);
  const activeType = registrationTypeMeta(countryCode, data.registrationIdType);

  return (
    <>
      <RadioGroup label="Business Type" name="businessType" required options={BUSINESS_TYPES} value={data.businessType} error={errors.businessType} onChange={onChange} />

      <div className="ob-row">
        <SelectField
          label="Business Registration ID Type"
          name="registrationIdType"
          required={!data.notRegistered}
          placeholder={countryCode ? "Select the ID you have" : "Select a country first"}
          options={types.map((t) => ({ value: t.value, label: t.value }))}
          value={data.registrationIdType}
          error={errors.registrationIdType}
          disabled={data.notRegistered}
          helper={data.notRegistered ? "Not needed - you marked the business as unregistered." : undefined}
          onChange={onChange}
        />
        <TextField
          label={activeType?.fieldLabel || "Business Registration Number"}
          name="registrationNumber"
          required={!data.notRegistered}
          placeholder={activeType?.placeholder || "Enter the number"}
          helper={activeType?.hint || undefined}
          value={data.registrationNumber}
          error={errors.registrationNumber}
          onChange={onChange}
          disabled={data.notRegistered}
        />
      </div>

      <Checkbox label="My business is not registered" name="notRegistered" checked={data.notRegistered} onChange={onNotRegistered} />

      <hr className="ob-divider" />

      <p className="ob-subhead">
        <Icon name="users" />
        Authorized Representative
      </p>

      <div className="ob-row">
        <TextField label="First Name" name="repFirstName" required autoComplete="given-name" value={data.repFirstName} error={errors.repFirstName} onChange={onChange} />
        <TextField label="Last Name" name="repLastName" required autoComplete="family-name" value={data.repLastName} error={errors.repLastName} onChange={onChange} />
      </div>
      <div className="ob-row">
        <TextField label="Representative Email" name="repEmail" type="email" required placeholder="you@yourbusiness.com" autoComplete="email" value={data.repEmail} error={errors.repEmail} onChange={onChange} />
        <SelectField
          label="Job Position"
          name="repJobTitle"
          required
          placeholder="Search job titles"
          options={JOB_TITLE_OPTIONS}
          value={data.repJobTitle}
          error={errors.repJobTitle}
          onChange={onChange}
        />
      </div>
      <div className="ob-row ob-row--1">
        <PhoneField
          label="Phone Number (with country code)"
          name="repPhone"
          required
          value={data.repPhone}
          countryCode={data.repPhoneCountry}
          onCountryChange={onPhoneCountryChange("repPhoneCountry")}
          error={errors.repPhone}
          helper="Where we call if we need to confirm a detail about the business."
          onChange={onChange}
        />
      </div>
    </>
  );
}

/* ── Step 3: Services & Integrations ────────────────────────────────────── */

/**
 * Services Wanted is the one required answer here - it is the whole point of
 * the intake, and everything we build is scoped from it. It and the tool list
 * are react-select multi-selects rather than walls of pills: 38 integration
 * chips wrapped over six rows and pushed the Continue button out of sight on
 * a laptop, and neither list could be searched.
 *
 * The rest is Optional: a business that doesn't know which tools it wants us
 * to connect yet is a normal client, not an incomplete form.
 */
function StepServices({ data, errors, onChange }) {
  return (
    <>
      <SelectField
        label="Services Wanted"
        name="servicesWanted"
        required
        isMulti
        placeholder="Search our services"
        options={SERVICES_WANTED}
        value={data.servicesWanted}
        error={errors.servicesWanted}
        helper="Pick everything you're interested in - we'll scope it on the call."
        onChange={onChange}
      />

      <TextAreaField
        label="What do you need? Tell us about your goals."
        name="goalsDescription"
        placeholder="e.g. Capture every missed call, follow up within five minutes, and book appointments automatically."
        helper="Describe what you're trying to achieve, your goals, and any specific requirements for the setup."
        value={data.goalsDescription}
        onChange={onChange}
      />

      <hr className="ob-divider" />

      <p className="ob-subhead">
        <Icon name="sliders" />
        Integrations
      </p>

      <SelectField
        label="Third-Party Tools to Integrate"
        name="integrations"
        isMulti
        placeholder="Search tools - Stripe, Calendly, QuickBooks…"
        options={INTEGRATIONS}
        value={data.integrations}
        error={errors.integrations}
        onChange={onChange}
      />
      <TextField label="Other tool to integrate" hideLabel name="otherTool" placeholder="Any tool not listed - type its name" value={data.otherTool} error={errors.otherTool} onChange={onChange} />

      <PillGroup label="Do you need a new website?" name="needsNewWebsite" options={WEBSITE_NEEDS} multiple={false} value={data.needsNewWebsite} error={errors.needsNewWebsite} onChange={onChange} />

      <PillGroup label="Connect to CRM" name="connectCrm" options={CRM_CONNECTIONS} value={data.connectCrm} error={errors.connectCrm} onChange={onChange} />
    </>
  );
}

/* ── Step 4: Access & Credentials ────────────────────────────────────────── */
function StepCredentials({ data, errors, onChange, onAdd, onRemove }) {
  return (
    <>
      <div className="ob-banner">
        <Icon name="shieldCheck" />
        <span>
          Credentials are optional. Facebook, Instagram, and Google Calendar connect directly inside the CRM, no
          password needed. We&rsquo;ll send a Loom or walk you through it live. Share access for Meta Business and
          your Domain below, and add any other tools you&rsquo;d like us to configure.
        </span>
      </div>

      <CredentialsRepeater rows={data.credentials} errors={errors} onChange={onChange} onAdd={onAdd} onRemove={onRemove} />
    </>
  );
}
