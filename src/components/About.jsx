import { motion } from "framer-motion";

const stats = [["48k", "explorers in our orbit (sample)"], ["8", "events this season"], ["4.9", "average good-time rating (sample)"]];
export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
          <p className="mono">02 / The K Explore way</p>
          <h2>More than a<br /><em>calendar.</em></h2>
          <p className="acopy">We believe the right room can change the direction of your life. So we go looking for the rooms worth entering — the tiny gigs, the big ideas, the beautiful weirdos.</p>
        </motion.div>
        <div className="stats">
          {stats.map(([n, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12, duration: .7 }}>
              <strong>{n}</strong><span className="mono">{l}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
