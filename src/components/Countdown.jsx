import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { timeLeft } from "../lib";

// Live countdown. compact = "36d 4h" on cards, full = "36d 04h 12m 09s" in the modal.
export default function Countdown({ ev, compact }) {
  const [t, setT] = useState(() => timeLeft(ev));
  useEffect(() => {
    setT(timeLeft(ev));
    const id = setInterval(() => setT(timeLeft(ev)), compact ? 30000 : 1000);
    return () => clearInterval(id);
  }, [ev, compact]);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="cd mono" data-testid={`countdown-${ev.id}`}>
      <Timer size={13} aria-hidden="true" />
      {t.done ? "Event started" : compact ? `${t.d}d ${t.h}h left` : `Starts in ${t.d}d ${pad(t.h)}h ${pad(t.m)}m ${pad(t.s)}s`}
    </span>
  );
}
