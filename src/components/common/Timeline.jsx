import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";

/**
 * `.tl` connected-step timeline. Two variants from the original:
 *  - full (Home's "Onboarding steps"): numbered STEP 0n label, and each
 *    node/fill/pulse carries a staggered transition-delay so the
 *    connector visibly draws itself in after the previous node "lands" -
 *    the exact ms values are reproduced below rather than eyeballed, so
 *    the draw-in timing matches.
 *  - compact (`tl--compact`, platform.html's mobile call-flow fallback):
 *    same structure, no stagger, no STEP numbers, an optional short
 *    paragraph under the heading, wrapped in the caller's own `.reveal`
 *    (three independent branches reveal together, not each step in turn).
 */
export function Timeline({ steps, compact = false }) {
  const body = (
    <div className={`tl ${compact ? "tl--compact" : ""}`.trim()}>
      {steps.map((step, i) => (
        <div className="tl-step" key={i}>
          {i > 0 && !compact && (
            <>
              <span className="tl-fill" style={{ transitionDelay: `${i * 450 - 300}ms` }} />
              <span className="tl-pulse" style={{ "--pulse-delay": `${i * 450 - 300}ms` }} />
            </>
          )}
          {i > 0 && compact && (
            <>
              <span className="tl-fill" />
              <span className="tl-pulse" />
            </>
          )}
          <div
            className={`tl-node ${step.end ? "tl-node--end" : ""}`.trim()}
            style={!compact ? { transitionDelay: `${i * 450}ms` } : undefined}
          >
            <Icon name={step.icon} strokeWidth={step.end ? 3 : 2} aria-hidden="true" />
          </div>
          {step.num && <span className="tl-step__num">{step.num}</span>}
          <h4>{step.title}</h4>
          {step.children && <p>{step.children}</p>}
        </div>
      ))}
    </div>
  );

  return compact ? body : <Reveal>{body}</Reveal>;
}
