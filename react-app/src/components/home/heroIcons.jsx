/**
 * Icons lifted from the hero reference's markup: the three stat glyphs and
 * the chevron that turns into an arrow on hover.
 *
 * Kept apart from components/common/Icon.jsx because they are drawn on
 * their own 19x18 and 9x10 grids, not that set's 24x24 - forcing them into
 * a 24 box would shift them off-centre. The reference hard-coded a
 * `stroke-primary` class; here the stroke is currentColor so the palette
 * controls it.
 */

const stroke = { stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" };

export const HERO_ICONS = {
  star: (
    <svg viewBox="0 0 19 18" fill="none" aria-hidden="true" focusable="false">
      <path
        {...stroke}
        d="M9.73725 2.39038C9.75891 2.37562 9.79064 2.36454 9.82841 2.36454C9.86618 2.36454 9.89791 2.37562 9.91958 2.39038C9.93727 2.40244 9.95866 2.4234 9.97388 2.47023L11.0799 5.8743C11.2677 6.45234 11.8064 6.84371 12.4142 6.84371H15.9935C16.0427 6.84371 16.0692 6.85758 16.0862 6.87067C16.1069 6.88671 16.1272 6.91347 16.1389 6.94939C16.1506 6.98532 16.1499 7.01891 16.1425 7.04408C16.1365 7.06463 16.1232 7.09145 16.0834 7.12039L13.1877 9.22422C12.696 9.58147 12.4902 10.2147 12.678 10.7928L13.7841 14.1968C13.7993 14.2437 13.7943 14.2732 13.7871 14.2933C13.7782 14.318 13.7591 14.3456 13.7285 14.3678C13.698 14.39 13.6658 14.3997 13.6396 14.4005C13.6182 14.4012 13.5886 14.3968 13.5487 14.3678L10.653 12.264C10.1613 11.9067 9.49549 11.9068 9.00378 12.264L6.10811 14.3678C6.06827 14.3968 6.03865 14.4012 6.01725 14.4005C5.99105 14.3997 5.95887 14.39 5.92831 14.3678C5.89775 14.3456 5.87859 14.318 5.86974 14.2933C5.86252 14.2732 5.85753 14.2437 5.87275 14.1968L6.97879 10.7928C7.16661 10.2147 6.96086 9.58147 6.46914 9.22422L3.57347 7.12039C3.53363 7.09145 3.52031 7.06463 3.51431 7.04408C3.50696 7.01892 3.50624 6.98532 3.51791 6.94939C3.52958 6.91347 3.54992 6.88671 3.57066 6.87067C3.58759 6.85758 3.61413 6.84371 3.66337 6.84371H7.24262C7.85041 6.84371 8.38908 6.45234 8.5769 5.87429L9.68295 2.47023C9.69817 2.42339 9.71956 2.40244 9.73725 2.39038Z"
      />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 19 18" fill="none" aria-hidden="true" focusable="false">
      <path
        {...stroke}
        d="M15.8281 8.8125C15.8281 12.3127 3.82812 12.3127 3.82812 8.8125M9.82812 2.25C6.51462 2.25 3.82812 3.2175 3.82812 4.41C3.82812 7.53 15.8281 7.53 15.8281 4.41C15.8281 3.2175 13.1416 2.25 9.82812 2.25Z"
      />
      <path {...stroke} d="M3.82812 4.5V13.6238C3.82812 16.4588 15.8281 16.4588 15.8281 13.6238V4.5" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 19 18" fill="none" aria-hidden="true" focusable="false">
      <path
        {...stroke}
        d="M12.8138 5.66406L13.3441 5.13381M10.5931 15.1456L16.0666 9.67206C16.3441 9.39456 16.5016 9.01956 16.5068 8.62806L16.5781 3.01131C16.5794 2.91098 16.5606 2.8114 16.5228 2.71845C16.485 2.6255 16.429 2.54106 16.358 2.47011C16.2871 2.39916 16.2026 2.34313 16.1097 2.30534C16.0167 2.26755 15.9171 2.24875 15.8168 2.25006L10.2001 2.32131C9.80797 2.32633 9.43335 2.48431 9.15606 2.76156L3.68256 8.23506C3.17706 8.73981 2.78856 9.70431 3.36456 10.2803L8.54706 15.4628C9.12381 16.0396 10.0883 15.6503 10.5931 15.1456Z"
      />
    </svg>
  ),
};

/* The reference's CTA arrow: a chevron that slides right while a shaft
   fades in behind it, so ">" becomes "->" on hover. Two SVGs stacked in
   one box, exactly as the reference builds it; the motion is in CSS
   (.hv-halo__chev / .hv-halo__shaft). */
export function MorphArrow() {
  return (
    <span className="hv-halo__arrow" aria-hidden="true">
      <svg className="hv-halo__chev" width="9" height="10" viewBox="0 0 9 10" fill="none" focusable="false">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M3.21967 0.21967C3.51256 -0.0732232 3.98744 -0.0732232 4.28033 0.21967L8.28033 4.21967C8.57322 4.51256 8.57322 4.98744 8.28033 5.28033L4.28033 9.2803C3.98744 9.5732 3.51256 9.5732 3.21967 9.2803C2.92678 8.98744 2.92678 8.51256 3.21967 8.21967L6.68934 4.75L3.21967 1.28033C2.92678 0.98744 2.92678 0.51256 3.21967 0.21967Z"
        />
      </svg>
      <svg className="hv-halo__shaft" width="9" height="10" viewBox="0 0 9 10" fill="none" focusable="false">
        <rect y="4" width="7" height="1.5" rx="0.75" fill="currentColor" />
      </svg>
    </span>
  );
}
