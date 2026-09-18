import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { Reveal, Btn } from "@/components/home/primitives.jsx";
import { SITE } from "@/data/site";

/**
 * The "Let's talk" card that sits beside the FAQ on every service detail
 * page. All six pages rendered this markup verbatim apart from the copy, so
 * it lives here once instead of six times.
 *
 * It also fixes the alignment problem that came with the duplicated version:
 * the card was shorter than the FAQ column next to it, leaving a wedge of
 * empty space under it on desktop. Rather than padding it out with filler,
 * the card now carries the two things a reader at this point in the page
 * actually wants - what happens after they click, and every other way to
 * reach us - and `.sd-contact-card` stretches to the row height with the
 * contact block pinned to the bottom (see service-detail.css).
 *
 * `card.titleLines` renders as controlled line breaks where a page wants
 * them; `card.title` is the plain single-string form. Supporting both means
 * neither page has to be rewritten to match the other.
 */

/* The same three steps regardless of service - it describes how we work,
   not what was bought, so it is defined here rather than repeated in six
   data files. */
const NEXT_STEPS = [
  { num: "1", title: "A short call", body: "Twenty minutes on how your business runs today. No deck." },
  { num: "2", title: "A written plan", body: "What we would build, in what order, and what it costs." },
  { num: "3", title: "You decide", body: "No retainer to sign before you have seen the plan." },
];

export default function ServiceContactCard({ card, index = 1 }) {
  return (
    <Reveal className="sd-contact-card" index={index}>
      <div className="sd-contact-card__top">
        <span className="sd-contact-card__eyebrow">{card.eyebrow}</span>

        <h2>
          {card.titleLines
            ? card.titleLines.map((line) => <span key={line}>{line}</span>)
            : card.title}
        </h2>

        <p>{card.body}</p>

        <Btn to={card.cta.to} variant="primary" iconAfter={card.cta.icon}>
          {card.cta.label}
        </Btn>
      </div>

      <div className="sd-contact-card__next">
        <h3>What happens next</h3>
        <ol>
          {NEXT_STEPS.map((step) => (
            <li key={step.num}>
              <span aria-hidden="true">{step.num}</span>
              <span>
                <b>{step.title}</b>
                {step.body}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Pinned to the bottom of the card by margin-top:auto, so the card's
          bottom edge lines up with the FAQ list beside it however many
          questions that list happens to have. */}
      <div className="sd-contact-card__foot">
        <ul className="sd-contact-card__list">
          <li>
            <Icon name="mail" aria-hidden="true" />
            <a href={SITE.emailHref}>{SITE.email}</a>
          </li>
          <li>
            <Icon name="phone" aria-hidden="true" />
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </li>
          <li>
            <Icon name="clock" aria-hidden="true" />
            <span>{SITE.hours}</span>
          </li>
        </ul>

        <p className="sd-contact-card__links">
          <Link to="/contact">Contact page</Link>
          <span aria-hidden="true">·</span>
          <Link to="/services">All services</Link>
        </p>
      </div>
    </Reveal>
  );
}
