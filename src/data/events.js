const u = (id) => `https://images.unsplash.com/photo-${id}?crop=entropy&cs=srgb&fm=jpg&q=75&w=800`;
const IMG = {
  sports: u("1431324155629-1a6deb1dec8d"),
  design: u("1516321318423-f06f85e504b3"),
  pitch: u("1540575467063-178a50c2df87"),
  devops: u("1519389950473-47ba0277781c"),
  festival: u("1506157786151-b8491531f063"),
  music: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=srgb&fm=jpg&q=75&w=800",
  tech: "https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=srgb&fm=jpg&q=75&w=800",
  culture: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=srgb&fm=jpg&q=75&w=800",
  crowd: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&q=75&w=800",
};
export const HERO_IMG = IMG.crowd.replace("w=800", "w=1100");
export const categories = ["All", "Technology", "Music", "Sports", "Workshops", "Business", "Culture"];

const raw = [
  { id: 1, title: "TechNova Hackathon 2026", category: "Technology", start: "2026-12-12T09:00:00+05:30", date: "12 Dec 2026", time: "09:00 AM", venue: "KIIT Campus 14, Bhubaneswar", image: IMG.tech,
    desc: "Teams of up to four build working prototypes in 24 hours with mentors from industry. Prizes for the best AI, IoT and web projects, plus free meals and swag." },
  { id: 2, title: "Neon Nights Live Concert", category: "Music", start: "2026-12-20T18:30:00+05:30", date: "20 Dec 2026", time: "06:30 PM", venue: "Kalinga Stadium, Bhubaneswar", image: IMG.music,
    desc: "Five bands, one stage and a light show. Gates open at 5 PM, food stalls and merchandise counters stay open all evening." },
  { id: 3, title: "Inter-College Football Cup", category: "Sports", start: "2027-01-05T15:00:00+05:30", date: "05 Jan 2027", time: "03:00 PM", venue: "Sports Complex, Patia", image: IMG.sports,
    desc: "Knockout tournament with 16 teams. Entry is free for spectators; the final is played under floodlights on the last day." },
  { id: 4, title: "UI/UX Design Workshop", category: "Workshops", start: "2026-11-28T10:00:00+05:30", date: "28 Nov 2026", time: "10:00 AM", venue: "Design Studio, Infocity", image: IMG.design,
    desc: "A full-day workshop covering user research, wireframing and prototyping in Figma. Bring a laptop; certificates are given to all participants." },
  { id: 5, title: "Startup Pitch Summit", category: "Business", start: "2027-01-18T11:00:00+05:30", date: "18 Jan 2027", time: "11:00 AM", venue: "Mayfair Convention Centre", image: IMG.pitch,
    desc: "Ten early-stage startups pitch to a panel of investors, followed by a networking lunch and a fireside chat on funding in India." },
  { id: 6, title: "Odissi & Folk Cultural Fest", category: "Culture", start: "2027-02-02T17:00:00+05:30", date: "02 Feb 2027", time: "05:00 PM", venue: "Rabindra Mandap, Bhubaneswar", image: IMG.culture,
    desc: "An evening of Odissi, Sambalpuri folk and Chhau performances, with a handicraft fair and traditional Odia food stalls." },
  { id: 7, title: "Cloud & DevOps Bootcamp", category: "Workshops", start: "2026-12-05T10:00:00+05:30", date: "05 Dec 2026", time: "10:00 AM", venue: "Innovation Lab, KIIT", image: IMG.devops,
    desc: "Hands-on sessions on Git, Docker and CI/CD. By the end you will have deployed a working web app. Basic programming knowledge needed." },
  { id: 8, title: "Electro Beats Music Festival", category: "Music", start: "2027-02-14T16:00:00+05:30", date: "14 Feb 2027", time: "04:00 PM", venue: "Marine Drive Grounds", image: IMG.festival,
    desc: "Six DJs, a silent disco zone and food trucks. Wristbands are scanned at the gate, so keep your registration confirmation handy." },
];

// Sorted soonest-first; the three nearest upcoming events are "featured"
const now = Date.now();
export const events = raw
  .map((e) => ({ ...e, ts: new Date(e.start).getTime() }))
  .sort((a, b) => a.ts - b.ts)
  .map((e, i, arr) => ({ ...e, featured: arr.filter((x) => x.ts >= now && x.ts < e.ts).length < 3 && e.ts >= now }));
