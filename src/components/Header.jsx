import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { scrollToId } from "../lib";

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="K Explore home" data-testid="logo-link" onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 3h4v7l7-7h5l-8.5 9L22 21h-5l-7-7.5V21H6z" fill="currentColor" /></svg>
      <span>K EXPLORE<b>.</b></span>
    </a>
  );
}

const links = [["Discover", "events"], ["Our world", "about"], ["Contact", "contact"]];

export default function Header({ theme, onTheme }) {
  const [open, setOpen] = useState(false);
  const go = (id) => (e) => { e.preventDefault(); setOpen(false); scrollToId(id); };
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo />
        <nav className="nav" aria-label="Primary">
          {links.map(([t, id]) => <a key={id} href={`#${id}`} onClick={go(id)} data-testid={`nav-${id}`}>{t}</a>)}
        </nav>
        <div className="hdr-r">
          <button className="icon" onClick={onTheme} aria-label="Toggle light and dark theme" data-testid="theme-toggle-button">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} className="btn btn-light hide-m" onClick={go("events")} data-testid="header-explore-button">
            Find an event <ArrowUpRight size={14} />
          </motion.button>
          <button className="icon burger" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} data-testid="mobile-menu-button">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mnav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} data-testid="mobile-menu">
            {links.map(([t, id]) => <a key={id} href={`#${id}`} onClick={go(id)} data-testid={`mobile-nav-${id}`}>{t}</a>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
