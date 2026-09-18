/**
 * Device mockups for the "What We Do" cards.
 *
 * Drawn as components rather than shipped as screenshots. A PNG of a
 * laptop showing a UI has to be re-exported every time the palette
 * changes, blurs on a 3x display, and weighs ~150KB a card; these are a
 * few hundred bytes of markup, pick up the brand tokens, and scale with
 * the card.
 *
 * Everything inside is sized in `cqw` - percent of the art box's width,
 * which is a size container (see .hv-wwd__art). So the frames, the UI
 * inside them and the gaps between all scale together with the card, at
 * every breakpoint, with no media queries in here at all.
 *
 * Decorative throughout: the card's heading and text carry the meaning,
 * so the whole scene is aria-hidden by the caller and photos take alt="".
 *
 * Screens: software (code editor) / ai (workflow canvas) / funnel
 * (drag-and-drop builder) / marketing (dashboard) / crm (GHL pipeline) /
 * voice (AI call) / whitelabel (agency-branded system). Reporting
 * reuses marketing (it reads as a dashboard).
 */

/* -- Frames ---------------------------------------------------------------- */

function Laptop({ className = "", children }) {
  return (
    <div className={`hv-mk-laptop ${className}`}>
      <div className="hv-mk-laptop__screen">
        <span className="hv-mk-laptop__notch" />
        {children}
      </div>
      <div className="hv-mk-laptop__base" />
    </div>
  );
}

function Phone({ className = "", children }) {
  return (
    <div className={`hv-mk-phone ${className}`}>
      <div className="hv-mk-phone__screen">
        <span className="hv-mk-phone__island" />
        {children}
      </div>
    </div>
  );
}

function Tablet({ className = "", children }) {
  return (
    <div className={`hv-mk-tablet ${className}`}>
      <div className="hv-mk-tablet__screen">{children}</div>
    </div>
  );
}

function Photo({ src, className = "" }) {
  return (
    <picture className={`hv-mk-photo ${className}`}>
      <source type="image/webp" srcSet={`${src}.webp`} />
      <img src={`${src}.jpg`} alt="" loading="lazy" decoding="async" />
    </picture>
  );
}

/* Skeleton text line. Real words at 6px would be unreadable noise; a bar
   reads as "text" at a glance, which is all a mockup needs. */
const Bar = ({ w, c = "", h }) => (
  <i className={`hv-mk-bar ${c}`} style={{ width: `${w}%`, ...(h ? { height: `${h}cqw` } : null) }} />
);

/* -- 1. Software development ----------------------------------------------- */

/* [indent, [[colourClass, width%], ...]] - a plausible shape of code, with
   syntax colours drawn from a dark-theme palette. */
const CODE = [
  [0, [["k", 14], ["f", 22], ["t", 10]]],
  [1, [["k", 10], ["t", 18], ["s", 26]]],
  [1, [["t", 12], ["f", 16], ["n", 8]]],
  [2, [["k", 12], ["t", 20]]],
  [2, [["f", 18], ["s", 30]]],
  [1, [["t", 8]]],
  [0, []],
  [0, [["k", 16], ["f", 20], ["t", 12]]],
  [1, [["t", 14], ["a", 22], ["n", 6]]],
  [1, [["k", 10], ["s", 34]]],
  [0, [["t", 8]]],
];

function SoftwareMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop>
        <div className="hv-mk-code">
          <div className="hv-mk-code__side">
            {[62, 48, 70, 40, 56, 44].map((w, i) => (
              <Bar key={i} w={w} c={i === 2 ? "is-on" : ""} />
            ))}
          </div>
          <div className="hv-mk-code__main">
            <div className="hv-mk-code__tabs">
              <span className="is-on" />
              <span />
            </div>
            {CODE.map(([indent, tokens], i) => (
              <div key={i} className="hv-mk-code__ln" style={{ paddingLeft: `${indent * 3.2 + 4}cqw` }}>
                <em>{i + 1}</em>
                {tokens.map(([c, w], j) => (
                  <Bar key={j} w={w} c={`c-${c}`} />
                ))}
                {i === 8 && <b className="hv-mk-caret" />}
              </div>
            ))}
          </div>
        </div>
      </Laptop>

      <Phone className="hv-mk-phone--left">
        <div className="hv-mk-app">
          <div className="hv-mk-app__top">
            <span className="hv-mk-dot" />
            <Bar w={40} />
          </div>
          <Photo src="/img/home/why-3" className="hv-mk-app__hero" />
          <Bar w={78} c="is-strong" />
          <Bar w={56} />
          <span className="hv-mk-pill">&nbsp;</span>
          <div className="hv-mk-app__row">
            <span />
            <span />
          </div>
        </div>
      </Phone>
    </div>
  );
}

