import Icon from "@/components/common/Icon.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { Timeline } from "@/components/common/Timeline.jsx";
import { FLOW_MOBILE_BRANCHES } from "@/data/platform";

/** Mobile/tablet fallback for CallFlowDiagram - see styles.css's own
 * comment on the 1150px cutover for why this exists as a second, always-
 * rendered copy rather than a responsive reflow of the six-column
 * diagram. */
export default function FlowMobile() {
  return (
    <Reveal className="flow-mobile">
      <div className="flow-mobile__intro">
        <div className="flow-mobile__intro-node">
          <Icon name="phone" style={{ width: 18, height: 18, color: "var(--aqua-400)" }} />
          <span>
            <strong>New Call Received</strong>
            <em>any channel</em>
          </span>
        </div>
        <span className="flow-mobile__intro-arrow">
          <Icon name="arrowRight" strokeWidth={2.5} />
        </span>
        <div className="flow-mobile__intro-node flow-mobile__intro-node--condition">
          <Icon name="clock" style={{ width: 18, height: 18, color: "var(--ink-600)" }} />
          <span>
            <strong>Business Hours?</strong>
            <em>condition</em>
          </span>
        </div>
      </div>

      {FLOW_MOBILE_BRANCHES.map((branch, i) => (
        <div className="flow-mobile__branch" key={i}>
          <h4 className="flow-mobile__branch-title">
            <span className="flow-mobile__dot" style={{ background: branch.color }} />
            {branch.label}
          </h4>
          <Timeline compact steps={branch.steps} />
        </div>
      ))}
    </Reveal>
  );
}
