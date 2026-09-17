import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import useMegaMenu from "@/hooks/useMegaMenu";
import { NAV_MENUS } from "@/data/navMenus.js";

/**
 * The single "Services" trigger in the primary nav. Unlike the old
 * three-trigger setup (one flat dropdown per category), this is a true
 * master-detail mega menu: a left sidebar of categories (icon + label +
 * chevron) and a right-hand grid of the active category's service cards.
 * Hovering or focusing a sidebar row swaps which category's cards show on
 * the right - the panel itself only opens/closes once, via useMegaMenu(),
 * exactly like the old per-category triggers did.
 */
export default function MegaMenu({ active, onNavigate }) {
  const id = "navdrop-services";
  const drop = useMegaMenu();
  const [activeId, setActiveId] = useState(NAV_MENUS[0].id);
  const activeMenu = NAV_MENUS.find((menu) => menu.id === activeId) ?? NAV_MENUS[0];

  return (
    <div
      className="nav__item nav__item--drop nav__item--mega"
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
        Services
        <Icon name="chevronDown" className="nav__caret" aria-hidden="true" />
      </button>

      <div className={`megadrop${drop.open ? " is-open" : ""}`} id={id}>
        <div className="megadrop__sheet">
          {/* Left: category sidebar. onPointerEnter switches the active
              category on hover (desktop); onClick/onFocus cover touch and
              keyboard, where there is no hover to key off of. */}
          <div className="megadrop__cats" role="tablist" aria-label="Service categories">
            {NAV_MENUS.map((menu) => (
              <button
                key={menu.id}
                type="button"
                role="tab"
                aria-selected={menu.id === activeMenu.id}
                className={`megadrop__cat${menu.id === activeMenu.id ? " is-active" : ""}`}
                onPointerEnter={() => setActiveId(menu.id)}
                onFocus={() => setActiveId(menu.id)}
                onClick={() => setActiveId(menu.id)}
              >
                <span className={`megadrop__cat-icon megadrop__cat-icon--${menu.accent}`} aria-hidden="true">
                  <Icon name={menu.icon} />
                </span>
                <span className="megadrop__cat-label">{menu.navLabel ?? menu.label}</span>
                <Icon name="chevronRight" className="megadrop__cat-chevron" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Right: the active category's services, as cards. */}
          <ul className="megadrop__grid" aria-label={`${activeMenu.label} services`}>
            {activeMenu.items.map((item) => (
              <li key={item.title}>
                <Link
                  className="megadrop__card"
                  to={item.to}
                  onClick={() => {
                    drop.close();
                    onNavigate?.();
                  }}
                >
                  <span className="megadrop__card-text">
                    <span className="megadrop__card-title">{item.title}</span>
                    <span className="megadrop__card-body">{item.body}</span>
                  </span>
                  <span className="megadrop__card-go" aria-hidden="true">
                    <Icon name="arrowRight" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
