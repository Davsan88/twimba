# 🐦 Twimba

Hello there! 👋 Twimba is a lightweight Twitter-style feed built with vanilla JavaScript, HTML, and CSS — a fast, minimal project that focuses on state-driven rendering and event delegation.

👉 [Live Demo](https://twimbadavsan.netlify.app/)

Originally a DOM challenge, I pushed it into a fully functional mini-app: tweets render from data, likes/retweets toggle with instant UI updates, replies expand/collapse, and new tweets get unique IDs via uuid.

---

## 🚀 What It Does

- ✅ Renders a feed of tweets from a JS data array
- ✅ Like/retweet buttons toggle state and counts instantly
- ✅ Show/hide replies per tweet
- ✅ Create new tweets (prepended to the feed) with unique UUIDs
- ✅ Clean, component-like rendering via a single renderFeed() function

---

# Technologies Used

- **HTML5** – semantic structure
- **CSS3** – layout & styling
- **JavaScript** (ES6 modules) – state management, rendering, events
- **UUID** – uuidv4 for unique tweet IDs (ESM via jspm.dev)

---

## 📚 Features Covered

- Data-driven UI with a single source of truth (`tweetsData`)
- Template rendering using string interpolation
- Event delegation (`document.addEventListener('click', ...)`)
- Array utilities: `find`, `forEach`, `unshift`
- UI toggles via data flags (`isLiked`, `isRetweeted`) + class switching
- Conditional section rendering (replies)

---

## 💡 Skills Practiced

- Separating data from UI rendering
- Writing pure-ish render functions
- Thinking in state → render flow (framework-friendly mindset)
- Debugging DOM updates and event targets
- Working with ES modules and CDN ESM imports

---

