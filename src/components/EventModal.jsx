import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, MapPin, Ticket, X } from "lucide-react";
import { events } from "../data/events";
import { hasStarted, store } from "../lib";
import Countdown from "./Countdown";

const KEY = "kexplore-registrations";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^(?:\+91[\s-]?)?[6-9]\d{9}$/; // Indian mobile, optional +91
const NAME = /^[A-Za-z][A-Za-z .'-]{1,49}$/;

export default function EventModal({ ev, onClose, onToast }) {
  const [eventId, setEventId] = useState(ev.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState({});
  const [done, setDone] = useState(null); // saved registration, shown as confirmation
  const modalRef = useRef(null);
  const selected = events.find((e) => e.id === Number(eventId)) || ev;
  const open = events.filter((e) => !hasStarted(e)); // only upcoming events can be registered for
  const closed = hasStarted(selected);

  // Escape closes, Tab stays inside the dialog, focus returns to the opener on close
  useEffect(() => {
    const opener = document.activeElement;
    const box = modalRef.current;
    box?.querySelector("input")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !box) return;
      const f = [...box.querySelectorAll("button,input,select,a[href]")].filter((x) => !x.disabled);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener("keydown", onKey);
    window.__lenis?.stop(); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", onKey); window.__lenis?.start(); document.body.style.overflow = ""; opener?.focus?.(); };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (closed) return;
    const er = {};
    if (!NAME.test(name.trim())) er.name = "Enter your full name (letters, spaces, . ' -; 2+ characters).";
    if (!EMAIL.test(email.trim())) er.email = "Enter a valid email address.";
    if (!PHONE.test(phone.trim())) er.phone = "Enter a valid 10-digit mobile number.";
    setErr(er);
    if (Object.keys(er).length) return;

    const list = store.get(KEY, []);
    const mail = email.trim().toLowerCase();
    if (list.some((r) => r.eventId === selected.id && r.email.toLowerCase() === mail)) {
      setErr({ email: "This email is already registered for this event." }); return;
    }
    const reg = { id: Date.now(), eventId: selected.id, event: selected.title, name: name.trim(), email: email.trim(), phone: phone.trim(), registeredAt: new Date().toISOString() };
    if (!store.set(KEY, [...list, reg])) onToast("Registered, but your browser blocked saving locally.");
    else onToast("You are on the list. We saved your registration.");
    setDone(reg);
  };

  return (
    <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-label={selected.title} data-lenis-prevent data-testid="event-modal"
        initial={{ opacity: 0, scale: .95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 30 }} transition={{ duration: .35 }}>
        <button className="icon mclose" onClick={onClose} aria-label="Close" data-testid="modal-close-button"><X size={18} /></button>
        <div className="mimg"><img src={selected.image} alt={`${selected.title} – ${selected.category} event`} /><span className="mono mcat">{selected.category}</span></div>
        <div className="mbody">
          <p className="mono">{selected.date} · {selected.time}</p>
          <h2>{selected.title}</h2>
          <p className="mdesc">{selected.desc}</p>
          <p className="mono mmeta"><span><MapPin size={14} /> {selected.venue}</span><span><Clock size={14} /> Doors open 1 hour early</span></p>
          <Countdown ev={selected} />
          {done ? (
            <div className="success" role="status" data-testid="registration-success">
              <Check size={18} />
              <div>
                <strong>You’re registered, {done.name.split(" ")[0]}!</strong>
                <p>{done.event} · {selected.date}, {selected.time}</p>
                <p>Confirmation ref: KEX-{String(done.id).slice(-6)} · sent to {done.email}</p>
              </div>
            </div>
          ) : closed ? (
            <div className="closed" role="status" data-testid="registration-closed">
              <strong>Registration closed</strong>
              <p>This event has already started. Pick another event to register.</p>
              {open.length > 0 && <button className="btn btn-primary" type="button" onClick={() => setEventId(open[0].id)}>Show next event</button>}
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label><span className="lbl mono">Full name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aayush Dev" autoComplete="name" aria-invalid={!!err.name} data-testid="registration-name-input" /><small role="alert">{err.name}</small></label>
              <label><span className="lbl mono">Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" aria-invalid={!!err.email} data-testid="registration-email-input" /><small role="alert">{err.email}</small></label>
              <label><span className="lbl mono">Phone number</span>
                <input type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" autoComplete="tel" aria-invalid={!!err.phone} data-testid="registration-phone-input" /><small role="alert">{err.phone}</small></label>
              <label><span className="lbl mono">Selected event</span>
                <select value={eventId} onChange={(e) => setEventId(e.target.value)} data-testid="registration-event-select">
                  {open.map((x) => <option key={x.id} value={x.id}>{x.title} — {x.date}</option>)}
                </select></label>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: .97 }} className="btn btn-primary full" type="submit" data-testid="registration-submit-button">Save my spot <Ticket size={16} /></motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
