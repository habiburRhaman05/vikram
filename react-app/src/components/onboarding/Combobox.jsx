import { useEffect, useMemo, useRef, useState } from "react";
import { AsYouType, getExampleNumber } from "libphonenumber-js/max";
/* Google's per-country sample numbers (4 kB). Passed explicitly because the
   `max` metadata build ships no examples of its own, so getExampleNumber()
   alone returns undefined. */
import exampleNumbers from "libphonenumber-js/examples.mobile.json";
import Icon from "@/components/common/Icon.jsx";
import { FieldShell } from "@/components/onboarding/fields.jsx";

/**
 * Autosuggest dropdown used everywhere a plain <select> stops scaling: 250
 * countries, ~400 time zones, 180 languages. A native select listing 400
 * zones is unusable; this filters as you type, keeps the answer as a real
 * option value (so GoHighLevel receives "America/New_York", not something
 * loosely typed), and still allows free text where the list can't be
 * complete - cities, mostly.
 *
 * Keyboard and ARIA follow the ARIA 1.2 combobox pattern: the input keeps
 * DOM focus while `aria-activedescendant` points at the highlighted option,
 * so screen readers announce the moving highlight without a focus change.
 */

/** Options may be plain strings or objects; one shape downstream. */
function normalizeOptions(options = []) {
  return options.map((opt, i) => {
    if (typeof opt === "string") return { value: opt, label: opt, hint: "", flag: "", meta: "", keywords: "" };
    const value = String(opt.value ?? opt.label ?? i);
    return {
      value,
      label: opt.label ?? value,
      hint: opt.hint || "",
      flag: opt.flag || "",
      /* `meta` may be a function so expensive ones (a time zone's UTC offset)
         are only computed for rows actually rendered. */
      meta: opt.meta || "",
      keywords: opt.keywords || "",
    };
  });
}

/** What the input shows once a value is picked. */
function displayFor(option) {
  if (!option) return "";
  return `${option.flag ? `${option.flag} ` : ""}${option.label}${option.hint ? ` · ${option.hint}` : ""}`;
}

export function Combobox({
  id,
  value,
  onChange,
  options,
  placeholder = "Start typing…",
  disabled = false,
  invalid = false,
  describedBy,
  freeText = true,
  autoComplete = "off",
  maxVisible = 60,
}) {
  const normalized = useMemo(() => normalizeOptions(options), [options]);
  const selected = useMemo(() => normalized.find((o) => o.value === value) || null, [normalized, value]);

  /* A stored value that isn't in the list still has to be visible - the four
     step wizard is long enough that a field appearing to have lost its answer
     reads as a bug. (Time zones are the real case: ICU and the visitor's
     browser disagree on a few legacy aliases.) */
  const display = selected ? displayFor(selected) : String(value ?? "");

  const [text, setText] = useState(display);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const typing = useRef(false);
  const listRef = useRef(null);
  const listId = `${id}-listbox`;

  /* Keep the box showing the authoritative label - unless the visitor is
     mid-edit, in which case their keystrokes win. */
  useEffect(() => {
    if (typing.current) return;
    setText(display);
  }, [display]);

  const query = text.trim().toLowerCase();
  const browsing = !query || text === display;
  const matches = useMemo(() => {
    if (browsing) return normalized;
    const tokens = query.split(/\s+/);
    return normalized.filter((o) => {
      const haystack = `${o.label} ${o.hint} ${o.keywords} ${o.value}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [normalized, query, browsing]);

  const visible = matches.slice(0, maxVisible);
  const activeOption = visible[active] || null;

  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const commit = (option) => {
    typing.current = false;
    setText(displayFor(option));
    setOpen(false);
    setActive(-1);
    if (option && option.value !== value) onChange(option.value);
    else if (!option && freeText) onChange(text.trim());
  };

  const close = () => {
    typing.current = false;
    setOpen(false);
    setActive(-1);
    /* A typed value that matches no option is only kept when free text is
       allowed; otherwise the box snaps back to the real selection. */
    if (freeText) onChange(text.trim());
    else setText(display);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(0);
        return;
      }
      setActive((i) => {
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        if (next < 0) return 0;
        return Math.min(next, visible.length - 1);
      });
      return;
    }
    if (e.key === "Enter") {
      if (open && activeOption) {
        e.preventDefault();
        commit(activeOption);
      } else if (open) {
        e.preventDefault();
        close();
      }
      return;
    }
    if (e.key === "Escape") {
      if (!open) return;
      e.preventDefault();
      setText(display);
      typing.current = false;
      setOpen(false);
      setActive(-1);
      return;
    }
    if (e.key === "Tab") {
      close();
    }
  };

  const clear = () => {
    typing.current = false;
    setText("");
    setOpen(false);
    setActive(-1);
    onChange("");
  };

  return (
    <div className="ob-combobox">
      <input
        id={id}
        type="text"
        role="combobox"
        className="ob-input ob-combobox__input"
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && activeOption ? `${id}-opt-${active}` : undefined}
        autoComplete={autoComplete}
        spellCheck={false}
        onChange={(e) => {
          const next = e.target.value;
          typing.current = true;
          setText(next);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={(e) => {
          setOpen(true);
          /* Selected: typing replaces it. Empty: nothing to select. */
          e.target.select?.();
        }}
        onBlur={close}
        onKeyDown={onKeyDown}
      />

      {value !== "" && value != null && !disabled && (
        <button type="button" className="ob-combobox__clear" onClick={clear} aria-label="Clear selection" tabIndex={-1}>
          <Icon name="close" />
        </button>
      )}

      {open && !disabled && (
        <ul className="ob-combobox__list" id={listId} role="listbox" ref={listRef}>
          {visible.map((option, i) => (
            <li
              key={`${option.value}-${i}`}
              id={`${id}-opt-${i}`}
              data-index={i}
              role="option"
              aria-selected={option.value === value}
              className={`ob-combobox__option${i === active ? " is-active" : ""}${
                option.value === value ? " is-selected" : ""
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(option)}
            >
              {option.flag && (
                <span className="ob-combobox__flag" aria-hidden="true">
                  {option.flag}
                </span>
              )}
              <span className="ob-combobox__label">{option.label}</span>
              {option.hint && <span className="ob-combobox__hint">{option.hint}</span>}
              {option.meta && (
                <span className="ob-combobox__meta">{typeof option.meta === "function" ? option.meta() : option.meta}</span>
              )}
              {option.value === value && <Icon name="tick" className="ob-combobox__tick" />}
            </li>
          ))}
          {!visible.length && <li className="ob-combobox__empty">No match - {freeText ? "keep typing to enter it" : "try another spelling"}.</li>}
        </ul>
      )}
    </div>
  );
}

