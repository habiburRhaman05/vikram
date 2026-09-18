import Icon from "@/components/common/Icon.jsx";

/**
 * Every field in the /onboarding wizard, in one file - a text input, a
 * select, a textarea, a radio group and a pill multi-select all share the
 * same label/required-mark/error/helper layout, so they're thin wrappers
 * around that shared shell (`FieldShell`) rather than five unrelated
 * components that happen to look alike.
 *
 * Error text and aria-describedby/aria-invalid are wired the same way on
 * every field: `.ob-field--error` on the wrapper, a `role="alert"` message
 * under the control, and the control itself pointing at that message's id
 * so a screen reader announces it the moment the field takes blame.
 *
 * SelectField/PhoneField (the react-select lists and the phone number)
 * live in Combobox.jsx next door - they wrap a library's control, not one of
 * these, but they sit in this same FieldShell, which is exported for that
 * reason.
 *
 * REQUIRED AND OPTIONAL ARE BOTH STATED, in the label, on every field. Most
 * of this wizard is optional now (see Onboarding.jsx), and an optional field
 * that looks exactly like a required one reads as a required field - people
 * hunt for a value to put in it, or assume the form is broken when it lets
 * them through without one. The asterisk says required; the tag says
 * optional; neither is ever implied.
 */
export function FieldShell({ label, required, error, helper, htmlFor, hideLabel, children }) {
  const msgId = htmlFor ? `${htmlFor}-msg` : undefined;
  return (
    <div className={`ob-field${error ? " ob-field--error" : ""}`}>
      {label && (
        <label className={`ob-field__label${hideLabel ? " hv-sr-only" : ""}`} htmlFor={htmlFor}>
          <span className="ob-field__name">{label}</span>
          {required ? (
            <span className="ob-field__req" aria-hidden="true">
              *
            </span>
          ) : (
            <span className="ob-field__opt">Optional</span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p className="ob-field__msg ob-field__msg--error" id={msgId} role="alert">
          {error}
        </p>
      ) : helper ? (
        <p className="ob-field__msg" id={msgId}>
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({ label, name, value, onChange, type = "text", placeholder, required, error, helper, autoComplete, inputMode, className = "", hideLabel = false, disabled = false }) {
  const id = `ob-${name}`;
  return (
    <FieldShell label={label} required={required} error={error} helper={helper} htmlFor={id} hideLabel={hideLabel}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error || helper ? `${id}-msg` : undefined}
        disabled={disabled}
        className={`ob-input ${className}`.trim()}
      />
    </FieldShell>
  );
}

export function TextAreaField({ label, name, value, onChange, placeholder, helper, required, error, rows = 4 }) {
  const id = `ob-${name}`;
  return (
    <FieldShell label={label} required={required} error={error} helper={helper} htmlFor={id}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error || helper ? `${id}-msg` : undefined}
        className="ob-input ob-textarea"
      />
    </FieldShell>
  );
}

export function RadioGroup({ label, name, value, onChange, options, required, error }) {
  return (
    <FieldShell label={label} required={required} error={error}>
      <div className="ob-radio-group" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <label className="ob-radio" key={opt}>
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(name, opt)} />
            <span className="ob-radio__dot" aria-hidden="true" />
            {opt}
          </label>
        ))}
      </div>
    </FieldShell>
  );
}

/**
 * Toggle-pill picker. `multiple` (the default) keeps an array of selected
 * values, like the reference's "Services Wanted" / "Regions" pickers;
 * pass `multiple={false}` for a single-answer row like "Does the client
 * need a new website?" (Yes/No), where picking one always replaces
 * whatever was picked before instead of adding to it.
 */
export function PillGroup({ label, name, value, onChange, options, required, error, helper, multiple = true }) {
  const selected = multiple ? value : value ? [value] : [];
  const toggle = (opt) => {
    if (!multiple) {
      onChange(name, value === opt ? "" : opt);
      return;
    }
    const next = selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt];
    onChange(name, next);
  };
  return (
    <FieldShell label={label} required={required} error={error} helper={helper}>
      <div className="ob-pills" role="group" aria-label={label}>
        {options.map((opt) => {
          const isOn = selected.includes(opt);
          return (
            <button
              type="button"
              key={opt}
              className={`ob-pill${isOn ? " is-on" : ""}`}
              aria-pressed={isOn}
              onClick={() => toggle(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}

export function Checkbox({ label, name, checked, onChange }) {
  return (
    <label className="ob-checkbox">
      <input type="checkbox" name={name} checked={checked} onChange={(e) => onChange(name, e.target.checked)} />
      <span className="ob-checkbox__box" aria-hidden="true">
        <Icon name="check" />
      </span>
      {label}
    </label>
  );
}
