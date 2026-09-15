import Icon from "@/components/common/Icon.jsx";

/**
 * The Section 4 credential rows: platform name, username/email, password,
 * and a delete button - plus an "add another" row. Every row is optional
 * (see the info banner above it in Onboarding.jsx), but a row that has a
 * username or password without a platform name is ambiguous to whoever
 * configures it, so Onboarding.jsx's validator requires the platform name
 * the moment either of the other two fields is touched - `errors` here is
 * keyed by row id, not by field, since that's the only field it ever flags.
 */
export default function CredentialsRepeater({ rows, onChange, onAdd, onRemove, errors = {} }) {
  return (
    <div className="ob-creds">
      {rows.map((row, i) => (
        <div className="ob-creds__row" key={row.id}>
          <div className="ob-field">
            <label className="ob-field__label" htmlFor={`ob-cred-platform-${row.id}`}>
              Platform Name
            </label>
            <input
              id={`ob-cred-platform-${row.id}`}
              className="ob-input"
              value={row.platformName}
              onChange={(e) => onChange(row.id, "platformName", e.target.value)}
              placeholder="e.g. QuickBooks Online"
              aria-invalid={!!errors[row.id]}
            />
            {errors[row.id] && (
              <p className="ob-field__msg ob-field__msg--error" role="alert">
                {errors[row.id]}
              </p>
            )}
          </div>

          <div className="ob-field">
            <label className="ob-field__label" htmlFor={`ob-cred-user-${row.id}`}>
              Username or Email
            </label>
            <input
              id={`ob-cred-user-${row.id}`}
              className="ob-input"
              value={row.username}
              onChange={(e) => onChange(row.id, "username", e.target.value)}
              placeholder="username"
              autoComplete="off"
            />
          </div>

          <div className="ob-field">
            <label className="ob-field__label" htmlFor={`ob-cred-pass-${row.id}`}>
              Password
            </label>
            <input
              id={`ob-cred-pass-${row.id}`}
              className="ob-input"
              type="password"
              value={row.password}
              onChange={(e) => onChange(row.id, "password", e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <button
            type="button"
            className="ob-creds__remove"
            onClick={() => onRemove(row.id)}
            aria-label={`Remove ${row.platformName || `credential row ${i + 1}`}`}
          >
            <Icon name="trash" />
          </button>
        </div>
      ))}

      <button type="button" className="ob-creds__add" onClick={onAdd}>
        <Icon name="plus" />
        Add another credential
      </button>
    </div>
  );
}
