/**
 * Validation for the /onboarding wizard, one function per step so
 * Onboarding.jsx can validate only the step the visitor is currently on
 * (and re-validate just that step's fields as they're corrected) rather
 * than running every rule in the form on every keystroke.
 *
 * Everything country-shaped is validated against the country the visitor
 * actually selected, because "is this number valid" has no single answer:
 * an EIN, a GSTIN and an ABN are three different formats, and a 4-digit
 * postcode is right in Sydney and wrong in New York. Phone numbers go
 * through libphonenumber-js (the JS port of Google's libphonenumber) rather
 * than a length guess, so +44 20 7946 0958 passes and +44 20 7946 09 fails.
 */
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js/max";
import { LANGUAGES, countryByCode, countryByName, regionsFor } from "@/data/locations.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/* Business names: anything with letters, digits and the punctuation a real
   registered name carries ("Smith & Sons, LLC"). At least two characters -
   a one-letter business name is a typo. */
const NAME_RE = /^[\p{L}\p{N}][\p{L}\p{N}\s&'’.,\-()]{1,}$/u;
/* People's names are looser on purpose: single initials, apostrophes,
   hyphens and particles are all normal, and these fields are optional -
   rejecting "J" or "O'Brien" here would be our rule failing, not theirs. */
const PERSON_NAME_RE = /^[\p{L}][\p{L}\s'’.-]*$/u;
const CITY_RE = /^[\p{L}][\p{L}\s.'’-]{1,}$/u;

const REQUIRED = "This field is required.";

const LANGUAGE_NAMES = new Set(LANGUAGES.map((l) => l.value));

function requireField(errors, data, field, message = REQUIRED) {
  if (!String(data[field] || "").trim()) errors[field] = message;
}

function digits(value) {
  return String(value || "").replace(/\D/g, "");
}

/* ── Business identifiers ───────────────────────────────────────────────── */

/** Campus prefixes the IRS actually issues. /^\d{2}$/ alone would accept
 * 00-0000000, which no real EIN can be. */
const EIN_PREFIXES = new Set(
  [
    1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 71, 72, 73, 74, 75, 76, 77, 80, 81, 82, 83, 84, 85, 86, 87,
    88, 90, 91, 92, 93, 94, 95, 98, 99,
  ].map((n) => String(n).padStart(2, "0"))
);

function validateEin(value) {
  const d = digits(value);
  if (d.length !== 9) return "An EIN is 9 digits, usually written 12-3456789.";
  if (!EIN_PREFIXES.has(d.slice(0, 2))) return "That prefix isn't one the IRS issues - check the first two digits.";
  return "";
}

function validateSsn(value) {
  const d = digits(value);
  if (d.length !== 9) return "An SSN is 9 digits, usually written 123-45-6789.";
  const area = d.slice(0, 3);
  const group = d.slice(3, 5);
  const serial = d.slice(5);
  if (area === "000" || area === "666" || area >= "900") return "That area number isn't a valid SSN.";
  if (group === "00") return "That group number isn't a valid SSN.";
  if (serial === "0000") return "That serial number isn't a valid SSN.";
  return "";
}

/** ABN: 11 digits where the first digit is reduced by one, then a weighted
 *  sum has to land on a multiple of 89 (Australian Business Register). */
function validateAbn(value) {
  const d = digits(value);
  if (d.length !== 11) return "An ABN is 11 digits, e.g. 51 824 753 556.";
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const sum = weights.reduce((acc, w, i) => acc + (Number(d[i]) - (i === 0 ? 1 : 0)) * w, 0);
  return sum % 89 === 0 ? "" : "That ABN doesn't check out - the check digit doesn't match.";
}

/** ACN: 9 digits, weights 8→1 with a complement check digit. */
function validateAcn(value) {
  const d = digits(value);
  if (d.length !== 9) return "An ACN is 9 digits, e.g. 004 085 616.";
  const weights = [8, 7, 6, 5, 4, 3, 2, 1];
  const sum = weights.reduce((acc, w, i) => acc + Number(d[i]) * w, 0);
  return (10 - (sum % 10)) % 10 === Number(d[8]) ? "" : "That ACN doesn't check out - the check digit doesn't match.";
}

/** GSTIN: 15 characters whose last is a mod-36 Luhn checksum of the first
 *  fourteen. Odd positions are doubled and their base-36 digits added; the
 *  check character is whatever brings the total to a multiple of 36.
 *  Verified against the GSTN's own example, 27AAPFU0939F1ZV. */
function validateGstin(value) {
  const v = String(value || "").trim().toUpperCase();
  if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/.test(v)) {
    return "A GSTIN is 15 characters, e.g. 27AAPFU0939F1ZV.";
  }
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let sum = 0;
  for (let i = 0; i < 14; i += 1) {
    const code = alphabet.indexOf(v[i]);
    if (code < 0) return "A GSTIN can only contain letters and digits.";
    if (i % 2 === 1) {
      const doubled = code * 2;
      sum += Math.floor(doubled / 36) + (doubled % 36);
    } else {
      sum += code;
    }
  }
  const expected = alphabet[(36 - (sum % 36)) % 36];
  return expected === v[14] ? "" : "That GSTIN doesn't check out - the check character doesn't match.";
}

function validateVat(value, countryCode) {
  const v = String(value || "").trim().toUpperCase().replace(/\s|-/g, "");
  if (countryCode === "GB") {
    if (/^(GB)?(GD|HA)?\d{9}$/.test(v) || /^(GB)?(GD|HA)\d{12}$/.test(v)) return "";
    return "A UK VAT number is 9 digits, optionally prefixed GB (or GD/HA for special cases).";
  }
  if (/^[A-Z]{2}[A-Z\d]{8,12}$/.test(v)) return "";
  return "Enter the VAT number with its two-letter country prefix, e.g. DE 123456789.";
}

function validateCompanyNumber(value, countryCode) {
  const v = String(value || "").trim().toUpperCase();
  if (countryCode === "GB" && /^([A-Z]{2}\d{6}|\d{8})$/.test(v)) return "";
  if (/^[A-Z0-9-]{4,30}$/.test(v) && /\d/.test(v)) return "";
  return "Enter the registration number exactly as it appears on your certificate.";
}

function validateBusinessNumber(value, countryCode) {
  const v = String(value || "").trim().toUpperCase().replace(/\s/g, "");
  if (countryCode === "CA" && /^\d{9}(RC\d{4})?$/.test(v)) return "";
  return validateCompanyNumber(value, countryCode);
}

function validateCin(value) {
  const v = String(value || "").trim().toUpperCase();
  if (/^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/.test(v)) return "";
  return "A CIN is 21 characters, e.g. L17110MH1973PLC019786.";
}

function validateNzbn(value) {
  return /^\d{13}$/.test(digits(value)) ? "" : "An NZBN is 13 digits.";
}

function validateTrn(value) {
  return /^\d{15}$/.test(digits(value)) ? "" : "A UAE TRN is 15 digits.";
}

/**
 * What IDs a business can hold, per country. `fieldLabel` renames the input
 * ("EIN" reads better than "Business Registration Number" when that's what
 * we're asking for) and `placeholder` shows the shape expected.
 */
export const REGISTRATION_TYPES_BY_COUNTRY = {
  US: [
    { value: "EIN", fieldLabel: "EIN (Federal Tax ID)", placeholder: "12-3456789", hint: "9 digits, as printed on your IRS EIN letter.", validate: validateEin },
    { value: "SSN (Sole Proprietor)", fieldLabel: "SSN (Sole Proprietor)", placeholder: "123-45-6789", hint: "Only for sole proprietors filing under a personal SSN.", validate: validateSsn },
    { value: "State Registration Number", fieldLabel: "State Registration Number", placeholder: "e.g. 000123456", hint: "Issued by the state where you filed.", validate: validateBusinessNumber },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  CA: [
    { value: "Business Number (BN)", fieldLabel: "Business Number (BN)", placeholder: "123456789RC0001", hint: "9 digits, plus RC0001 for the GST/HST program account.", validate: validateBusinessNumber },
    { value: "GST/HST Number", fieldLabel: "GST/HST Number", placeholder: "123456789RT0001", hint: "", validate: validateBusinessNumber },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  GB: [
    { value: "Company Number (CRN)", fieldLabel: "Company Number (CRN)", placeholder: "12345678 or SC123456", hint: "8 characters from Companies House.", validate: validateCompanyNumber },
    { value: "VAT Number", fieldLabel: "VAT Number", placeholder: "GB123456789", hint: "9 digits, optionally prefixed GB.", validate: validateVat },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  AU: [
    { value: "ABN", fieldLabel: "ABN", placeholder: "51 824 753 556", hint: "11 digits - we'll verify the check digit for you.", validate: validateAbn },
    { value: "ACN", fieldLabel: "ACN", placeholder: "004 085 616", hint: "9 digits, for companies registered with ASIC.", validate: validateAcn },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  IN: [
    { value: "GSTIN", fieldLabel: "GSTIN", placeholder: "27AAPFU0939F1ZV", hint: "15 characters - the check character is verified.", validate: validateGstin },
    { value: "CIN", fieldLabel: "CIN", placeholder: "L17110MH1973PLC019786", hint: "21 characters, for registered companies.", validate: validateCin },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  NZ: [
    { value: "NZBN", fieldLabel: "NZBN", placeholder: "9429000000000", hint: "13 digits.", validate: validateNzbn },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  AE: [
    { value: "TRN (Tax Registration Number)", fieldLabel: "TRN", placeholder: "100123456700003", hint: "15 digits from the FTA.", validate: validateTrn },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  SG: [
    { value: "UEN", fieldLabel: "UEN", placeholder: "e.g. 201912345A", hint: "Your Unique Entity Number from ACRA.", validate: null },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  ZA: [
    { value: "Company Registration Number", fieldLabel: "Company Registration Number", placeholder: "2019/123456/07", hint: "As issued by the CIPC.", validate: null },
    { value: "VAT Number", fieldLabel: "VAT Number", placeholder: "4123456789", hint: "10 digits.", validate: null },
    { value: "Other", fieldLabel: "Business Registration Number", placeholder: "Enter the number", hint: "", validate: null },
  ],
  OTHER: [
    { value: "VAT Number", fieldLabel: "VAT Number", placeholder: "e.g. DE123456789", hint: "", validate: validateVat },
    { value: "Business Registration Number", fieldLabel: "Business Registration Number", placeholder: "e.g. 12345678", hint: "", validate: validateCompanyNumber },
    { value: "Tax ID", fieldLabel: "Tax ID", placeholder: "Enter your tax ID", hint: "", validate: null },
    { value: "Other", fieldLabel: "Other registration number", placeholder: "Enter the number", hint: "", validate: null },
  ],
};

export function registrationTypesFor(countryCode) {
  return REGISTRATION_TYPES_BY_COUNTRY[countryCode] || REGISTRATION_TYPES_BY_COUNTRY.OTHER;
}

export function registrationTypeMeta(countryCode, typeValue) {
  return registrationTypesFor(countryCode).find((t) => t.value === typeValue) || null;
}

/* ── Postal codes ───────────────────────────────────────────────────────── */

const POSTAL_RULES = {
  US: { re: /^\d{5}(-\d{4})?$/, message: "A US ZIP code is 5 digits, or ZIP+4 like 01867-1234." },
  CA: { re: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTVWXYZ][ -]?\d[ABCEGHJ-NPRSTVWXYZ]\d$/i, message: "A Canadian postal code looks like K1A 0B1." },
  GB: { re: /^(GIR\s?0AA|[A-PR-UWYZ][A-HK-Y]?\d[A-HJKSTUW]?\s?\d[ABD-HJLNP-UW-Z]{2})$/i, message: "A UK postcode looks like SW1A 1AA." },
  AU: { re: /^\d{4}$/, message: "An Australian postcode is 4 digits." },
  NZ: { re: /^\d{4}$/, message: "A New Zealand postcode is 4 digits." },
  IN: { re: /^[1-9]\d{5}$/, message: "An Indian PIN code is 6 digits and can't start with 0." },
  IE: { re: /^[A-TV-Y]\d{2}\s?[A-Z\d]{4}$/i, message: "An Eircode looks like D02 X285." },
  DE: { re: /^\d{5}$/, message: "A German postcode is 5 digits." },
  FR: { re: /^\d{5}$/, message: "A French postcode is 5 digits." },
  ES: { re: /^\d{5}$/, message: "A Spanish postcode is 5 digits." },
  IT: { re: /^\d{5}$/, message: "An Italian postcode is 5 digits." },
  NL: { re: /^\d{4}\s?[A-Z]{2}$/i, message: "A Dutch postcode looks like 1011 AB." },
  BR: { re: /^\d{5}-?\d{3}$/, message: "A Brazilian CEP looks like 01310-100." },
  MX: { re: /^\d{5}$/, message: "A Mexican postcode is 5 digits." },
  PH: { re: /^\d{4}$/, message: "A Philippine postcode is 4 digits." },
  PK: { re: /^\d{5}$/, message: "A Pakistani postcode is 5 digits." },
  NG: { re: /^\d{6}$/, message: "A Nigerian postal code is 6 digits." },
  ZA: { re: /^\d{4}$/, message: "A South African postal code is 4 digits." },
  SG: { re: /^\d{6}$/, message: "A Singapore postcode is 6 digits." },
  BD: { re: /^\d{4}$/, message: "A Bangladeshi postcode is 4 digits." },
  LK: { re: /^\d{5}$/, message: "A Sri Lankan postcode is 5 digits." },
  AE: null,
};

export const POSTAL_PLACEHOLDERS = {
  US: "01867",
  CA: "K1A 0B1",
  GB: "SW1A 1AA",
  AU: "2000",
  NZ: "6011",
  IN: "400001",
  IE: "D02 X285",
  DE: "10115",
  FR: "75001",
  ES: "28001",
  IT: "00100",
  NL: "1011 AB",
  BR: "01310-100",
  MX: "06000",
  PH: "1000",
  PK: "44000",
  NG: "100001",
  ZA: "0001",
  SG: "018956",
  BD: "1000",
  LK: "00100",
};

export function postalPlaceholder(countryCode) {
  return POSTAL_PLACEHOLDERS[countryCode] || "Postal code";
}

/* ── Phone ──────────────────────────────────────────────────────────────── */

/** True when libphonenumber accepts the number for that country. With no
 *  country selected yet we can only ask whether the digits look like a
 *  number at all - an empty country isn't this field's error to report. */
export function phoneIsValid(value, countryCode) {
  const raw = String(value || "").trim();
  if (raw.length < 4) return false;
  /* A hard digit ceiling shared by every real national number (libphonenumber's
     own MAX_LENGTH_FOR_PHONE_NUMBER); without it a mangled input like the
     20-digit "47311160574682114171" seen on the live form parses as a valid
     short number and sails through. */
  if (digits(raw).length > 15) return false;
  if (raw.startsWith("+") && !countryCode) return parsePhoneNumberFromString(raw)?.isValid() ?? false;
  if (!countryCode) return /\d{6,15}/.test(digits(raw));
  try {
    if (isValidPhoneNumber(raw, countryCode)) return true;
    /* A visitor who pasted a full international number into the national
       field is right and we're wrong - accept it as long as it parses. */
    return raw.startsWith("+") && (parsePhoneNumberFromString(raw)?.isValid() ?? false);
  } catch {
    return false;
  }
}

/** E.164 for the webhook ("+15182509662"), falling back to dial code + what
 *  they typed so a number GoHighLevel can't parse still reaches the team. */
export function phoneToE164(value, countryCode) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const parsed = countryCode
      ? parsePhoneNumberFromString(raw, countryCode)
      : parsePhoneNumberFromString(raw);
    if (parsed?.isValid()) return parsed.format("E.164");
  } catch {
    /* fall through to the raw value */
  }
  const dial = countryByCode(countryCode)?.dial || "";
  return raw.startsWith("+") ? raw : `${dial} ${raw}`.trim();
}

/* ── Steps ──────────────────────────────────────────────────────────────── */

export function validateStep(stepIndex, data) {
  const errors = {};
  const country = countryByName(data.country) || null;
  const countryCode = country?.code || "";

  if (stepIndex === 0) {
    /* REQUIRED: the business, how to reach it, what it does and where it is.
       Everything else on this step is optional by design (see the note on
       StepBusinessInfo in pages/Onboarding.jsx) and is checked only for
       shape when the visitor has chosen to fill it in - an empty optional
       field is an answer, not an omission. */
    requireField(errors, data, "friendlyBusinessName");
    if (data.friendlyBusinessName && !NAME_RE.test(data.friendlyBusinessName.trim())) {
      errors.friendlyBusinessName = "Use letters and numbers - no symbols only.";
    }

    if (data.legalBusinessName && !NAME_RE.test(data.legalBusinessName.trim())) {
      errors.legalBusinessName = "Enter the registered name as it appears on your documents.";
    }

    requireField(errors, data, "businessEmail");
    if (data.businessEmail) {
      const email = data.businessEmail.trim();
      if (!EMAIL_RE.test(email)) errors.businessEmail = "Enter a valid email address, e.g. info@yourbusiness.com.";
      else {
        const domain = email.split("@")[1]?.toLowerCase();
        const typo = EMAIL_DOMAIN_TYPOS[domain];
        if (typo) errors.businessEmail = `Did you mean @${typo}?`;
      }
    }

    requireField(errors, data, "businessPhone");
    if (data.businessPhone && !phoneIsValid(data.businessPhone, data.businessPhoneCountry || countryCode)) {
      errors.businessPhone = country ? `That doesn't look like a valid ${country.name} number.` : "Enter a valid phone number.";
    }

    /* No website and no branded domain any more: the domain is visible in
       the email they just gave us, and a site is usually the thing we are
       building for them. The currency has no field either - it is set from
       the country, and reported from there. */
    requireField(errors, data, "businessNiche", "Select your industry.");

    if (data.streetAddress && digits(data.streetAddress).length === 0) {
      errors.streetAddress = "Include the street number, so we can find you.";
    }

    requireField(errors, data, "city");
    if (data.city && !CITY_RE.test(data.city.trim())) errors.city = "Enter a valid city or town name.";

    requireField(errors, data, "country", "Select a country.");
    if (data.country && !country) errors.country = "Pick a country from the list.";

    if (data.stateRegion && countryCode) {
      const regions = regionsFor(countryCode);
      if (regions && !regions.includes(data.stateRegion)) {
        errors.stateRegion = `Pick a ${countryCode === "US" ? "state" : "region"} from the list.`;
      }
    }

    if (data.postalZip && countryCode) {
      const rule = POSTAL_RULES[countryCode];
      if (rule && !rule.re.test(data.postalZip.trim())) errors.postalZip = rule.message;
      else if (!rule && data.postalZip.trim().length < 3) errors.postalZip = "Enter a valid postal code.";
    }

    /* The time zone is reported, never asked for: it comes from the browser
       (detectedTimeZone) or from the browser's own Intl data, so there is no
       answer to validate here. */
    if (data.platformLanguage && !LANGUAGE_NAMES.has(data.platformLanguage)) {
      errors.platformLanguage = "Pick a language from the list.";
    }
    if (data.outboundCommLanguage && !LANGUAGE_NAMES.has(data.outboundCommLanguage)) {
      errors.outboundCommLanguage = "Pick a language from the list.";
    }
  }

  /* The whole registration section is optional; what is left are the checks
     that only make sense once something has been typed. */
  if (stepIndex === 1) {
    const meta = registrationTypeMeta(countryCode, data.registrationIdType);
    const number = String(data.registrationNumber || "").trim();

    if (data.notRegistered) {
      /* Nothing to check - the checkbox means they don't have one. */
    } else if (number && !data.registrationIdType) {
      /* A consistency rule, not a requirement: we can't tell an EIN from an
         ABN from a GSTIN, so an unidentified number is noise to the team. */
      errors.registrationIdType = "Select what kind of ID this number is.";
    } else if (number && meta?.validate) {
      const message = meta.validate(number, countryCode);
      if (message) errors.registrationNumber = message;
    } else if (number && number.replace(/[^a-z0-9]/gi, "").length < 4) {
      errors.registrationNumber = "That looks too short for a registration number.";
    }

    if (data.repFirstName && !PERSON_NAME_RE.test(data.repFirstName.trim())) errors.repFirstName = "Enter a valid first name.";
    if (data.repLastName && !PERSON_NAME_RE.test(data.repLastName.trim())) errors.repLastName = "Enter a valid last name.";

    if (data.repEmail) {
      const email = data.repEmail.trim();
      if (!EMAIL_RE.test(email)) errors.repEmail = "Enter a valid email address.";
      else {
        const domain = email.split("@")[1]?.toLowerCase();
        const typo = EMAIL_DOMAIN_TYPOS[domain];
        if (typo) errors.repEmail = `Did you mean @${typo}?`;
      }
    }

    if (data.repPhone && !phoneIsValid(data.repPhone, data.repPhoneCountry || countryCode)) {
      errors.repPhone = "Enter a valid phone number, including the area code.";
    }
  }

  if (stepIndex === 2) {
    /* Services wanted is the one required answer in this section - it is the
       scope everything else is built from. The goals text and the website
       question are optional; the goals length check only applies once they
       have started writing, so a one-word answer isn't silently dropped. */
    if (!data.servicesWanted?.length) {
      errors.servicesWanted = "Select at least one service.";
    }
    if (data.goalsDescription && data.goalsDescription.trim().length < 15) {
      errors.goalsDescription = "A sentence or two helps us configure the right thing.";
    }
  }

  if (stepIndex === 3) {
    const credentialErrors = {};
    data.credentials.forEach((row) => {
      const hasSecret = row.username.trim() || row.password.trim();
      if (hasSecret && !row.platformName.trim()) {
        credentialErrors[row.id] = "Name the platform this login is for.";
      }
      if (row.username.includes("@") && !EMAIL_RE.test(row.username.trim())) {
        credentialErrors[row.id] = "That doesn't look like a valid email address.";
      }
    });
    if (Object.keys(credentialErrors).length) errors.credentials = credentialErrors;
  }

  return errors;
}

export function isStepValid(stepIndex, data) {
  return Object.keys(validateStep(stepIndex, data)).length === 0;
}

/** Typos we see often enough to be worth catching before the email bounces. */
const EMAIL_DOMAIN_TYPOS = {
  "gmial.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gnail.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outllook.com": "outlook.com",
  "yaho.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "yahou.com": "yahoo.com",
  "iclod.com": "icloud.com",
  "icloud.co": "icloud.com",
};
