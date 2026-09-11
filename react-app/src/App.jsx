import { Routes, Route } from "react-router-dom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import Home from "@/pages/Home.jsx";
import Platform from "@/pages/Platform.jsx";
import Industries from "@/pages/Industries.jsx";
import About from "@/pages/About.jsx";
import Contact from "@/pages/Contact.jsx";
import Book from "@/pages/Book.jsx";
import Privacy from "@/pages/Privacy.jsx";
import Terms from "@/pages/Terms.jsx";
import NotFound from "@/pages/NotFound.jsx";

export default function App() {
  useScrollRestoration();

  return (
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
  );
}
