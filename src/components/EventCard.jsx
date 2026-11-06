import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Countdown from "./Countdown";

export default function EventCard({ ev, onOpen }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const spring = { stiffness: 200, damping: 20 };
  const rx = useSpring(useTransform(my, [-.5, .5], [6, -6]), spring);
  const ry = useSpring(useTransform(mx, [-.5, .5], [-6, 6]), spring);
  const move = (e) => { // 3D tilt following the pointer
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - .5); my.set((e.clientY - r.top) / r.height - .5);
  };
  return (
    <motion.article className="ecard" data-testid={`event-card-${ev.id}`}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: .95 }} transition={{ duration: .6 }}
      whileHover={reduce ? undefined : { y: -6 }} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }} onClick={() => onOpen(ev)}>
      <div className="eimg">
        <img src={ev.image} alt={`${ev.title} – ${ev.category} event`} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
        <span className="tag mono">{ev.category}</span>
        {ev.featured && <span className="feat mono">★ Featured</span>}
        <span className="circle" aria-hidden="true"><ArrowUpRight size={16} /></span>
      </div>
      <div className="erow mono"><span><Calendar size={13} /> {ev.date}</span><span>{ev.time}</span></div>
      <h3>{ev.title}</h3>
      <p className="edesc">{ev.desc}</p>
      <p className="mono eloc"><MapPin size={13} /> {ev.venue}</p>
      <Countdown ev={ev} compact />
      <button className="link" onClick={(e) => { e.stopPropagation(); onOpen(ev); }} data-testid={`event-details-button-${ev.id}`}>View details <ArrowUpRight size={14} /></button>
    </motion.article>
  );
}
