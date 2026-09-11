import Icon from "./Icon.jsx";

/** `.panel` - the little UI mock card used inside a Spotlight's media
 * side (a fake call log, document list, or chat transcript). */
export function Panel({ title, status, children }) {
  return (
    <div className="panel">
      <div className="panel__head">
        <h4>{title}</h4>
        {status && <span className="status-pill">{status}</span>}
      </div>
      <div className="panel__body">{children}</div>
    </div>
  );
}

/** One row of `.doc-row` - a document/call-log line with a done/pending
 * check state. `meta` is the trailing status text ("Uploaded", "Waiting"). */
export function DocRow({ done = false, name, meta }) {
  return (
    <div className={`doc-row ${done ? "doc-row--done" : ""}`.trim()}>
      <span className="doc-row__check">{done && <Icon name="tick" strokeWidth={3.5} />}</span>
      <span className="doc-row__name">{name}</span>
      <span className="doc-row__meta">{meta}</span>
    </div>
  );
}

/** `.chat` transcript mock (the AI-receptionist spotlight on Home). `lines`
 * is an array of { from: "them" | "us", text }. */
export function Chat({ lines, meta }) {
  return (
    <>
      <div className="chat">
        {lines.map((line, i) => (
          <div key={i} className={`bubble bubble--${line.from}`}>
            {line.text}
          </div>
        ))}
      </div>
      {meta && (
        <p className="bubble__meta">
          <Icon name="check" width={14} height={14} />
          {meta}
        </p>
      )}
    </>
  );
}
