import useReveal from "@/hooks/useReveal";

/**
 * Thin wrapper around useReveal for the common case (an arbitrary block
 * that just needs the `.reveal` class + observer attached). Renders as a
 * <div> by default; pass `as` for anything else (the original applied
 * .reveal to <section>, <aside>, <ul> and plain <div>s alike).
 */
export default function Reveal({ as: Tag = "div", index = 0, className = "", children, ...rest }) {
  const ref = useReveal(index);
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
