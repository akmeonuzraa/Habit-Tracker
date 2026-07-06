<div align="center">

# 🖤 My Habits

### A refined, monochrome habit-tracking app with real-time analytics

[![React](https://img.shields.io/badge/React-19-black?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-black?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-black?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-black?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-black?style=flat-square)](#license)

*Build better habits, one checkbox at a time — no color, no clutter, just clarity.*

</div>

---

## Overview

**My Habits** is a fully responsive, interactive habit-tracking application built around a strict black-and-white design system. Every habit you add gets its own row in a monthly grid — check off the days you follow through, and the app instantly turns that into daily progress charts, an overall completion ring, and a ranked list of your strongest habits.

No sign-up, no server, no noise. Your data lives in your browser and is saved automatically the moment you make a change.

---

## ✨ Features

- **Custom habits** — add any habit you want, with your own name and emoji icon
- **Monthly tracker grid** — every day of the current month, grouped by week, with today's column highlighted
- **One-click check-ins** — tap a cell to mark a habit done; tap again to undo
- **Daily Progress chart** — a live bar chart showing the percentage of habits completed each day
- **Overall Completion ring** — a donut chart summarizing total check-ins done vs. left for the month
- **Top Habits ranking** — habits sorted by completion rate so you always know what's working
- **Automatic persistence** — changes save instantly to local storage, with a subtle saving/saved indicator
- **Fully responsive** — the grid scrolls horizontally on mobile while the habit-name column stays pinned
- **Monochrome design system** — black, white, and gray only; hierarchy is built with contrast and weight, not color

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Animation | Motion |
| Persistence | Browser local storage |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/akmeonuzraa/Habit-Tracker.git
cd Habit-Tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
Habit-Tracker/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Title, month label, and add-habit form
│   │   ├── TrackerGrid.tsx   # Monthly checkbox grid
│   │   ├── AnalyticsRow.tsx  # Daily progress, completion ring, top habits
│   │   └── EmptyState.tsx    # First-run empty state
│   ├── utils/
│   │   └── dateUtils.ts      # Month/week/day calculation helpers
│   ├── types.ts              # Habit, DayProgress, SaveStatus types
│   ├── App.tsx                # App state, persistence, and layout
│   └── main.tsx               # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗺️ Roadmap

- [ ] Habit streaks and best-streak tracking
- [ ] Export data to CSV
- [ ] Custom color-blind-friendly accent mode
- [ ] Multi-month history view
- [ ] Reminders / notifications

---

## 🤝 Contributing

Contributions are welcome. If you'd like to add a feature or fix a bug:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

<div align="center">

Built with care by Amoura Kenza aka [akmeonuzraa](https://github.com/akmeonuzraa) at 3am - 06/07/2026

</div>
