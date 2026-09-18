import { useMemo } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
/* The `max` entry point is the same component with libphonenumber-js' full
   metadata, which the rest of the wizard already validates against
   (onboardingValidation.js imports libphonenumber-js/max too) - the default
   `min` build would format some numbers differently from how they validate. */
import PhoneInput from "react-phone-number-input/max";
import { getCountryCallingCode, getExampleNumber } from "libphonenumber-js/max";
/* Google's per-country sample numbers (4 kB). Passed explicitly because the
   `max` metadata build ships no examples of its own, so getExampleNumber()
   alone returns undefined. */
import exampleNumbers from "libphonenumber-js/examples.mobile.json";
/* Flag emoji from the ISO code we already have - countries-list is already a
   dependency (data/locations.js), so the phone picker doesn't need a second
   flags package. */
import { getEmojiFlag } from "countries-list";
import { FieldShell } from "@/components/onboarding/fields.jsx";

/**
 * Every long list in the wizard - country, city, state/region, language, and
 * the tools to integrate - through react-select, and the phone number through
 * react-phone-number-input.
 *
 * Both used to be hand-rolled here: a ~330-line combobox with its own ARIA
 * wiring, its own filtering, its own dropdown, plus a country picker and a
 * dial-code formatter glued together by hand. It worked, and it looked like
 * something we built rather than something the visitor recognises: the
 * highlight didn't follow the pointer reliably, the menu had no scroll
 * affordances, multi-select didn't exist at all, and the phone control was
 * two boxes pretending to be one.
 *
 * These two packages are the standard answer to exactly these controls.
 * react-select handles keyboard, ARIA (a real combobox: aria-activedescendant,
 * a live region for match counts, typeahead), touch, scrolling and the
 * open/close/filter state machine; react-phone-number-input owns the
 * country-to-dial-code rules and formats as you type, so the country and the
 * number can never disagree. What is left here is the part only we can know:
 * our option shape, our dark palette, and where the answer goes in the form.
 *
 * Styling is ours, in styles/onboarding.css, keyed off `classNamePrefix`
 * ("ob-sel"). react-select derives its DEFAULT look from a handful of theme
 * tokens, so `theme` below repaints the whole control for the dark wizard
 * without a component-level style object - and any part we don't override
 * still keeps a sane default instead of falling back to nothing.
 */

/** The wizard's dark surfaces, as react-select theme tokens. Everything the
 *  control paints - the box, its border, the text, the focused ring, the
 *  highlighted and selected option rows, the danger tint on an invalid one -
 *  resolves from these, which is why there is no `.ob-select` component CSS
 *  block to keep in sync with this file. */
const DARK_COLORS = {
  primary: "#35D9A0",
  primary75: "rgba(53, 217, 160, .75)",
  primary50: "rgba(53, 217, 160, .38)",
  primary25: "rgba(53, 217, 160, .14)",
  danger: "#FF9B8A",
  dangerLight: "rgba(255, 155, 138, .22)",
  neutral0: "#03211E",
  neutral5: "#062A26",
  neutral10: "rgba(255, 255, 255, .08)",
  neutral20: "rgba(195, 226, 214, .22)",
  neutral30: "rgba(195, 226, 214, .45)",
  neutral40: "rgba(214, 236, 228, .5)",
  neutral50: "rgba(214, 236, 228, .55)",
  neutral60: "rgba(214, 236, 228, .7)",
  neutral70: "rgba(214, 236, 228, .85)",
  neutral80: "#EAF6F2",
  neutral90: "#FFFFFF",
};

/**
 * A FUNCTION, not the object: react-select REPLACES its theme with whatever
 * is passed, so the default has to be spread in. Hand it DARK_COLORS alone
 * and every key it doesn't mention (the spacing ramp, geometry, the neutral
 * shadows behind the menu) resolves to undefined and the control comes apart.
 * Module scope, so the identity is stable across renders - react-select
 * memoises on it.
 *
 * controlHeight 44 matches the 12px-padded `.ob-input` next to it, so a
 * select and a text box on the same row are the same height.
 */
function selectTheme(defaultTheme) {
  return {
    ...defaultTheme,
    borderRadius: 12,
    spacing: { ...defaultTheme.spacing, controlHeight: 44, menuGutter: 6 },
    colors: { ...defaultTheme.colors, ...DARK_COLORS },
  };
}

/** Options come in as plain strings (`citiesFor` returns names) or as
 *  {value,label,hint,flag,meta,keywords} objects (COUNTRIES and friends); one
 *  shape downstream either way. */
