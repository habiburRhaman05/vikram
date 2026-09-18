import { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/Icon.jsx";
import HaloButton from "../HaloButton.jsx";
import { Reveal } from "../primitives.jsx";
import { JOURNEY } from "@/data/homeV2";
import ServiceMockup from "../ServiceMockups.jsx";

/** How long each stage stays active before the flow moves on. */
const DWELL = 3200;

/**
 * "How We Work" - the seven stages as a live pipeline.
 *
 * A track runs through the stage nodes and fills up to the active one, with
 * a light pulse travelling along the filled part. The active stage advances
 * on its own - a ring round its node counts down the dwell - and a detail
 * panel below explains it.
 *
 * It only starts once the section is on screen, so a visitor arriving at it
 * sees stage 1 rather than whatever stage the timer had reached while they
 * were further up the page. It pauses while the pointer is over the flow or
 * focus is inside it, so nothing moves under someone reading or tabbing.
 *
 * ARIA tabs: the stages are tabs, the detail panel is the tab panel. Arrow
 * keys move between stages (Left/Right, and Up/Down for the vertical phone
 * layout). On a phone the panel is replaced by each stage's text opening
 * inline under it.
 */
export default function Journey() {
  const steps = JOURNEY.steps;
  const N = steps.length;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const paused = hovering || focusInside;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % N), DWELL);
    return () => clearTimeout(id);
  }, [active, inView, paused, N]);

  const go = (i, focus = false) => {
    const next = (i + N) % N;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in keys) {
      e.preventDefault();
      go(active + keys[e.key], true);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      go(e.key === "Home" ? 0 : N - 1, true);
    }
  };

  const step = steps[active];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section ref={sectionRef} id="how-we-work" className="hv-section hv-flowx">
      <div className="hv-flowx__bg" aria-hidden="true" />
      <div className="hv-container">
        <Reveal className="hv-flowx__head">
          <span className="hv-eyebrow">{JOURNEY.eyebrow}</span>
          <h2 className="hv-flowx__title">{JOURNEY.title}</h2>
          <p className="hv-flowx__lede">{JOURNEY.lede}</p>
        </Reveal>

        <Reveal
          className={`hv-flowx__stage${paused ? " is-paused" : ""}`}
          style={{ "--p": active / (N - 1), "--n": N, "--dwell": `${DWELL}ms` }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setFocusInside(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocusInside(false);
          }}
        >
          <div className="hv-flowx__track" aria-hidden="true">
            <span className="hv-flowx__fill">
              <span className="hv-flowx__pulse" />
            </span>
          </div>

          <ol className="hv-flowx__steps" role="tablist" aria-label="Stages">
            {steps.map((s, i) => {
              const state = i === active ? " is-active" : i < active ? " is-done" : "";
              return (
                <li key={s.title} className={`hv-flowx__step${state}`} role="presentation">
                  <button
                    ref={(el) => (tabRefs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`flowx-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls="flowx-panel"
                    tabIndex={i === active ? 0 : -1}
                    className="hv-flowx__btn"
                    onClick={() => go(i)}
                    onKeyDown={onKeyDown}
                  >
                    <span className="hv-flowx__node">
                      <Icon name={s.icon} strokeWidth={1.9} aria-hidden="true" />
                      {i === active && (
                        /* Keyed on the stage so the countdown restarts from
                           full every time the active stage changes. */
                        <svg key={active} className="hv-flowx__timer" viewBox="0 0 72 72" aria-hidden="true">
                          <circle cx="36" cy="36" r="34" pathLength="100" />
                        </svg>
                      )}
                    </span>
                    <span className="hv-flowx__num">{pad(i + 1)}</span>
                    <span className="hv-flowx__name">{s.title}</span>
                    <span className="hv-flowx__sub">{s.sub}</span>
                  </button>
                  {/* Phone-only collapsible. ONE inner child carries all
                      the content (body + detail bullets) so the 0fr->1fr
                      grid collapse works as a unit - a second direct child
                      would land in an implicit row the collapse can't
                      reach. The detail bullets live in the desktop panel
                      too; on the phone this is the only place they show. */}
                  <div className="hv-flowx__inline">
                    <div className="hv-flowx__inline-inner">
                      <p>{s.body}</p>
                      <ul className="hv-flowx__inline-details">
                        {s.details.map((d) => (
                          <li key={d}>
                            <Icon name="check" aria-hidden="true" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            key={active}
            id="flowx-panel"
            role="tabpanel"
            aria-labelledby={`flowx-tab-${active}`}
            className="hv-flowx__panel"
          >
            <div className="hv-flowx__panel-copy">
              <span className="hv-flowx__count">
                Stage {pad(active + 1)} <i>/ {pad(N)}</i>
              </span>
              <h3 className="hv-flowx__panel-title">{step.title}</h3>
              <p className="hv-flowx__panel-body">{step.body}</p>
              <ul className="hv-flowx__panel-details">
                {step.details.map((d) => (
                  <li key={d}>
                    <Icon name="check" aria-hidden="true" />
                    <span>{d}</span> 
                  </li>
                ))}
              </ul>
              
              <div className="hv-flowx__controls">
                <div className="hv-flowx__arrows">
                  <button type="button" className="hv-flowx__arrow" onClick={() => go(active - 1)} aria-label="Previous stage">
                    <Icon name="chevronLeft" aria-hidden="true" />
                  </button>
                  <button type="button" className="hv-flowx__arrow" onClick={() => go(active + 1)} aria-label="Next stage">
                    <Icon name="chevronRight" aria-hidden="true" />
                  </button>
                </div>
                <HaloButton to={JOURNEY.cta.to}>{JOURNEY.cta.label}</HaloButton>
              </div>
            </div>

            <div className="hv-flowx__panel-visual" aria-hidden="true">
              <div className="hv-flowx__panel-mock-wrapper">
                <ServiceMockup kind={step.mock} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
