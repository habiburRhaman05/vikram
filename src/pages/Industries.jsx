import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import StatusPill from "@/components/common/StatusPill.jsx";
import Card from "@/components/common/Card.jsx";
import Checklist from "@/components/common/Checklist.jsx";
import Spotlight from "@/components/common/Spotlight.jsx";
import { Panel } from "@/components/common/Panel.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import Icon from "@/components/common/Icon.jsx";
import { openLeadPopup } from "@/components/common/LeadPopup.jsx";
import { TAX_TAGS, TAX_CHECKLIST, ROADMAP_CARDS, ROLLOUT_STEPS, INDUSTRY_DETAILS } from "@/data/industries";

/* The v2 chrome (same header and footer every other redesigned page uses - see
   ServiceComingSoon.jsx for why both stylesheets are needed). The profession
   picker below is built from that design system's own classes, so its styling
   is the only thing this page adds on top: styles/industries.css. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/industries.css";

/**
 * One profession card.
 *
 * A real <button>, not a div with a click handler: it opens the lead popup
 * with that trade already answered, and a button is what makes that
 * keyboard-operable and announced as an action. The 13 trades carry an icon
 * each; "Something else" is a Link to the contact page instead, because it
 * isn't an answer either - it's a different question.
 */
function ProfessionCard({ icon, label, body, other = false, index = 0, to }) {
  const inner = (
    <>
      {icon && (
        <span className="hv-badge" aria-hidden="true">
          <Icon name={icon} />
        </span>
      )}
      <span className="hv-prof__name">{label}</span>
      <span className="hv-prof__body">{body}</span>
      <span className="hv-prof__go" aria-hidden="true">
        <Icon name="arrowRight" />
      </span>
    </>
  );

  return (
    <Reveal as="li" className="hv-prof__item" index={index}>
      {other ? (
        <Link className="hv-prof__card hv-prof__card--other" to={to}>
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          className="hv-prof__card"
          onClick={() => openLeadPopup({ profession: label })}
        >
          {inner}
        </button>
      )}
    </Reveal>
  );
}

