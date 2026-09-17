import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import { workBySlug, WORK_PROJECTS, WORK_NOTE } from "@/data/work.jsx";

import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/work.css";

/**
 * /work/:slug - the case-study template, fed by one entry in
 * data/work.jsx's WORK_PROJECTS. One component serves every project, the
 * same pattern BlogPost.jsx uses for /blog/:slug.
 *
 * Four sections: an executive-summary hero (the project's own framing
 * statement beside a coded device mockup of the image already used for it
 * elsewhere on the site - not a second, different image), the challenge
 * against the solution, the GoHighLevel tools actually deployed, and a
 * "what changed" outcomes section in place of the fabricated metrics a
 * template like this would normally carry - see WORK_NOTE and the header
 * comment in data/work.jsx for why.
 */

function NotFound({ slug }) {
  return (
    <Layout variant="v2" topbar="Want to see how this would work for your business? Book a free consultation">
      <PageMeta title="Project not found - GHLevelUp" description="This project could not be found." noIndex />
      <HvSection className="wk-missing">
        <Reveal>
          <span className="hv-eyebrow">Our work</span>
          <h1 className="hv-h2">We couldn't find "{slug}"</h1>
          <p className="hv-body">That project may have moved. Browse everything we've built instead.</p>
          <Btn to="/work" variant="primary" iconAfter="arrowRight">
            See all work
          </Btn>
        </Reveal>
      </HvSection>
    </Layout>
  );
}

export default function WorkDetail() {
  const { slug } = useParams();
  const project = workBySlug(slug);

  if (!project) return <NotFound slug={slug} />;

  const more = WORK_PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <Layout variant="v2" topbar="Want to see how this would work for your business? Book a free consultation">
      <PageMeta
        title={`${project.title} - Our Work - GHLevelUp`}
        description={project.body}
        ogDescription={project.heroStatement}
      />

      <StructuredData
        page={{
          type: "ItemPage",
          name: project.title,
          description: project.body,
          path: `/work/${project.id}`,
        }}
        extra={[
          {
            "@type": "CreativeWork",
            name: project.title,
            description: project.body,
            abstract: project.heroStatement,
            genre: project.industry,
            keywords: project.tags.join(", "),
            author: { "@type": "Organization", name: "GHLevelUp" },
          },
        ]}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/work" },
          { name: project.title, path: `/work/${project.id}` },
        ]}
      />

      <div className="wk-pg">
        {/* -- Executive summary hero ------------------------------------- */}
        <section className="wk-dhero" style={{ "--tone": project.tone }}>
          <div className="hv-container wk-dhero__inner">
            <Reveal>
              <p className="wk-hero__crumbs">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/work">Our Work</Link>
                <span>/</span>
                {project.title}
              </p>
              <span className="wk-dhero__industry">{project.industry}</span>
              <p className="wk-dhero__statement">&ldquo;{project.heroStatement}&rdquo;</p>
              <ul className="wk-dhero__tags">
                {project.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Btn to="/book" variant="primary" size="lg" iconAfter="arrowRight">
                Get Free Consultation
              </Btn>
            </Reveal>

            <Reveal className="wk-device" index={1}>
              <span className="wk-device__bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <picture>
                <source type="image/webp" srcSet={`${project.image}.webp`} />
                <img src={`${project.image}.jpg`} alt="" width={960} height={600} loading="eager" decoding="async" />
              </picture>
            </Reveal>
          </div>
        </section>

        {/* -- Challenge vs solution ---------------------------------------- */}
        <HvSection className="wk-cvs">
          <div className="wk-cvs__grid">
            <Reveal className="wk-cvs__col wk-cvs__col--problem">
              <span className="wk-cvs__tag">The challenge</span>
              <p>{project.challenge}</p>
            </Reveal>

            <Reveal className="wk-cvs__col wk-cvs__col--solution" index={1}>
              <span className="wk-cvs__tag wk-cvs__tag--accent">The solution</span>
              <ul>
                {project.solutionPoints.map((s) => (
                  <li key={s}>
                    <Icon name="check" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </HvSection>

        {/* -- GoHighLevel tech stack ---------------------------------------- */}
        <HvSection dark className="wk-stack">
          <Reveal className="wk-head">
            <span className="hv-eyebrow">The GoHighLevel tech stack</span>
            <h2 className="hv-h2">What Actually Runs This</h2>
          </Reveal>

          <ul className="wk-stack__list">
            {project.techStack.map((t, i) => (
              <Reveal as="li" key={t} index={i}>
                <span className="wk-stack__num">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </Reveal>
            ))}
          </ul>
        </HvSection>

        {/* -- What changed (outcomes, not fabricated metrics) ---------------- */}
        <HvSection mint className="wk-outcomes">
          <Reveal className="wk-head">
            <span className="hv-eyebrow">What changed</span>
            <h2 className="hv-h2">The Difference, in Practice</h2>
          </Reveal>

          <ul className="wk-outcomes__grid">
            {project.outcomePoints.map((o, i) => (
              <Reveal as="li" key={o} index={i}>
                <span aria-hidden="true">
                  <Icon name="trendUp" />
                </span>
                <p>{o}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal as="p" className="wk-outcomes__note" index={3}>
            <Icon name="shieldCheck" aria-hidden="true" />
            {WORK_NOTE}
          </Reveal>
        </HvSection>

        <ServiceEnquiryForm
          service={`A project like "${project.title}"`}
          eyebrow="Get started"
          title="Want something like this?"
          lede="Tell us what you're trying to fix. We'll say what we'd actually build for it, and what it would take."
          points={[
            "An honest view of whether this shape of build fits your business",
            "A written plan before any commitment",
            "No obligation, and no retainer to sign before you see it",
          ]}
        />

        {more.length > 0 && (
          <HvSection className="wk-more">
            <Reveal className="wk-head">
              <span className="hv-eyebrow">More work</span>
              <h2 className="hv-h2">Other Systems We've Built</h2>
            </Reveal>

            <ul className="wk-more__grid">
              {more.map((p) => (
                <li key={p.id}>
                  <Link to={`/work/${p.id}`} className="wk-more__card" style={{ "--tone": p.tone }}>
                    <picture>
                      <source type="image/webp" srcSet={`${p.image}.webp`} />
                      <img src={`${p.image}.jpg`} alt="" width={480} height={320} loading="lazy" decoding="async" />
                    </picture>
                    <span className="wk-more__shade" aria-hidden="true" />
                    <div>
                      <span>{p.industry}</span>
                      <h3>{p.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <Reveal className="wk-cta-row" index={1}>
              <Btn to="/work" variant="outline" iconAfter="arrowRight">
                See all work
              </Btn>
            </Reveal>
          </HvSection>
        )}
      </div>
    </Layout>
  );
}
