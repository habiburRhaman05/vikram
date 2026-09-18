import Reveal from "./Reveal.jsx";

/** `.stats` - the 24/7 / EN·ES / 1 / ∞ strip on Platform. Each stat
 * reveals individually (not the row as a whole), matching the original. */
export default function Stats({ items }) {
  return (
    <div className="stats">
      {items.map((item, i) => (
        <Reveal as="div" className="stat" index={i} key={i}>
          <div className="stat__num">{item.num}</div>
          <p className="stat__label">{item.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