export default function Industries() {
  const [modalIndustry, setModalIndustry] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (modalIndustry && !isClosing) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else if (!modalIndustry) {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalIndustry, isClosing]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setModalIndustry(null);
      setIsClosing(false);
    }, 300);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  return (
    <Layout variant="v2">
      <PageMeta
        title="Industries We Serve - GHLevelUp"
        description="Built for businesses across all trades - accounting, bookkeeping, notary, mortgage, real estate, insurance, financial advice and legal practices. Tell us your profession and we'll show you what a custom build looks like."
        ogDescription="One industry at a time: the profession picks the pipelines, the deadlines and the paperwork the system is built around, rather than a blank CRM asking you to configure it."
      />

      <StructuredData
        page={{
          type: "WebPage",
          name: "Industries we serve",
          description:
            "The professions GHLevelUp builds CRM, automation and marketing systems for.",
          path: "/industries",
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      {/* center: true - matches the page-hero--center fix applied earlier
          in this project (every other page's hero is centered; industries.html
          had fallen back out of sync with that via an external revert this
          migration doesn't want to reintroduce). */}
      <PageHero
        crumb="Industries"
        title="Custom systems for every trade"
        center
        lede="A general-purpose CRM arrives empty and asks you to become a systems administrator. We do the opposite: we tailor the system so it knows your language, your deadlines, and your paperwork."
      >
        <BtnRow style={{ marginTop: 32 }}>
          <Button to="/book" variant="accent" icon="calendar">
            Book a demo
          </Button>
          <Button to="/contact" variant="ghost-light" icon="message">
            Ask about your industry
          </Button>
        </BtnRow>
      </PageHero>

      {/* ── High-Converting Websites ─────────────────────────────────────────────── */}
      <Section>
        <Spotlight
          copy={
            <>
              <StatusPill style={{ marginBottom: 18 }}>Websites &amp; Funnels</StatusPill>
              <h2 className="balance">High-Converting Websites Built for Your Industry</h2>
              <p>
                A beautiful website is only half the battle. We build complete conversion systems—from the landing page design all the way through to the automated follow-up sequences that turn visitors into booked appointments.
              </p>
              <Checklist items={["Custom Branding & Design", "SEO Optimized", "Mobile Responsive", "Lightning Fast Hosting", "Integrated Lead Forms"]} />
              <BtnRow>
                <Button to="/book" variant="accent" icon="arrowRight">
                  See a live demo
                </Button>
              </BtnRow>
            </>
          }
          media={
            <Panel title="Built-in Automation">
              <div className="tags">
                <span className="tag">Lead Capture</span>
                <span className="tag">Instant Alerts</span>
                <span className="tag">Automated Follow-ups</span>
                <span className="tag">Calendar Booking</span>
              </div>
              <p style={{ marginTop: 22, fontSize: ".9rem", color: "var(--muted)" }}>
                Every website we build is directly integrated into your CRM for seamless lead management and follow-up automation.
              </p>
            </Panel>
          }
        />
      </Section>

      {/* ── What is your Profession or Service? ──────────────────────── */}
      <section id="professions" className="hv-section hv-section--dark ind-professions">
        <div className="hv-container">
          <Reveal className="hv-section-head hv-section-head--center">
            <span className="hv-eyebrow">Who we build for</span>
            <h2 className="hv-h2">What is your Profession or Service?</h2>
            <p className="hv-lede">
              Pick yours and tell us where the day actually goes - the calls you miss, the documents you
              chase, the clients you can't track. We'll answer with what your build would look like, and how
              far off it is.
            </p>
          </Reveal>

          <ul className="svcs-industry-grid">
            {INDUSTRY_DETAILS.map((ind, i) => (
              <Reveal 
                as="li" 
                className="svcs-industry-card svcs-industry-card--interactive" 
                key={ind.name} 
                index={i} 
                style={{ "--tone": ind.tone }}
                onClick={(e) => { 
                  triggerRef.current = e.currentTarget; 
                  setModalIndustry(ind); 
                }}
              >
                <span className="svcs-industry-icon">
                  <Icon name={ind.icon} strokeWidth={2} />
                </span>
                <span className="svcs-industry-name">{ind.name}</span>
                <p className="svcs-industry-desc">{ind.body}</p>
              </Reveal>
            ))}
          </ul>

          <p className="hv-prof__note" style={{ marginTop: 'var(--hv-s6)', textAlign: 'center' }}>
            <Icon name="check" aria-hidden="true" />
            Pick your industry above to see a custom plan for your business.
          </p>
        </div>
      </section>

      {/* Modal Overlay */}
      {modalIndustry && (
        <div 
          className={`ind-modal-overlay ${isClosing ? 'is-closing' : ''}`} 
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="ind-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="ind-modal-close" onClick={closeModal}>
              <Icon name="close" />
            </button>
            <div className="ind-modal-header" style={{ "--tone": modalIndustry.tone }}>
              <span className="ind-modal-icon">
                <Icon name={modalIndustry.icon} strokeWidth={2} />
              </span>
              <h3>{modalIndustry.name} Setup</h3>
            </div>
            
            <div className="ind-modal-body">
              <div className="ind-modal-section">
                <h4>The Problem</h4>
                <p>{modalIndustry.modal.problem}</p>
              </div>
              <div className="ind-modal-section">
                <h4>How We Help {modalIndustry.name.endsWith('s') || modalIndustry.name.endsWith('ing') || modalIndustry.name.endsWith('tion') || modalIndustry.name.endsWith('ment') || modalIndustry.name.endsWith('cs') ? modalIndustry.name : modalIndustry.name === 'Notary' ? 'Notaries' : modalIndustry.name + 's'}</h4>
                <p>{modalIndustry.modal.solution}</p>
              </div>
              
              <div className="ind-modal-section">
                <h4>Key Features</h4>
                <ul className="ind-modal-features">
                  {modalIndustry.modal.features.map(f => (
                    <li key={f}><Icon name="check" width={20} height={20} /> {f}</li>
                  ))}
                  <li><Icon name="check" width={20} height={20} /> Lead &amp; Pipeline Management</li>
                  <li><Icon name="check" width={20} height={20} /> SMS &amp; Email Follow-up</li>
                  <li><Icon name="check" width={20} height={20} /> Instant New Lead Alerts</li>
                  <li><Icon name="check" width={20} height={20} /> Missed Call Text-Back</li>
                </ul>
              </div>

              {modalIndustry.modal.services && (
                <div className="ind-modal-section">
                  <h4>Services We Provide</h4>
                  <div className="ind-modal-services">
                    {modalIndustry.modal.services.map(s => (
                      <span className="ind-modal-services__item" key={s}>
                        <Icon name="check" size={14} /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="ind-modal-roi">
                <strong>Impact:</strong> {modalIndustry.modal.roi}
              </div>
            </div>

            <div className="ind-modal-footer">
              <Button to="/book" variant="accent" icon="calendar">
                Book a Demo
              </Button>
              <Button to="/contact" variant="ghost-light" icon="message">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}

  
      <Section tight>
        <CtaBand
          title="Start with the industry that's ready"
          actions={
            <>
              <Button to="/book" variant="accent" size="lg" icon="calendar">
                Book a demo
              </Button>
              <Button href="/#services" variant="ghost-light" size="lg" icon="arrowRight">
                See our services
              </Button>
            </>
          }
        >
          If you prepare tax returns, we can show you a finished system this week - not a roadmap.
        </CtaBand>
      </Section>
    </Layout>
  );
}