/* -- 2. AI & automation (GHL Workflow Builder) ------------------------------- */

function GhlWorkflowMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop>
        <div className="hv-mk-ghl-flow">
          {/* Top Navbar */}
          <div className="hv-mk-ghl-flow__top">
            <div className="hv-mk-ghl-flow__tabs">
              <span className="is-active">Actions</span>
              <span>Settings</span>
              <span>History</span>
              <span>Status</span>
            </div>
            <div className="hv-mk-ghl-flow__actions">
              <span className="hv-mk-ghl-flow__toggle">
                <span className="hv-mk-ghl-flow__knob" />
                Draft
              </span>
              <span className="hv-mk-ghl-flow__save">Save</span>
            </div>
          </div>

          <div className="hv-mk-ghl-flow__main">
            {/* Canvas with Nodes */}
            <div className="hv-mk-ghl-flow__canvas">
              {/* Trigger Node */}
              <div className="hv-mk-ghl-flow__node is-trigger">
                <div className="hv-mk-ghl-flow__node-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </div>
                <div className="hv-mk-ghl-flow__node-txt">
                  <strong>Contact Created</strong>
                  <span>Add New Workflow Trigger</span>
                </div>
              </div>
              
              <div className="hv-mk-ghl-flow__line"><span className="hv-mk-ghl-flow__plus">+</span></div>
              
              {/* Action Node 1 */}
              <div className="hv-mk-ghl-flow__node is-action">
                <div className="hv-mk-ghl-flow__node-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                </div>
                <div className="hv-mk-ghl-flow__node-txt">
                  <strong>Send SMS</strong>
                  <span>AI Agent Intro</span>
                </div>
              </div>

              <div className="hv-mk-ghl-flow__line"><span className="hv-mk-ghl-flow__plus">+</span></div>

              {/* Action Node 2 */}
              <div className="hv-mk-ghl-flow__node is-action">
                <div className="hv-mk-ghl-flow__node-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div className="hv-mk-ghl-flow__node-txt">
                  <strong>AI Booking Bot</strong>
                  <span>Qualify & Book</span>
                </div>
              </div>
            </div>

            {/* Sidebar Settings */}
            <div className="hv-mk-ghl-flow__sidebar">
              <div className="hv-mk-ghl-flow__sidebar-top">
                <strong>Send SMS</strong>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
              <div className="hv-mk-ghl-flow__sidebar-body">
                <div className="hv-mk-ghl-flow__field">
                  <span>Action Name</span>
                  <div className="hv-mk-ghl-flow__input">Send SMS</div>
                </div>
                <div className="hv-mk-ghl-flow__field">
                  <span>Message</span>
                  <div className="hv-mk-ghl-flow__textarea">
                    <Bar w={80} c="is-strong" />
                    <Bar w={50} />
                    <Bar w={65} />
                  </div>
                </div>
                <div className="hv-mk-ghl-flow__save-btn">Save Action</div>
              </div>
            </div>
          </div>
        </div>
      </Laptop>
    </div>
  );
}

/* -- Funnel builder: drag-and-drop page -------------------------------------- */

/* Builder palette down the left, canvas blocks joined by connectors, and a
   conversion metrics rail on the right. Node cells are % of the canvas; a
   node is 16% x 22% (see .hv-mk-fun__node), so a node at (x, y) has its
   left-middle at (x, y+11) and right-middle at (x+16, y+11) - exactly where
   each connector below starts and ends. */
const FUN_NODES = [
  { x: 12, y: 18, tone: "is-opt" },
  { x: 12, y: 48 },
  { x: 12, y: 78 },
  { x: 58, y: 18 },
  { x: 58, y: 48, tone: "is-opt" },
  { x: 58, y: 78, tone: "is-cta" },
];
const FUN_EDGES = [
  "M28 29 C 38 29, 48 21, 58 21",
  "M28 59 C 38 59, 48 51, 58 51",
  "M28 89 C 38 89, 48 81, 58 81",
  "M74 21 C 82 21, 82 51, 74 51",
  "M74 51 C 82 51, 82 81, 74 81",
];

function FunnelMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop>
        <div className="hv-mk-fun">
          <div className="hv-mk-fun__side">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={i === 1 ? "is-on" : ""} />
            ))}
          </div>
          <div className="hv-mk-fun__canvas">
            <svg className="hv-mk-fun__edges" viewBox="0 0 100 100" preserveAspectRatio="none">
              {FUN_EDGES.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </svg>
            {FUN_NODES.map((n, i) => (
              <div
                key={i}
                className={`hv-mk-fun__node ${n.tone || ""}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span className="hv-mk-fun__handle" />
              </div>
            ))}
          </div>
          <div className="hv-mk-fun__rail">
            <div className="hv-mk-card"><b className="is-up">+38%</b><Bar w={70} /></div>
            <div className="hv-mk-card"><b>2.4s</b><Bar w={56} /></div>
            <div className="hv-mk-card"><b className="is-up">12%</b><Bar w={64} /></div>
          </div>
        </div>
      </Laptop>

      {/* The published funnel itself - an opt-in page with real form
          fields, so it reads as a page that captures rather than as the
          CRM card's message list. */}
      <Phone className="hv-mk-phone--right">
        <div className="hv-mk-lead">
          <Bar w={76} c="is-strong" />
          <Bar w={54} />
          <span className="hv-mk-field" />
          <span className="hv-mk-field" />
          <span className="hv-mk-lead__cta">&nbsp;</span>
        </div>
      </Phone>
    </div>
  );
}

/* -- 3. Marketing & growth ------------------------------------------------- */

function Gauge({ value }) {
  /* Half-circle track + value arc. pathLength=100 lets dasharray take the
     value as a straight percentage. */
  return (
    <svg className="hv-mk-gauge" viewBox="0 0 40 24">
      <path d="M4 20 A16 16 0 0 1 36 20" pathLength="100" className="hv-mk-gauge__track" />
      <path
        d="M4 20 A16 16 0 0 1 36 20"
        pathLength="100"
        className="hv-mk-gauge__val"
        style={{ strokeDasharray: `${value} 100` }}
      />
    </svg>
  );
}

function MarketingMock() {
  return (
    <div className="hv-mk-scene">
      <Tablet>
        <div className="hv-mk-dash">
          <div className="hv-mk-dash__stats">
            {["+248%", "1,284", "$18.4k", "4.9"].map((v, i) => (
              <div key={v} className="hv-mk-card">
                <b className={i === 0 ? "is-up" : ""}>{v}</b>
                <Bar w={70} />
              </div>
            ))}
          </div>

          <div className="hv-mk-dash__row">
            <div className="hv-mk-card hv-mk-bars">
              {[42, 64, 38, 80, 56, 92, 70].map((h, i) => (
                <span key={i} style={{ "--h": `${h}%`, "--d": `${i * 45}ms` }} />
              ))}
            </div>
            <div className="hv-mk-card hv-mk-card--center">
              <Gauge value={72} />
              <Bar w={56} />
            </div>
            <div className="hv-mk-card hv-mk-card--center">
              <Gauge value={46} />
              <Bar w={48} />
            </div>
          </div>

          <div className="hv-mk-dash__row hv-mk-dash__row--wide">
            <div className="hv-mk-card hv-mk-line">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path className="hv-mk-line__fill" d="M0 34 L14 26 L28 30 L42 14 L56 20 L70 8 L84 16 L100 4 L100 40 L0 40 Z" />
                <path className="hv-mk-line__stroke" d="M0 34 L14 26 L28 30 L42 14 L56 20 L70 8 L84 16 L100 4" />
              </svg>
            </div>
            <div className="hv-mk-card hv-mk-card--center">
              <span className="hv-mk-donut" />
            </div>
          </div>
        </div>
      </Tablet>
    </div>
  );
}

/* -- 5. GoHighLevel CRM: pipeline board ------------------------------------- */

/* Column/board/card cell geometry in % of the screen, shared by the stage
   header and its stacked deal cards. */
const CRM_COLS = [12, 31, 50, 69];
const CRM_CARDS = [
  [0, 26, "is-hot"],
  [0, 52, ""],
  [1, 30, ""],
  [2, 24, "is-won"],
  [2, 50, ""],
  [3, 30, "is-hot"],
];

function CrmMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop>
        <div className="hv-mk-crm">
          <div className="hv-mk-crm__top">
            <span className="hv-mk-dot" />
            <Bar w={16} c="is-strong" />
            <span className="hv-mk-pill hv-mk-pill--sm">&nbsp;</span>
          </div>
          <div className="hv-mk-crm__board">
            {CRM_COLS.map((x, i) => (
              <span key={i} className="hv-mk-crm__stage" style={{ left: `${x}%` }} />
            ))}
            {CRM_CARDS.map(([col, y, tone], i) => (
              <div
                key={i}
                className={`hv-mk-crm__card ${tone}`}
                style={{ left: `${CRM_COLS[col]}%`, top: `${y}%` }}
              >
                <Bar w={82} c="is-strong" />
                <Bar w={54} />
                <b className="hv-mk-crm__value">$</b>
              </div>
            ))}
          </div>
        </div>
      </Laptop>

      {/* The CRM's other half: the conversation inbox the pipeline feeds.
          It used to repeat the funnel card's landing-page phone verbatim,
          which made two different services look like the same picture. */}
      <Phone className="hv-mk-phone--right">
        <div className="hv-mk-inbox">
          <div className="hv-mk-inbox__top">
            <Bar w={44} c="is-strong" />
            <span className="hv-mk-dot" />
          </div>
          {[true, false, true, false].map((unread, i) => (
            <div key={i} className={`hv-mk-inbox__row ${unread ? "is-unread" : ""}`}>
              <span className="hv-mk-inbox__avatar" />
              <span className="hv-mk-inbox__txt">
                <Bar w={58} c="is-strong" />
                <Bar w={86} />
              </span>
            </div>
          ))}
        </div>
      </Phone>
    </div>
  );
}

/* -- White-label: agency-branded system --------------------------------------- */

function WhiteLabelMock() {
  return (
    <div className="hv-mk-scene">
      <span className="hv-mk-wl__halo" />
      <Laptop>
        <div className="hv-mk-wl">
          <div className="hv-mk-wl__side">
            <span className="hv-mk-wl__brand" />
            <Bar w={72} />
            <Bar w={56} />
            <Bar w={64} />
            <Bar w={48} />
            <Bar w={60} />
          </div>
          <div className="hv-mk-wl__main">
            <div className="hv-mk-wl__top">
              <span className="hv-mk-wl__logo" />
              <Bar w={20} c="is-strong" />
              <span className="hv-mk-pill hv-mk-pill--sm">&nbsp;</span>
            </div>
            <div className="hv-mk-wl__stats">
              <div className="hv-mk-card"><b className="is-up">+38%</b><Bar w={70} /></div>
              <div className="hv-mk-card"><b>1,284</b><Bar w={56} /></div>
              <div className="hv-mk-card"><b>4.9</b><Bar w={64} /></div>
            </div>
            <div className="hv-mk-card hv-mk-line">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path className="hv-mk-line__fill" d="M0 34 L14 26 L28 30 L42 14 L56 20 L70 8 L84 16 L100 4 L100 40 L0 40 Z" />
                <path className="hv-mk-line__stroke" d="M0 34 L14 26 L28 30 L42 14 L56 20 L70 8 L84 16 L100 4" />
              </svg>
            </div>
          </div>
        </div>
      </Laptop>

      {/* The same system under two other agencies' brands, stacked at the
          corner - white-label shown rather than stated. This card used to
          carry the same phone silhouette as the CRM and funnel ones,
          which said nothing about rebranding. */}
      <div className="hv-mk-wl__brands">
        {["#3E8EF7", "#A855F7"].map((brand) => (
          <span key={brand} className="hv-mk-wl__brandcard" style={{ "--brand": brand }}>
            <span className="hv-mk-wl__brandtop">
              <i className="hv-mk-wl__brandlogo" />
              <Bar w={54} />
            </span>
            <span className="hv-mk-wl__brandbars">
              {[52, 74, 40, 88].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -- 6. AI voice agent: live call -------------------------------------------- */

function VoiceMock() {
  return (
    <div className="hv-mk-scene">
      <span className="hv-mk-voice__halo" />
      <Laptop>
        <div className="hv-mk-voice">
          <span className="hv-mk-wave">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <i key={i} style={{ "--d": `${i * 90}ms` }} />
            ))}
          </span>
          <div className="hv-mk-voice__row">
            <span className="hv-mk-bubble">
              <Bar w={88} />
              <Bar w={52} />
            </span>
            <span className="hv-mk-chip is-live">
              <i className="hv-mk-chip__dot" />
              <Bar w={44} />
            </span>
          </div>
          <div className="hv-mk-voice__row hv-mk-voice__row--end">
            <span className="hv-mk-chip">
              <Bar w={60} />
            </span>
            <span className="hv-mk-bubble is-me">
              <Bar w={70} />
            </span>
          </div>
          <div className="hv-mk-voice__row">
            <span className="hv-mk-bubble">
              <Bar w={80} />
            </span>
            <span className="hv-mk-chip is-done">
              <i className="hv-mk-chip__dot" />
              <Bar w={50} />
            </span>
          </div>
        </div>
      </Laptop>
    </div>
  );
}

const MOCKS = {
  software: SoftwareMock,
  ai: GhlWorkflowMock,
  funnel: FunnelMock,
  marketing: MarketingMock,
  whitelabel: WhiteLabelMock,
  crm: CrmMock,
  voice: VoiceMock,
};

export default function ServiceMockup({ kind }) {
  const Mock = MOCKS[kind];
  return Mock ? <Mock /> : null;
}
