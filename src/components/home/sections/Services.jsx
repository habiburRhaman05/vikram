import { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/Icon.jsx";
import HaloButton from "../HaloButton.jsx";
import ProductTile from "../ProductTile.jsx";
import ServiceMockup from "../ServiceMockups.jsx";
import { HvSection, Reveal } from "../primitives.jsx";
import { SERVICES, SERVICE_LINEUP } from "@/data/homeV2";

/**
 * Services - a tab bar of the five services over one detail panel, after
 * the reference's product switcher.
 *
 * ARIA tabs pattern: one tab in the tab order at a time (roving tabindex),
 * Left/Right/Home/End move between them, and selection follows focus - the
 * panel is cheap to swap, so there is no reason to make a keyboard user
 * press Enter as well.
 *
 * The underline under the active tab is one element that slides, driven
 * by --i, rather than a border on each tab that jumps.
 *
 * Only the active panel is rendered. The `key` on it is the active id, so
 * React mounts a fresh panel on every switch, which is what replays the
 * CSS entrance animation.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const tabsScrollRef = useRef(null);
  const service = SERVICE_LINEUP[active];
  const panel = SERVICES.panels[service.id];

  const select = (i) => {
    const n = SERVICE_LINEUP.length;
    const next = (i + n) % n;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const map = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: SERVICE_LINEUP.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    select(map[e.key]);
  };

  /* The tab row scrolls sideways on phones, so the active tab can end up
     outside the visible strip (especially after arrow-key or wrap-around
     selection). Centre it whenever the selection changes; on desktop all
     five tabs fit, so the scroll position is 0 and this is a no-op. */
  useEffect(() => {
    const scroller = tabsScrollRef.current;
    const tab = tabRefs.current[active];
    if (!scroller || !tab) return;
    scroller.scrollTo({
      left: tab.offsetLeft - (scroller.clientWidth - tab.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <HvSection id="services" className="hv-svc">
      <Reveal className="hv-svc__head">
        <span className="hv-eyebrow">{SERVICES.eyebrow}</span>
        <h2 className="hv-svc__title">
          {SERVICES.titleLines[0]}
          <br />
          {SERVICES.titleLines[1]}
        </h2>
      </Reveal>

      <Reveal className="hv-svc__box">
        <div className="hv-svc__tabs-scroll" ref={tabsScrollRef}>
          <div
            className="hv-svc__tabs"
            role="tablist"
            aria-label="Services"
            style={{ "--i": active, "--n": SERVICE_LINEUP.length }}
          >
            {SERVICE_LINEUP.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`svc-tab-${s.id}`}
                aria-selected={i === active}
                aria-controls="svc-panel"
                tabIndex={i === active ? 0 : -1}
                className={`hv-svc__tab${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                <ProductTile icon={s.icon} img={s.img} tone={s.tone} size="sm" />
                <span className="hv-svc__tab-name">{s.label}</span>
                <span className="hv-svc__tab-from">{SERVICES.panels[s.id].from}</span>
              </button>
            ))}
            <span className="hv-svc__ink" aria-hidden="true" />
          </div>
        </div>

        <div
          key={service.id}
          id="svc-panel"
          role="tabpanel"
          aria-labelledby={`svc-tab-${service.id}`}
          className="hv-svc__panel"
          style={{ "--tone": service.tone }}
        >
          <div className="hv-svc__copy">
            <span className="hv-svc__badge">
              <Icon name={panel.badge.icon} aria-hidden="true" />
              {panel.badge.text}
            </span>
            <h3 className="hv-svc__panel-title">
              {panel.titleLines[0]}
              <br />
              {panel.titleLines[1]}
            </h3>
            <p className="hv-svc__body">{panel.body}</p>
            <ul className="hv-svc__features">
              {panel.features.map((f) => (
                <li key={f.text}>
                  <span className="hv-svc__feature-icon">
                    <Icon name={f.icon} aria-hidden="true" />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <HaloButton to={SERVICES.cta.to}>{SERVICES.cta.label}</HaloButton>
          </div>

          {/* Decorative, and deliberately specific: each service gets the
              interface it actually delivers, drawn in markup - the GHL
              pipeline board for CRM, the automation canvas for AI, the
              reporting dashboard for marketing, the page builder for
              funnels (the same ServiceMockup set the What We Do cards
              use). It replaces a stock photo in a fake browser window
              plus two copies of the service's own icon floating on the
              corner: decoration that was identical for all four services
              and said nothing about any of them.

              The dark stage is what makes it work - these mockups are
              light-screened devices, so they read as lit objects against
              it rather than as more pale boxes on a pale panel. The copy
              beside it still carries all the meaning. */}
          <div className="hv-svc__visual" aria-hidden="true">
            <div className="hv-svc__stage">
              <ServiceMockup kind={panel.mock} />
            </div>
          </div>
        </div>
      </Reveal>
    </HvSection>
  );
}
