export default function BtnRow({ center = false, style, className = "", children }) {
  return (
    <div
      className={`btn-row ${className}`.trim()}
      style={center ? { justifyContent: "center", ...style } : style}
    >
      {children}
    </div>
  );
}
