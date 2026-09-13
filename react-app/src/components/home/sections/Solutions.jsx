import { HvSection, SectionHead, Reveal, IconBadge } from "../primitives.jsx";
import { SOLUTIONS } from "@/data/homeV2";

/** "Complete Digital Solutions" - the nine-up service grid. */
export default function Solutions() {
  return (
    <HvSection>
      <SectionHead eyebrow={SOLUTIONS.eyebrow} title={SOLUTIONS.title}>
        {SOLUTIONS.lede}
      </SectionHead>

      <ul className="hv-grid hv-grid--auto-3 hv-solutions">
        {SOLUTIONS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i} className="hv-card hv-card--hover hv-solution">
            <IconBadge icon={item.icon} size="sm" />
            <div>
              <h3 className="hv-h3">{item.title}</h3>
              <p className="hv-body">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}
