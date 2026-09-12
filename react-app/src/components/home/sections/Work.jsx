import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import ImageSlot from "../ImageSlot.jsx";
import { HvSection, Reveal, Btn, Checks, Chip } from "../primitives.jsx";
import { WORK } from "@/data/homeV2";

/**
 * "Selected Projects" - one large featured case study beside a stacked
 * list of three smaller ones.
 *
 * Note: there is no /projects route in this app yet, so "View All
 * Projects" and "View Case Study" both point at /contact. Worth building
 * a real portfolio route before launch rather than leaving CTAs that
 * promise a page that doesn't exist.
 */
export default function Work() {
  return (
    <HvSection>
      <div className="hv-work__head">
        <Reveal>
          <span className="hv-eyebrow">{WORK.eyebrow}</span>
          <h2 className="hv-h2">{WORK.title}</h2>
          <p className="hv-lede">{WORK.lede}</p>
        </Reveal>
        <Reveal className="hv-work__headcta">
          <Btn to={WORK.cta.to} variant="outline" iconAfter={WORK.cta.icon}>
            {WORK.cta.label}
          </Btn>
        </Reveal>
      </div>

      <div className="hv-work">
        <Reveal as="article" className="hv-card hv-card--dark hv-feature">
          <div className="hv-feature__copy">
            <Chip>{WORK.featured.chip}</Chip>
            <h3 className="hv-h2 hv-feature__title">{WORK.featured.title}</h3>
            <p className="hv-body">{WORK.featured.sub}</p>
            <Checks items={WORK.featured.checks} className="hv-feature__checks" />
            <Btn to={WORK.featured.cta.to} variant="outline" iconAfter="arrowRight">
              {WORK.featured.cta.label}
            </Btn>
          </div>
          <ImageSlot
            src={WORK.featured.image}
            alt={`${WORK.featured.title} - ${WORK.featured.sub}`}
            ratio="16/11"
            label={WORK.featured.imageLabel}
            className="hv-feature__media"
          />
        </Reveal>

        <ul className="hv-work__list">
          {WORK.projects.map((p, i) => (
            <Reveal as="li" key={p.title} index={i + 1}>
              <Link to="/contact" className="hv-card hv-card--hover hv-project">
                <ImageSlot
                  src={p.image}
                  alt=""
                  ratio="4/3"
                  label="Project"
                  className="hv-project__media"
                />
                <span className="hv-project__text">
                  <strong className="hv-h3">{p.title}</strong>
                  <span className="hv-body">{p.category}</span>
                </span>
                <Icon name="arrowRight" className="hv-project__arrow" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </HvSection>
  );
}
