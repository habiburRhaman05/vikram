/**
 * `.section` wrapper matching the site's own boolean modifiers
 * (section--mist / section--ink / section--tight / section--flush-top).
 * Every page section on the original site is `<section class="section ...">
 * <div class="container">...`; this collapses that pair into one component
 * so pages don't repeat the container each time.
 */
export default function Section({
  mist = false,
  ink = false,
  tight = false,
  flushTop = false,
  narrow = false,
  id,
  className = "",
  containerStyle,
  children,
  ...rest
}) {
  const classes = [
    "section",
    mist && "section--mist",
    ink && "section--ink",
    tight && "section--tight",
    flushTop && "section--flush-top",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} {...rest}>
      <div className={narrow ? "container container--narrow" : "container"} style={containerStyle}>
        {children}
      </div>
    </section>
  );
}
