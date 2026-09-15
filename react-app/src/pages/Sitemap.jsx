import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import Icon from "@/components/common/Icon.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { SITEMAP_GROUPS } from "@/data/sitemap.js";

// v2 chrome (glass header, SiteFooterV2), matching every other redesigned
// page - see Industries.jsx for why both stylesheets are needed. sitemap.css
// only adds the group-card layout on top of that shared system.
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/sitemap.css";

function SitemapCard({ title, icon, links, index }) {
  return (
    <Reveal as="div" className="sitemap-card" index={index}>
      <span className="hv-badge hv-badge--sm" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <h2 className="sitemap-card__title">{title}</h2>
      <ul className="sitemap-card__links">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to}>
                <Icon name="arrowRight" aria-hidden="true" />
                {link.label}
              </Link>
            ) : (
              <a href={link.href}>
                <Icon name="arrowRight" aria-hidden="true" />
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Sitemap() {
  return (
    <Layout
      variant="v2"
      topbar={<>Can't find a page? <a href="/contact">Ask us directly</a></>}
    >
      <PageMeta
        title="Sitemap - GHLevelUp"
        description="Every page on the GHLevelUp website, grouped by section: platform, services, industries, company and legal."
      />

      <PageHero
        crumb="Sitemap"
        title="Every page on this site, one click away"
        center
        lede="A full directory of GHLevelUp.com, grouped the way the site itself is organised, for visitors and search engines alike."
      />

      <Section>
        <div className="hv-grid hv-grid--auto-3">
          {SITEMAP_GROUPS.map((group, i) => (
            <SitemapCard key={group.title} title={group.title} icon={group.icon} links={group.links} index={i} />
          ))}
        </div>
      </Section>
    </Layout>
  );
}
