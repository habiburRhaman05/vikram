import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import Home from "@/pages/Home.jsx";

/**
 * Home is imported eagerly - it's the landing page and the most common
 * entry point, so code-splitting it would only add a round trip before
 * first paint. Every other route is lazy, so a visitor who lands on the
 * home page doesn't download the platform diagram, the legal pages and
 * both GHL embeds before seeing anything.
 */
const Platform = lazy(() => import("@/pages/Platform.jsx"));
const Industries = lazy(() => import("@/pages/Industries.jsx"));
const About = lazy(() => import("@/pages/About.jsx"));
const Contact = lazy(() => import("@/pages/Contact.jsx"));
const Book = lazy(() => import("@/pages/Book.jsx"));
const Privacy = lazy(() => import("@/pages/Privacy.jsx"));
const Terms = lazy(() => import("@/pages/Terms.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));

/**
 * Deliberately minimal: routes resolve in a few ms from the same origin,
 * and a spinner that flashes for 30ms reads as a glitch. The min-height
 * keeps the header/footer from collapsing together during the swap.
 */
function RouteFallback() {
  return <div style={{ minHeight: "60vh" }} aria-busy="true" aria-live="polite" />;
}

export default function App() {
  useScrollRestoration();

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
