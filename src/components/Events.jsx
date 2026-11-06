import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { categories, events } from "../data/events";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

export default function Events({ onToast }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const featured = events.filter((e) => e.featured);
  const close = useCallback(() => setSelected(null), []);

  // Search by title, place, category or description, then filter by category
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => (cat === "All" || e.category === cat) &&
      `${e.title} ${e.venue} ${e.category} ${e.desc}`.toLowerCase().includes(q));
  }, [query, cat]);

  return (
    <section id="events" className="section">
      <div className="wrap">
        <motion.div className="ehead" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
          <div><p className="mono">01 / The edit</p><h2>Upcoming <em>events.</em></h2></div>
          <p className="esub">Soonest first. The ★ Featured picks<br />are happening next.</p>
        </motion.div>
        {featured.length > 0 && (
          <div className="fstrip" data-testid="featured-section">
            <p className="mono flabel">★ Featured events</p>
            <div className="fgrid">
              {featured.map((ev) => (
                <button key={ev.id} className="fitem" onClick={() => setSelected(ev)} data-testid={`featured-${ev.id}`}>
                  <img src={ev.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                  <span><small className="mono">{ev.date} · {ev.category}</small><strong>{ev.title}</strong><small>{ev.venue}</small></span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="tools">
          <label className="search"><Search size={16} aria-hidden="true" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, places, moods..." aria-label="Search events" data-testid="event-search-input" />
          </label>
          <div className="cats" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} className={`cat mono ${cat === c ? "on" : ""}`} aria-pressed={cat === c} onClick={() => setCat(c)} data-testid={`category-filter-${c.toLowerCase()}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="egrid">
          <AnimatePresence>{list.map((ev) => <EventCard key={ev.id} ev={ev} onOpen={setSelected} />)}</AnimatePresence>
        </div>
        {!list.length && <p className="empty" data-testid="no-results">No events match that search. Try another word or pick “All”.</p>}
        <p className="mono count">Curated weekly · {list.length} {list.length === 1 ? "event" : "events"}</p>
      </div>
      <AnimatePresence>{selected && <EventModal key={selected.id} ev={selected} onClose={close} onToast={onToast} />}</AnimatePresence>
    </section>
  );
}
