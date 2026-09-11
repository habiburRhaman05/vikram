import Checklist from "./Checklist.jsx";
import Button from "./Button.jsx";
import Reveal from "./Reveal.jsx";

/** `.plans` - the three pricing cards on Home. `plans` is
 * `{ badge?, name, for, price, priceNote, items, cta: {to, variant,
 * icon, label} }[]`; `featured` marks the middle "Most chosen" card. */
export default function Plans({ plans }) {
  return (
    <div className="plans">
      {plans.map((plan, i) => (
        <Reveal as="article" className={`plan ${plan.featured ? "plan--featured" : ""}`.trim()} index={i} key={i}>
          {plan.badge && <span className="plan__badge">{plan.badge}</span>}
          <h3 className="plan__name">{plan.name}</h3>
          <p className="plan__for">{plan.for}</p>
          <p className="plan__price">
            {plan.price}
            <small>{plan.priceNote}</small>
          </p>
          <Checklist items={plan.items} />
          <Button to={plan.cta.to} variant={plan.cta.variant} icon={plan.cta.icon} block>
            {plan.cta.label}
          </Button>
        </Reveal>
      ))}
    </div>
  );
}
