/* Shared feather-style line icons.
 *
 * Only icons that recur byte-for-byte in several places on the original
 * site are registered here (checkmark, calendar, phone, arrow, etc.) - see
 * the site's own styles.css comment on ".btn svg" for the stroke language
 * these follow. A one-off icon that appears in a single section (the
 * platform.html call-flow diagram, a single feature row) is left as inline
 * SVG in that section component instead of being forced in here, per the
 * "don't over-abstract" instruction - it has no second caller to share with.
 *
 * Usage: <Icon name="check" /> - stroke, fill and sizing are inherited from
 * CSS exactly like the original inline <svg> tags were (.btn svg, .checklist
 * svg, etc. all size icons via a descendant selector). Pass strokeWidth to
 * override the default 2, or width/height for the rare spot that set an
 * explicit pixel size inline in the original markup.
 */

const paths = {
  // Checklist / "included" bullet - circle with a check inside.
  check: (
    <>
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </>
  ),
  // Bold standalone tick - "document received" rows.
  tick: <path d="m5 13 4 4L19 7" />,
  // "Book a demo" - calendar.
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  // Call / phone number.
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  // Directional link/button arrow.
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M19 12l-7 7-7-7" />,
  arrowUp: <path d="M12 19V5M5 12l7-7 7 7" />,
  // Chat-bubble - "Talk to us" / "Ask a question first" / envelope-style contact CTAs.
  message: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  ),
  // @ email - rect envelope.
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  mapPin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  // Single person + partial second - "shared across the team" style rows.
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    </>
  ),
  // Two full people - "unlimited staff seats".
  usersTwo: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  shield: (
    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5Z" />
  ),
  globe: (
    <>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      <circle cx="12" cy="12" r="10" />
    </>
  ),
  pen: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />,
  sliders: (
    <>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </>
  ),
  bolt: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </>
  ),
  filePlus: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6M9 15h6" />
    </>
  ),
  phoneOff: (
    <>
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91" />
      <path d="m2 2 20 20" />
    </>
  ),
  fileCheck: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 15h6M9 11h2" />
    </>
  ),
  trendUp: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 5-6" />
    </>
  ),
  house: (
    <>
      <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 22V12h6v10" />
    </>
  ),
  plus: (
    <>
      <path d="M12 8v8M8 12h8" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </>
  ),
  chatWindow: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  layers: <path d="M4 4h16v4H4zM4 12h16v4H4zM4 20h10" />,
  creditCard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />,
  barChart: (
    <>
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" />
      <rect x="13" y="8" width="3" height="10" />
    </>
  ),
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  shieldCheck: (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>
  ),

  /* -- Added for the Home redesign ------------------------------------- */
  cloud: <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 6 6 0 0 0-11.66-1.5A4 4 0 0 0 6.5 19Z" />,
  brain: (
    <>
      <path d="M12 5a3 3 0 0 0-6 0 3 3 0 0 0-1.6 5.5A3 3 0 0 0 6 16a3 3 0 0 0 6 .5Z" />
      <path d="M12 5a3 3 0 0 1 6 0 3 3 0 0 1 1.6 5.5A3 3 0 0 1 18 16a3 3 0 0 1-6 .5Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M16 8a5 5 0 0 1 0 8" />
    </>
  ),
  palette: (
    <>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.6 2.5-3 2.5h-1.5a2 2 0 0 0-1.3 3.5 1.6 1.6 0 0 1-1.2 3Z" />
      <circle cx="7.5" cy="12" r="1.2" />
      <circle cx="10" cy="7.5" r="1.2" />
      <circle cx="15" cy="8" r="1.2" />
    </>
  ),
  play: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m10 9 5 3-5 3Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  lineChart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m6 15 4-5 3.5 3L20 6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />
    </>
  ),
  quote: <path d="M9 7H6a3 3 0 0 0-3 3v7h7v-7H6m15-3h-3a3 3 0 0 0-3 3v7h7v-7h-4" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  plane: <path d="M21 3 3 10.5l7 3 3 7L21 3Z" />,
  heart: <path d="M12 20.5 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 1 1 19.4 13Z" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h2.5l2.4 12h12L21 7H6" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
    </>
  ),
  graduationCap: (
    <>
      <path d="m12 4 10 5-10 5L2 9Z" />
      <path d="M6 11v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M16.5 14.5h.01" />
    </>
  ),

  /* Social - brand marks, so these are filled rather than stroked. */
  facebook: <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.4-.8 1-.8Z" />,
  x: <path d="M4 3h4.2l4 5.6L17 3h3l-6.4 8L20.5 21h-4.2l-4.4-6.1L6.6 21H3.5l6.9-8.4Z" />,
  linkedin: (
    <>
      <path d="M4.5 9h3v12h-3z" />
      <circle cx="6" cy="5" r="1.8" />
      <path d="M10.5 21V9h3v1.6A3.6 3.6 0 0 1 17 9c2.4 0 4 1.7 4 4.6V21h-3v-6.8c0-1.5-.7-2.4-2-2.4s-2.5 1-2.5 2.6V21Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4.5" />
      <path d="m10 9 5.5 3L10 15Z" />
    </>
  ),
};

export default function Icon({ name, strokeWidth = 2, className, style, width, height, "aria-hidden": ariaHidden = true, ...rest }) {
  const inner = paths[name];
  if (!inner) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`Icon: unknown name "${name}"`);
    }
    return null;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      width={width}
      height={height}
      aria-hidden={ariaHidden}
      {...rest}
    >
      {inner}
    </svg>
  );
}
