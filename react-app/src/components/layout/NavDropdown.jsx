import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import useMegaMenu from "@/hooks/useMegaMenu";

/**
 * One nav item that owns a simple dropdown of services.
 *
 * There are three of these in the bar (AI Automation, Marketing,
 * Funnels, Websites & GHL) - each calls useMegaMenu() itself, so each has
 * its own independent open/close state, hover-intent timers and outside-
 * click handling. That hook was written generically (it takes no menu id
 * or config), specifically so instantiating it per menu here needs no
 * changes to it.
 *
 * This used to be one "Platform" trigger holding all four categories
 * behind a tab switcher. With each category promoted to its own place in
 * the bar, a tab switcher inside a single-category panel would be one tab
 * holding one thing - so this is a plain list, not a mega-menu grid.
 */
export default function NavDropdown({ menu, active, onNavigate }) {
  const id = `navdrop-${menu.id}`;
  const drop = useMegaMenu();

  return (
    <div
      className="nav__item nav__item--drop"
      ref={drop.wrapRef}
      onPointerEnter={drop.onPointerEnter}
      onPointerLeave={drop.onPointerLeave}
    >
      <button
        type="button"
        ref={drop.triggerRef}
        className={`nav__link nav__link--mega${active ? " is-active" : ""}`}
        aria-expanded={drop.open}
        aria-controls={id}
        onClick={drop.toggle}
      >
        {menu.label}
        <Icon name="chevronDown" className="nav__caret" aria-hidden="true" />
      </button>

      <div className={`navdrop${drop.open ? " is-open" : ""}`} id={id}>
        <div className="navdrop__sheet">
          <ul className="navdrop__list">
            {menu.items.map((item) => (
              <li key={item.title}>
                <Link
                  className="navdrop__item"
                  to={item.to}
                  onClick={() => {
                    drop.close();
                    onNavigate?.();
                  }}
                >
                  <span className="navdrop__item-text">
                    <span className="navdrop__item-title">{item.title}</span>
                    <span className="navdrop__item-body">{item.body}</span>
                  </span>
                  <span className="navdrop__item-go" aria-hidden="true">
                    <Icon name="arrowRight" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            className="navdrop__all"
            to={menu.to}
            onClick={() => {
              drop.close();
              onNavigate?.();
            }}
          >
            All {menu.label.toLowerCase()} services
            <Icon name="arrowRight" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
