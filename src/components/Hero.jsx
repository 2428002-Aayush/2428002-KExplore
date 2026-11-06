import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { HERO_IMG, events } from "../data/events";
import { scrollToId } from "../lib";

const ease = [.2, .7, .2, 1];
const rise = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .8, delay: d, ease } });

// One masked line of the headline that slides up on load
function Line({ children, i, className }) {
  return (
    <span className="mask">
      <motion.span className={className} style={{ display: "inline-block" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .15 + i * .12, ease }}>{children}</motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]); // subtle parallax
  return (
    <section id="top" className="hero" data-testid="hero-section">
      <div className="glow" aria-hidden="true" /><div className="gridlines" aria-hidden="true" />
      <div className="wrap hero-in">
        <div>
          <motion.p className="mono eyebrow" {...rise(0)}>Your next chapter starts here</motion.p>
          <h1><Line i={0}>Be where</Line><Line i={1} className="grad">it happens.</Line></h1>
          <motion.p className="lede" {...rise(.5)}>K Explore is your passport to the gatherings, ideas, and nights that make a city feel alive.</motion.p>
          <motion.div className="cta" {...rise(.65)}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} className="btn btn-primary" onClick={() => scrollToId("events")} data-testid="hero-explore-button">
              Explore events <ArrowUpRight size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} className="btn" onClick={() => scrollToId("about")} data-testid="hero-about-button">
              <span className="play"><Play size={12} fill="currentColor" /></span>How it works
            </motion.button>
          </motion.div>
        </div>
        <motion.figure className="visual" style={{ y }} initial={{ opacity: 0, scale: .94, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 4 }} transition={{ duration: 1.1, delay: .3, ease }}>
          <div className="clip"><img src={HERO_IMG} fetchPriority="high" decoding="async" alt="Crowd cheering at a live concert under bright stage lights" /></div>
          <span className="badge"><Sparkles size={16} /> Curated<br /><i className="mono">for now</i></span>
          <motion.div className="counter" animate={reduce ? {} : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <span className="mono"><i className="dot" /> Live in Bhubaneswar</span>
            <strong>{String(events.length).padStart(2, "0")}</strong>
            <small>events coming up</small>
          </motion.div>
        </motion.figure>
      </div>
      <div className="wrap hero-meta mono"><span>Scroll to explore</span><i /><span>20.30° N / 85.82° E</span></div>
    </section>
  );
}
