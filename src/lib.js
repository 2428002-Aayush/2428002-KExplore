// Smooth-scroll to a section id (uses Lenis when it is running)
export const scrollToId = (id) => {
  const el = document.getElementById(id); if (!el) return;
  const lenis = window.__lenis;
  lenis ? lenis.scrollTo(el, { offset: id === "top" ? 0 : -70 }) : el.scrollIntoView({ behavior: "smooth" });
};

// ISO start time (IST, +05:30) -> Date. ISO strings parse the same in every browser, Safari included.
export const eventDate = (ev) => new Date(ev.start);

// True once the event has started (registration closes)
export const hasStarted = (ev, now = Date.now()) => !(eventDate(ev) - now > 0);

// Time left until an event, as { done, d, h, m, s }
export const timeLeft = (ev, now = Date.now()) => {
  const ms = eventDate(ev) - now;
  if (!(ms > 0)) return { done: true, d: 0, h: 0, m: 0, s: 0 };
  return { done: false, d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
};

// localStorage helpers that never throw (private mode, blocked storage)
export const store = {
  get: (k, fb) => { let v = null; try { v = localStorage.getItem(k); } catch { return fb; } if (v === null) return fb; try { return JSON.parse(v); } catch { return v; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};
