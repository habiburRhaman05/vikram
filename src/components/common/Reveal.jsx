import useReveal from "@/hooks/useReveal";

/**
 * Thin wrapper around useReveal for the common case (an arbitrary block
 * that just needs the `.reveal` class + observer attached). Renders as a
 * <div> by default; pass `as` for anything else (the original applied
 * .reveal to <section>, <aside>, <ul> and plain <div>s alike).
 *
 * `is-in` is rendered from the hook's state rather than added to the DOM
 * behind React's back - see the note in useReveal.js.
 */
export default function Reveal({ as: Tag = "div", index = 0, className = "", children, ...rest }) {
  const { ref, shown } = useReveal(index);
  return (
    <Tag ref={ref} className={`reveal${shown ? " is-in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