/** Combobox inside the shared label/required/error shell. */
export function ComboboxField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
  helper,
  disabled = false,
  freeText = true,
  hideLabel = false,
}) {
  const id = `ob-${name}`;
  return (
    <FieldShell label={label} required={required} error={error} helper={helper} htmlFor={id} hideLabel={hideLabel}>
      <Combobox
        id={id}
        value={value}
        onChange={(next) => onChange(name, next)}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        invalid={!!error}
        describedBy={error || helper ? `${id}-msg` : undefined}
        freeText={freeText}
      />
    </FieldShell>
  );
}

/* ── Phone ──────────────────────────────────────────────────────────────── */

/** Placeholder shown before anything is typed, per country: "(201) 555-0123"
 *  tells a US visitor what shape the field wants far better than a generic
 *  "555 000 0000" does, and it changes with the dial code they pick. */
function examplePlaceholder(countryCode) {
  if (!countryCode) return "555 000 0000";
  try {
    return getExampleNumber(countryCode, exampleNumbers)?.formatNational() || "";
  } catch {
    return "";
  }
}

/**
 * Country picker + national number, rather than one free-text box.
 *
 * The dial code is prefixed by the picker so the visitor never types "+1"
 * themselves, and the country is kept in a separate field: validation and
 * the webhook payload both need the region to interpret the digits, and
 * `AsYouType(country)` can then format the number as it's typed the way
 * that country actually writes phone numbers.
 */
export function PhoneField({
  label,
  name,
  value,
  onChange,
  countryCode,
  onCountryChange,
  countryOptions,
  required,
  error,
  helper,
}) {
  const id = `ob-${name}`;
  const countryId = `${id}-country`;

  /* Recreated on country change so formatting switches with the dial code.
     A fresh instance per keystroke would reset AsYouType's own state and
     re-format the whole string on every character. */
  const formatter = useRef(new AsYouType(countryCode || undefined));
  useEffect(() => {
    formatter.current = new AsYouType(countryCode || undefined);
  }, [countryCode]);

  const country = countryOptions.find((c) => c.value === countryCode) || null;

  return (
    <FieldShell label={label} required={required} error={error} helper={helper} htmlFor={id}>
      <div className={`ob-phone${error ? " ob-phone--error" : ""}`}>
        <div className="ob-phone__dial">
          <Combobox
            id={countryId}
            value={countryCode || ""}
            onChange={onCountryChange}
            options={countryOptions}
            placeholder="Country"
            invalid={!!error}
            freeText={false}
            maxVisible={80}
          />
        </div>
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className="ob-input ob-phone__input"
          value={value}
          placeholder={examplePlaceholder(countryCode)}
          aria-invalid={!!error}
          aria-describedby={error || helper ? `${id}-msg` : undefined}
          onChange={(e) => onChange(name, formatter.current.input(e.target.value))}
        />
      </div>
      {country && (
        <p className="ob-phone__meta">
          {country.flag} {country.name} <span>{country.hint}</span>
        </p>
      )}
    </FieldShell>
  );
}
