import Icon from "@/components/common/Icon.jsx";
import { STEP_META } from "@/data/onboarding.js";

/**
 * The "Step X of 4" bar plus the row of section pills underneath it.
 *
 * A pill is only clickable once its step has actually been reached
 * (`i <= maxStepReached`) - the reference design's tabs look clickable but
 * a visitor could jump ahead of validation entirely by clicking "Access &
 * Credentials" from step 1. Completed steps get a checkmark instead of
 * their number/icon so progress is scannable at a glance without reading
 * every label.
 */
export default function StepProgress({ current, maxStepReached, onJump }) {
  const percent = Math.round(((current + 1) / STEP_META.length) * 100);

  return (
    <div className="ob-progress">
      <div className="ob-progress__row">
        <span>
          Step {current + 1} of {STEP_META.length}
        </span>
        <span className="ob-progress__pct">{percent}%</span>
      </div>
      <div className="ob-progress__bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="ob-progress__fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="ob-tabs" role="tablist" aria-label="Onboarding sections">
        {STEP_META.map((step, i) => {
          const done = i < current || i < maxStepReached;
          const active = i === current;
          const reachable = i <= maxStepReached;
          return (
            <button
              type="button"
              key={step.key}
              role="tab"
              aria-selected={active}
              aria-disabled={!reachable}
              className={`ob-tab${active ? " is-active" : ""}${done ? " is-done" : ""}`}
              onClick={() => reachable && onJump(i)}
              disabled={!reachable}
            >
              <Icon name={done ? "check" : step.icon} />
              {step.tabLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
