import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Instagram, Linkedin, Mail } from "lucide-react";
import Header, { Logo } from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Events from "./components/Events";
import About from "./components/About";
import Contact from "./components/Contact";
import { store } from "./lib";

export default function App() {
  const [theme, setTheme] = useState(() => store.get("kexplore-theme", "dark"));
  const [toast, setToast] = useState("");

  // Theme is saved to Local Storage and restored on reload
  useEffect(() => { document.documentElement.dataset.theme = theme; store.set("kexplore-theme", theme); }, [theme]);

  // Lenis smooth scrolling (skipped when the user prefers reduced motion)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis(); window.__lenis = lenis;
    let id; const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg); clearTimeout(window.__toast);
    window.__toast = setTimeout(() => setToast(""), 3600);
  }, []);

  return (
    <>
      <Header theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        <Hero />
        <Marquee /><Events onToast={showToast} /><About /><Contact onToast={showToast} />
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <Logo />
          <p className="mono">© 2026 K Explore. Made for the curious.</p>
          <div className="soc">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="footer-instagram"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="footer-linkedin"><Linkedin size={18} /></a>
            <a href="mailto:hello@kexplore.example" aria-label="Email" data-testid="footer-email"><Mail size={18} /></a>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {toast && <motion.div key="toast" className="toast" role="status" data-testid="toast-notification" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}>{toast}</motion.div>}
      </AnimatePresence>
    </>
  );
}
