const phrases = ["MAKE A MEMORY", "GO SOMEWHERE NEW", "STAY CURIOUS"];
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track mono">
        {Array.from({ length: 8 }, (_, i) => phrases.map((p) => <span key={`${i}-${p}`}>{p}<b>✦</b></span>))}
      </div>
    </div>
  );
}
