import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Contact({ onToast }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setError("Please enter a valid email address."); return; }
    setError(""); setEmail(""); onToast("You are in. Watch your inbox for good things.");
  };
  return (
    <section id="contact" className="contact">
      <motion.div className="wrap" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
        <p className="mono">03 / Keep in touch</p>
        <h2>Don’t miss<br />the moment.</h2>
        <p className="acopy">Fresh drops, city secrets, and the occasional very good reason to leave the house.</p>
        <form className="sub" onSubmit={submit} noValidate>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" data-testid="contact-email-input" />
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .92 }} type="submit" className="circle big" aria-label="Subscribe" data-testid="contact-submit-button"><ArrowRight size={20} /></motion.button>
        </form>
        <small className="suberr" role="alert">{error}</small>
      </motion.div>
    </section>
  );
}
