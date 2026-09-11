/** `.info-card` - the plain bordered card used on about/contact/book for a
 * short block of contact info or a secondary CTA. Deliberately just a
 * styled wrapper (unlike Card, its contents differ too much page to page -
 * icon+heading+paragraph here, a <dl> list there - to justify a fixed prop
 * API; see Contact.jsx for the icon-list variant). */
export default function InfoCard({ className = "", style, children }) {
  return (
    <div className={`info-card ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
