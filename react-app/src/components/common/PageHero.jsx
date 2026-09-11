import Container from "./Container.jsx";
import { Link } from "react-router-dom";

/**
 * `.page-hero` - the dark banner every page but Home opens with
 * (breadcrumb, h1, lede, optional button row). `center` matches
 * `.page-hero--center`, used on Platform/About/Contact/Book but not
 * Industries/Privacy/Terms - see styles.css's own comment on that class
 * for why the two variants exist.
 */
export default function PageHero({ crumb, title, lede, center = false, children }) {
  return (
    <section className={`page-hero ${center ? "page-hero--center" : ""}`.trim()}>
      <Container>
        <p className="crumbs">
          <Link to="/">Home</Link> <span>/</span> {crumb}
        </p>
        <h1 className="balance">{title}</h1>
        <p className="lede">{lede}</p>
        {children}
      </Container>
    </section>
  );
}
