import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import Home from "@/pages/Home.jsx";

/**
 * Home is imported eagerly - it's the landing page and the most common
 * entry point, so code-splitting it would only add a round trip before
 * first paint. Every other route is lazy, so a visitor who lands on the
 * home page doesn't download the legal pages and both GHL embeds before
 * seeing anything.
 */
const Services = lazy(() => import("@/pages/Services.jsx"));
const ServiceAiAgentsChatbots = lazy(() => import("@/pages/ServiceAiAgentsChatbots.jsx"));
const Industries = lazy(() => import("@/pages/Industries.jsx"));
const About = lazy(() => import("@/pages/About.jsx"));
const Contact = lazy(() => import("@/pages/Contact.jsx"));
const Book = lazy(() => import("@/pages/Book.jsx"));
const Privacy = lazy(() => import("@/pages/Privacy.jsx"));
const Terms = lazy(() => import("@/pages/Terms.jsx"));
/* Not linked from anywhere in the public site (no nav item, no button, no
   footer entry) - reached only by whoever is given the URL directly. See
   the comment atop Onboarding.jsx for why. */
const Onboarding = lazy(() => import("@/pages/Onboarding.jsx"));
const ServiceComingSoon = lazy(() => import("@/pages/ServiceComingSoon.jsx"));
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
        <Route path="/services" element={<Services />} />
        {/* A real slug ranks above the :slug catch-all below regardless of
            declaration order - see that route's own comment. */}
        <Route path="/services/ai-agents-chatbots" element={<ServiceAiAgentsChatbots />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/onboarding" element={<Onboarding />} />
        {/* Every service link in the nav and on the home page resolves
            here until that specific service gets its own real page - see
            the comment on ServiceComingSoon for why this exists instead
            of every service quietly redirecting to the same page. Give a
            specific slug its own route ABOVE this one later (e.g.
            "/services/ai-agents-chatbots") and it takes over automatically -
            React Router ranks a static path higher than a dynamic :slug
            at the same position regardless of declaration order. */}
        <Route path="/services/:slug" element={<ServiceComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
