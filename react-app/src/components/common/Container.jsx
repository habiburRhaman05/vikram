export default function Container({ narrow = false, className = "", children, ...rest }) {
  const classes = ["container", narrow && "container--narrow", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