function normalize(options = []) {
  return options.map((opt) => {
    if (typeof opt === "string") return { value: opt, label: opt, hint: "", flag: "", meta: "", keywords: "" };
    const value = String(opt.value ?? opt.label ?? "");
    return {
      value,
      label: opt.label ?? value,
      hint: opt.hint || "",
      flag: opt.flag || "",
      /* `meta` may be a function so expensive ones are only computed for the
         rows actually rendered. */
      meta: opt.meta || "",
      keywords: opt.keywords || "",
    };
  });
}

/** react-select's own filter only ever sees `label`. Ours also matches the
 *  ISO code, the dial code, the continent and a language's native spelling,
 *  so "DE", "+49" and "Deutsch" all find Germany - the behaviour the old
 *  combobox had, and the reason a 250-row country list stays usable. */
function filterOption(option, inputValue) {
  const query = inputValue.trim().toLowerCase();
  if (!query) return true;
  const data = option.data;
  const haystack = `${data.label} ${data.hint} ${data.keywords} ${data.value}`.toLowerCase();
  return query.split(/\s+/).every((token) => haystack.includes(token));
}

/** One row inside the menu: flag, name, and the secondary hint pinned right
 *  (a dial code, a currency name, a UTC offset). */
function OptionRow({ data }) {
  return (
    <span className="ob-opt">
      {data.flag ? (
        <span className="ob-opt__flag" aria-hidden="true">
          {data.flag}
        </span>
      ) : null}
      <span className="ob-opt__label">{data.label}</span>
      {data.hint ? <span className="ob-opt__hint">{data.hint}</span> : null}
      {data.meta ? <span className="ob-opt__meta">{typeof data.meta === "function" ? data.meta() : data.meta}</span> : null}
    </span>
  );
}

/* The closed control shows the answer, not the reference material: a flag and
   a name (as a plain string, so react-select's own ellipsis and single-line
   handling keep working on a narrow row), never the dial code or the offset
   the menu shows alongside it. */
function formatOptionLabel(data, { context }) {
  if (context === "value") return `${data.flag ? `${data.flag} ` : ""}${data.label}`;
  return <OptionRow data={data} />;
}

/**
 * A searchable select in the shared label/required/error shell.
 *
 * `freeText` swaps in CreatableSelect, which is how cities work: our list is
 * suggestions, and a town that isn't in it has to be typeable - the visitor
 * would otherwise be blocked by our data. Everything else is closed, because
 * the answer has to be a real option value ("America/New_York") for the
 * webhook to mean anything.
 *
 * `isMulti` returns an array of values rather than one, which is what the
 * "Services wanted" and "Tools to integrate" pickers store.
 */
export function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  required,
  error,
  helper,
  disabled = false,
  freeText = false,
  isMulti = false,
  hideLabel = false,
}) {
  const id = `ob-${name}`;
  const normalized = useMemo(() => normalize(options), [options]);

  /* The option the form is holding. A value that isn't in the list still has
     to be visible - a field that looks like it lost its answer reads as a
     bug, and it is reachable (a city typed by hand, a list that changed
     between visits) - so an unmatched value becomes a synthetic option rather
     than silently rendering as empty. */
  const selected = useMemo(() => {
    if (isMulti) {
      const values = Array.isArray(value) ? value : [];
      return normalized.filter((option) => values.includes(option.value));
    }
    if (!value) return null;
    return normalized.find((option) => option.value === value) || { value, label: String(value), flag: "", hint: "", meta: "" };
  }, [normalized, value, isMulti]);

  const Component = freeText && !isMulti ? CreatableSelect : Select;

  return (
    <FieldShell label={label} required={required} error={error} helper={helper} htmlFor={id} hideLabel={hideLabel}>
      <Component
        inputId={id}
        className="ob-sel"
        classNamePrefix="ob-sel"
        theme={selectTheme}
        options={normalized}
        value={selected}
        onChange={(option) => {
          if (isMulti) onChange(name, option ? option.map((choice) => choice.value) : []);
          else onChange(name, option ? option.value : "");
        }}
        placeholder={placeholder}
        isMulti={isMulti}
        isDisabled={disabled}
        isClearable
        isSearchable
        closeMenuOnSelect={!isMulti}
        blurInputOnSelect
        menuPlacement="auto"
        maxMenuHeight={280}
        filterOption={filterOption}
        formatOptionLabel={formatOptionLabel}
        formatCreateLabel={(inputValue) => `Use "${inputValue}"`}
        noOptionsMessage={({ inputValue }) =>
          !inputValue
            ? "Start typing to search"
            : freeText
              ? `Press Enter to use "${inputValue}"`
              : "No match - try another spelling"
        }
        aria-invalid={!!error}
        /* react-select owns aria-describedby itself (it points at its own
           live region), so the error travels by aria-errormessage and by the
           visible role="alert" message the shell already renders. */
        aria-errormessage={error ? `${id}-msg` : undefined}
      />
    </FieldShell>
  );
}

