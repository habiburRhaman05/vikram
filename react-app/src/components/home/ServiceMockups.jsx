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

/* -- 2. AI & automation ---------------------------------------------------- */

/* Node positions in % of the canvas. The edges are drawn in the same
   coordinate space by an SVG with a 100x100 viewBox stretched to the
   canvas. Nodes are 18% x 14% (see .hv-mk-node), so a node at (x, y) has
   its left-middle at (x, y+7) and right-middle at (x+18, y+7) - exactly
   where each connector below starts and ends. */
const NODES = [
  { id: "trigger", x: 4, y: 42, tone: "is-trigger" },
  { id: "ai", x: 34, y: 14, tone: "is-ai" },
  { id: "crm", x: 34, y: 66 },
  { id: "sms", x: 70, y: 14 },
  { id: "book", x: 70, y: 66, tone: "is-done" },
];
const EDGES = [
  "M22 49 C 28 49, 28 21, 34 21",
  "M22 49 C 28 49, 28 73, 34 73",
  "M52 21 L 70 21",
  "M52 73 L 70 73",
  "M52 25 C 61 25, 61 69, 70 69",
];

function AiMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop>
        <div className="hv-mk-flow">
          <div className="hv-mk-flow__rail">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={i === 1 ? "is-on" : ""} />
            ))}
          </div>
          <div className="hv-mk-flow__canvas">
            <svg className="hv-mk-flow__edges" viewBox="0 0 100 100" preserveAspectRatio="none">
              {EDGES.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </svg>
            {NODES.map((n) => (
              <div
                key={n.id}
                className={`hv-mk-node ${n.tone || ""}`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span className="hv-mk-node__ic" />
                <span className="hv-mk-node__txt">
                  <Bar w={80} c="is-strong" />
                  <Bar w={54} />
                </span>
              </div>
            ))}
          </div>
          <div className="hv-mk-flow__chat">
            <span className="hv-mk-bubble">
              <Bar w={90} />
              <Bar w={60} />
            </span>
            <span className="hv-mk-bubble is-me">
              <Bar w={70} />
            </span>
            <span className="hv-mk-bubble">
              <Bar w={84} />
              <Bar w={40} />
            </span>
          </div>
        </div>
      </Laptop>
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

/* -- 4. Website development ------------------------------------------------ */

function WebsiteMock() {
  return (
    <div className="hv-mk-scene">
      <span className="hv-mk-pedestal" />
      <Laptop className="hv-mk-laptop--raised">
        <div className="hv-mk-site">
          <div className="hv-mk-site__nav">
            <span className="hv-mk-dot" />
            <Bar w={10} />
            <Bar w={10} />
            <Bar w={10} />
            <span className="hv-mk-pill hv-mk-pill--sm">&nbsp;</span>
          </div>
          <div className="hv-mk-site__hero">
            <div className="hv-mk-site__copy">
              <Bar w={34} c="is-accent" h={0.9} />
              <Bar w={92} c="is-display" />
              <Bar w={74} c="is-display" />
              <Bar w={84} />
              <Bar w={62} />
              <span className="hv-mk-pill">&nbsp;</span>
            </div>
            <Photo src="/img/home/why-1" className="hv-mk-site__photo" />
          </div>
          <div className="hv-mk-site__tiles">
            <span />
            <span />
            <span />
          </div>
        </div>
      </Laptop>
    </div>
  );
}

/* -- 5. Creative & branding ------------------------------------------------ */

function CreativeMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop>
        <div className="hv-mk-design">
          <div className="hv-mk-design__layers">
            {[70, 54, 62, 48, 58].map((w, i) => (
              <Bar key={i} w={w} c={i === 1 ? "is-on" : ""} />
            ))}
          </div>
          <div className="hv-mk-design__canvas">
            <div className="hv-mk-board">
              <Photo src="/img/home/service-creative" />
              <Bar w={70} c="is-strong" />
              <Bar w={46} />
            </div>
            <div className="hv-mk-board hv-mk-board--dark">
              <Photo src="/img/home/post-landing" />
              <span className="hv-mk-board__cap">&nbsp;</span>
            </div>
            <div className="hv-mk-board is-selected">
              <Photo src="/img/home/why-4" />
              <Bar w={62} c="is-strong" />
              <div className="hv-mk-swatches">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="hv-mk-design__props">
            <Bar w={60} c="is-strong" />
            <Bar w={86} />
            <Bar w={72} />
            <div className="hv-mk-swatches">
              <i />
              <i />
              <i />
              <i />
            </div>
            <Bar w={80} />
          </div>
        </div>
      </Laptop>
    </div>
  );
}

/* -- 6. Video & content ---------------------------------------------------- */

function VideoMock() {
  return (
    <div className="hv-mk-scene">
      <Laptop className="hv-mk-laptop--shifted">
        <div className="hv-mk-edit">
          <div className="hv-mk-edit__bin">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={i === 2 ? "is-on" : ""} />
            ))}
          </div>
          <div className="hv-mk-edit__preview">
            <Photo src="/img/home/why-3" />
            <span className="hv-mk-play" />
          </div>
          <div className="hv-mk-edit__timeline">
            <div className="hv-mk-track">
              <span style={{ left: "0%", width: "34%" }} />
              <span style={{ left: "36%", width: "28%" }} />
              <span style={{ left: "66%", width: "30%" }} />
            </div>
            <div className="hv-mk-track is-alt">
              <span style={{ left: "8%", width: "44%" }} />
              <span style={{ left: "56%", width: "22%" }} />
            </div>
            <div className="hv-mk-track is-audio">
              <span style={{ left: "0%", width: "92%" }} />
            </div>
            <b className="hv-mk-playhead" />
          </div>
        </div>
      </Laptop>

      <Phone className="hv-mk-phone--right">
        <div className="hv-mk-reel">
          <Photo src="/img/home/why-1" />
          <span className="hv-mk-reel__caption">
            <b>&nbsp;</b>
            <b>&nbsp;</b>
          </span>
        </div>
      </Phone>
    </div>
  );
}

const MOCKS = {
  software: SoftwareMock,
  ai: AiMock,
  marketing: MarketingMock,
  website: WebsiteMock,
  creative: CreativeMock,
  video: VideoMock,
};

export default function ServiceMockup({ kind }) {
  const Mock = MOCKS[kind];
  return Mock ? <Mock /> : null;
}
