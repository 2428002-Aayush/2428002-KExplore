# K Explore – Event Management Website

K Explore is a responsive event discovery and registration website for events in Bhubaneswar. Users can browse upcoming events, search and filter them, open a details view, and register with a validated form. Built for the **K Explore – Web Designing** task.

- **Live site:** https://YOUR-DEPLOYED-LINK  <!-- replace after deploying -->
- **Repository:** https://github.com/YOUR-USERNAME/k-explore  <!-- replace after pushing -->

## Task requirements checklist
| Requirement | Implementation |
|---|---|
| Hero section | `Hero.jsx` – animated headline, call-to-action buttons, live event counter |
| Upcoming and featured events | `Events.jsx` – a "★ Featured events" strip (3 soonest) above the full grid |
| Event cards (name, date, venue, image, description) | `EventCard.jsx` |
| Search and category filter | Search by title, venue, category or description; 7 category filters; empty-state message |
| Event details + registration | `EventModal.jsx` – full details, countdown and registration form |
| Form fields | Name, email, phone, selected event |
| JavaScript validation | See below |
| Confirmation message | Success panel with a reference number, plus a toast |
| Responsive | Phone, tablet and desktop layouts; mobile menu |
| HTML5, CSS3, JavaScript (+ optional React) | React 18 + Vite, plain CSS |
| Bonus: dark/light mode | Toggle in the header, remembered between visits |
| Bonus: countdown timers | Compact on cards, live d/h/m/s in the modal |
| Bonus: animations | Framer Motion + Lenis smooth scroll (both off for `prefers-reduced-motion`) |
| Bonus: Local Storage | Registrations and theme saved in the browser |

## Features
- Events sorted soonest-first, using ISO start times (`+05:30`) so dates parse identically in every browser
- Registration **closes automatically** once an event has started: the dropdown lists only upcoming events and a "Registration closed" notice appears
- Duplicate registrations (same email + event) are rejected
- Accessibility: labelled form fields, focus trap and focus restore in the modal, Esc to close, keyboard-reachable cards

### Form validation
- **Name:** 2–50 characters, starts with a letter; letters, spaces and `. ' -` allowed
- **Email:** valid format (`name@domain.tld`)
- **Phone:** 10-digit Indian mobile number starting 6–9, optional `+91`
- **Selected event:** dropdown, pre-filled with the event you opened

## Tech
React 18, Vite, Framer Motion, Lenis, Lucide icons, plain CSS (custom properties for theming).

## Run locally
```
npm install
npm run dev
```

## Build and deploy
```
npm run build
```
`dist/` is the finished site (relative paths, so it works on sub-paths).
- **Netlify:** drag `dist/` onto app.netlify.com/drop, or connect the repo (build `npm run build`, publish `dist`).
- **Vercel:** import the repo; the framework preset is Vite.
- **GitHub Pages:** publish the contents of `dist/`.

## Project structure
```
src/
├── index.jsx, App.jsx, App.css, index.css
├── lib.js              scroll helper, countdown maths, started-check, safe localStorage wrapper
├── data/events.js      edit this file to add or change events (set `start` in ISO format)
└── components/         Header, Hero, Marquee, Events, EventCard, EventModal, Countdown, About, Contact
```

## Local Storage
Keys: `kexplore-registrations`, `kexplore-theme`.
To view saved registrations: DevTools → Application → Local Storage → `kexplore-registrations`.

## Adding an event
Add an object to `raw` in `src/data/events.js` with `title`, `category`, `start` (e.g. `"2027-03-10T10:00:00+05:30"`), `date`, `time`, `venue`, `image` and `desc`. Sorting, featured badges, countdowns and the registration dropdown update automatically.

## Note on images
Event photos are loaded from Unsplash. If one fails to load, it is hidden and the card layout stays intact.