/* ── Phone ──────────────────────────────────────────────────────────────── */

/** Placeholder shown before anything is typed, per country: "(201) 555-0123"
 *  tells a US visitor what shape the field wants far better than a generic
 *  "555 000 0000" does, and it changes with the country they pick. */
function examplePlaceholder(countryCode) {
  if (!countryCode) return "Phone number";
  try {
    return getExampleNumber(countryCode, exampleNumbers)?.formatNational() || "Phone number";
  } catch {
    return "Phone number";
  }
}

/**
 * react-phone-number-input's country list, rendered through react-select so
 * it matches every other picker on the page (the library's own default is a
 * native `<select>` next to a flag icon).
 *
 * The contract is the library's: `value` is a two-letter code or undefined
 * for its "International" entry, and `onChange` takes the code back. The
 * rest of the props it forwards are for the native control it expects -
 * `iconComponent` and `name` are caught here (and renamed, so the underscore
 * says "deliberately dropped") rather than spread onto react-select, which
 * would put an unknown prop on a DOM node and add a hidden input nobody
 * reads, since this wizard posts JSON rather than a <form>.
 */
function CountrySelect({ value, onChange, options, disabled, readOnly, className, iconComponent: _iconComponent, name: _name, ...rest }) {
  const selectOptions = useMemo(
    () =>
      options
        .filter((option) => !option.divider)
        .map((option) => ({
          value: option.value || "",
          label: option.label,
          flag: option.value ? getEmojiFlag(option.value) : "🌐",
          /* Pinned right in the menu, and the whole answer in the closed
             control: the dial code is what the visitor matches against the
             number in the box beside it, and "United States" would be
             truncated to nothing in a column this narrow. */
          meta: option.value ? `+${getCountryCallingCode(option.value)}` : "",
        })),
    [options]
  );

  const selected = selectOptions.find((option) => option.value === (value || "")) || null;

  return (
    <Select
      className={className}
      classNamePrefix="ob-sel"
      theme={selectTheme}
      options={selectOptions}
      value={selected}
      onChange={(option) => onChange(option ? option.value || undefined : undefined)}
      isSearchable
      isDisabled={disabled || readOnly}
      menuPlacement="auto"
      maxMenuHeight={280}
      /* Unlike the shared formatter, the closed control shows the dial code
         ("🇺🇸 +1"), which is what has to sit next to the number itself. */
      formatOptionLabel={(option, { context }) =>
        context === "value" ? `${option.flag} ${option.meta || option.label}` : <OptionRow data={option} />
      }
      filterOption={filterOption}
      {...rest}
    />
  );
}

/**
 * One control for the whole number: the country (which sets the dial code)
 * and the national number, formatted as it is typed the way that country
 * writes numbers, and emitted as an E.164 string ("+15182509662") so the
 * webhook, the validation rules and the CRM all see the same thing.
 *
 * The country is stored in the form separately (`countryCode`/`onCountryChange`)
 * because more than the formatting needs it - validation has to know which
 * country's rules apply, and the payload records it beside the number.
 */
export function PhoneField({
  label,
  name,
  value,
  onChange,
  countryCode,
  onCountryChange,
  required,
  error,
  helper,
  autoComplete = "tel",
}) {
  const id = `ob-${name}`;

  return (
    <FieldShell label={label} required={required} error={error} helper={helper} htmlFor={id}>
      <PhoneInput
        id={id}
        name={name}
        className="ob-phone"
        numberInputProps={{ className: "ob-input ob-phone__number" }}
        countrySelectComponent={CountrySelect}
        countrySelectProps={{ className: "ob-phone__country", "aria-label": "Country calling code" }}
        value={value || undefined}
        onChange={(next) => onChange(name, next || "")}
        country={countryCode || undefined}
        onCountryChange={(next) => onCountryChange(next || "")}
        placeholder={examplePlaceholder(countryCode)}
        autoComplete={autoComplete}
        aria-invalid={!!error}
      />
    </FieldShell>
  );
}
