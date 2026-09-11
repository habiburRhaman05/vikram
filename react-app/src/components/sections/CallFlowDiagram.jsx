import Icon from "@/components/common/Icon.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { FLOW_NODES, FLOW_WIRES, FLOW_WIRE_DELAYS, FLOW_PULSE_BEGINS } from "@/data/platform";

const FLOW_LABEL =
  "A call-handling flowchart. A new call is received, then routed by whether it is currently business hours. " +
  "During business hours, the team answers live; if the call is not answered, the AI receptionist steps in, " +
  "and either way the client ends up connected or with a consultation booked. After hours, the AI receptionist " +
  "answers in English or Spanish, books the next available slot, and the appointment is confirmed by text. On a " +
  "weekend, a bilingual auto-reply is sent, the lead is queued for Monday, and it is followed up with first " +
  "thing that morning.";

/**
 * The desktop six-column call-routing diagram on Platform ("Under the
 * hood"). One-off, single-page content - kept as its own component only
 * because of its size, not because it's reused anywhere. Node positions
 * and wire paths are data-driven (src/data/platform.js) but the SVG
 * structure itself (draw-in overlay + travelling pulse per wire) is
 * reproduced exactly from the original markup. See the mobile fallback,
 * rendered instead below 1150px via CSS (.flow-bleed is hidden, .flow-
 * mobile takes over) - both are always in the DOM, same as the original.
 */
export default function CallFlowDiagram() {
  return (
    <div className="flow-bleed">
      <Reveal as="div" className="flow-canvas">
        <div className="flow" role="img" aria-label={FLOW_LABEL}>
          <svg className="flow-svg" viewBox="-40 -30 1700 590" aria-hidden="true">
            {FLOW_WIRES.map((d, i) => (
              <path className="flow-wire" d={d} key={`base-${i}`} />
            ))}
            {FLOW_WIRES.map((d, i) => (
              <path
                className="flow-wire-fill"
                style={{ transitionDelay: `${FLOW_WIRE_DELAYS[i]}ms` }}
                d={d}
                key={`fill-${i}`}
              />
            ))}
            {FLOW_WIRES.map((d, i) => (
              <circle className="flow-pulse" r="4.5" key={`pulse-${i}`}>
                <animateMotion dur="2.6s" begin={`${FLOW_PULSE_BEGINS[i]}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
          </svg>

          {FLOW_NODES.map((node, i) => (
            <div className="flow-node-anchor" style={{ left: `${node.left}%`, top: `${node.top}%` }} key={i}>
              <div className={`flow-node ${node.variant === "condition" ? "flow-node--condition" : ""}`.trim()} style={{ transitionDelay: `${node.delay}ms` }}>
                <span className={`flow-ic flow-ic--${node.variant}`}>
                  <Icon name={node.icon} strokeWidth={node.strokeWidth || 2} />
                </span>
                <span>
                  <strong>{node.title}</strong>
                  <em>{node.sub}</em>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
