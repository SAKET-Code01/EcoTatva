# 🌿 EcoTatva
### *Turn boring eco-lessons into daily real-world habits — powered by Gemini AI*

[![GDG Solution Challenge 2026](https://img.shields.io/badge/GDG-Solution%20Challenge%202026-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/community/gdsc-solution-challenge)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%201.5%20Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

> **"Every year, 8 million tons of plastic enter our oceans — yet most students learn about it in a textbook and forget by tomorrow. EcoTatva changes that."**

---

## 🎯 The Problem

Environmental education in schools is stuck in the 19th century. Students read about climate change, take a test, and move on. There's no habit formation, no personal accountability, no measurable impact. 78% of students can't name three sustainable habits they practice daily (UNICEF 2023). That gap between knowledge and action is exactly what EcoTatva is built to close.

## 💡 Our Solution

EcoTatva is a gamified web app where school and college students complete **real-world, AI-personalized eco-tasks daily**, earn XP and badges, compete on global and local leaderboards, share achievements with a community, and watch their actual environmental impact grow — one habit at a time.

The core loop is simple and addictive:

```
🎯 Learn  →  ✅ Do Task  →  ⭐ Earn XP  →  🏅 Unlock Badge  →  📊 Leaderboard  →  🔄 Return Daily
```

Powered by **Google Gemini 1.5 Flash**, every task is personalized to the student's age, city, and history. Every quiz is generated fresh. Every piece of feedback feels human. EcoTatva isn't teaching sustainability — it's building the *habit* of it.

---

## ✅ What's Included (MVP Features)

Everything in the hackathon MVP is live and working:

- 🔐 **Google + Email authentication** — sign in with Google in one tap, Firebase Auth handles the rest
- 👶 **Kids / Adult mode toggle** — age-appropriate content and safety guardrails for under-13s
- 📋 **Daily 3-task system** — Gemini generates 3 personalized eco-tasks every morning based on your age, city, and past activity
- ⭐ **Full reward engine** — XP points, streaks, 8+ badge types, and 5 rank tiers (Seed → Forest Guardian)
- 📚 **3 education topics** — Waste Management, Water Conservation, Energy Saving — each with Gemini-generated lessons and 5-question quizzes
- 🎮 **Smart Waste Sorting mini game** — drag-and-drop items into the right bins (Dry / Wet / Hazardous / E-Waste) in 60 seconds
- 🏆 **Global + local leaderboard** — full podium display (gold/silver/bronze) and ranked table with city-level filtering
- 🤝 **Community feed** — share task completions, badge unlocks, and game scores; like and comment on posts with eco hashtags
- 📰 **Articles & updates** — curated eco-news with category filtering and in-app reading
- 📝 **Text-based task proof submission** — write what you did, Gemini validates and gives feedback
- ⏰ **Firebase Cloud Function daily scheduler** — cron job at 00:00 IST generates fresh tasks and sends push notifications
- 🤖 **EcoBot chatbot** — Gemini-powered assistant that answers eco questions, gives task hints, explains quiz answers

---

## 🛠️ Tech Stack

| Layer | Technology | Why We Chose It | Free Tier |
|-------|-----------|-----------------|-----------|
| **Frontend** | React + Vite | Fast iteration, web-first for demo | ✅ Vercel — unlimited free deploys |
| **Backend** | FastAPI (Python) | Clean async Python, great for AI integrations | ✅ Render.com — 750 hrs/month free |
| **Database** | Firebase Firestore | Real-time sync, offline-first, no migrations | ✅ Spark plan — 1 GiB storage, 50k reads/day |
| **Auth** | Firebase Auth | Google Sign-In in 10 lines of code | ✅ Free always |
| **AI** | Gemini 1.5 Flash | 60 RPM free, 1M context, fast latency | ✅ Free tier in AI Studio |
| **Storage** | Firebase Storage | Same SDK as Firestore, simple upload | ✅ 5 GB free |
| **Scheduling** | Firebase Cloud Functions | Built-in cron triggers, no extra server | ✅ 2M invocations/month free |
| **Push Notifications** | Firebase Cloud Messaging | Cross-platform, same SDK | ✅ Free always |
| **CI/CD** | GitHub Actions | Auto-deploy on push to main | ✅ 2000 min/month free |

Everything runs on free tiers. No credit card needed to run this project.

---

## 📸 Screenshots

| Screen | Preview |
|--------|---------|
| **Dashboard** — 4 metric cards (Total XP, Current Streak, CO₂ Saved, Tasks Completed) with today's 3 task cards | ![EcoTatva Dashboard showing XP metrics, streak counter, and three personalized eco-task cards in card grid layout](docs/screenshots/dashboard.png) |
| **Tasks Page** — AI-personalized task cards with difficulty chips, XP rewards, and inline text proof submission | ![EcoTatva Tasks page showing three daily eco-tasks with Easy/Medium/Hard difficulty chips and Mark Complete buttons](docs/screenshots/tasks.png) |
| **Learn Page** — Featured lesson banner with category grid for Waste, Water, and Energy topics | ![EcoTatva Learn page with featured gradient lesson banner and three category cards below](docs/screenshots/learn.png) |
| **Leaderboard** — Podium display with gold/silver/bronze plus ranked table with Global/Local toggle | ![EcoTatva Leaderboard showing three-person podium with gold center position and ranked table below](docs/screenshots/leaderboard.png) |
| **Community Feed** — Social achievement feed with likes, comments, and eco hashtags | ![EcoTatva Community page showing feed posts with user avatars, achievement descriptions, heart counts, and hashtag chips](docs/screenshots/community.png) |
| **EcoBot** — Gemini-powered chatbot with quick-reply chips for eco Q&A | ![EcoTatva EcoBot chat interface with leaf avatar bot and quick-reply suggestion chips](docs/screenshots/ecobot.png) |

---

## 🔗 Live Demo

🌐 **Live App:** [https://ecotatva.vercel.app](https://ecotatva.vercel.app) *(replace with your URL)*

📹 **Demo Video:** [YouTube — 3-minute walkthrough](https://youtube.com/watch?v=YOUR_LINK) *(replace with your link)*

📊 **Presentation:** [GDG Submission PPT](https://drive.google.com/YOUR_PPT_LINK) *(replace with your link)*

---

## 🚀 Run Locally

You'll need Node.js 20+, Python 3.11+, and a Firebase project set up before starting.

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ecotatva.git
cd ecotatva
```

### 2. Set up Firebase

- Create a project at [console.firebase.google.com](https://console.firebase.google.com)
- Enable **Firestore**, **Authentication** (Google + Email), **Storage**, and **Cloud Functions**
- Download your service account JSON and save it to `backend/firebase-credentials.json`
- Copy your Firebase web config object

### 3. Configure environment variables

```bash
# Frontend
cp frontend/.env.example frontend/.env.local
# Fill in your Firebase config values

# Backend
cp backend/.env.example backend/.env
# Fill in GEMINI_API_KEY and path to firebase-credentials.json
```

**frontend/.env.local**
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

**backend/.env**
```
GEMINI_API_KEY=your_gemini_key_from_ai_studio
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
```

### 4. Start the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend will be live at `http://localhost:8000`. Check `/docs` for the interactive Swagger UI.

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be live at `http://localhost:5173`.

### 6. Deploy Firestore security rules

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

---

## 🌐 Deployment

| Component | Platform | How |
|-----------|----------|-----|
| React Frontend | Vercel | Connect GitHub repo → auto-deploys on push to `main` |
| FastAPI Backend | Render.com | Connect GitHub repo → auto-deploys on push to `main` |
| Cloud Functions | Firebase | `firebase deploy --only functions` |
| Firestore Rules | Firebase | `firebase deploy --only firestore:rules` |

CI/CD is handled by GitHub Actions — see `.github/workflows/deploy.yml`. Every push to `main` triggers a full deploy automatically.

---

## 📁 Project Structure

```
ecotatva/
├── frontend/               # React + Vite web app
│   └── src/
│       ├── components/     # Reusable UI (Sidebar, TopHeader, TaskCard, etc.)
│       ├── pages/          # 15 screen components
│       ├── api/            # Axios wrappers for all backend calls
│       ├── context/        # AuthContext + UserContext
│       └── utils/          # Impact calculations, rank logic
├── backend/                # FastAPI Python server
│   ├── routers/            # One file per feature group
│   ├── services/           # Business logic (reward engine, Gemini service, etc.)
│   ├── models/             # Pydantic request/response models
│   ├── scheduler/          # Firebase Cloud Function daily task generator
│   └── utils/              # Firestore client, constants
├── functions/              # Firebase Cloud Functions (Node.js wrapper)
├── firestore.rules         # Firestore security rules
└── .github/workflows/      # GitHub Actions CI/CD
```

---

## 📅 Built in 10 Days

A 4-member team shipped 15 screens, 3 Gemini AI integrations, a real-time leaderboard, a social community feed, and a mini game in 10 days flat.

| Day | What We Built |
|-----|---------------|
| 1 | Project setup, Firebase config, Sidebar + TopHeader layout shell |
| 2 | Auth flow, user profiles, Dashboard with metric cards |
| 3 | Daily task system, Gemini task generation, proof submission |
| 4 | Full reward engine — XP, streaks, badges, ranks, Badges page |
| 5 | Education module — lesson cards, Gemini quizzes, result screen |
| 6 | Smart Waste Sorting game + Community feed with posts and likes |
| 7 | Leaderboard (podium + table), Events page, Articles page |
| 8 | EcoBot chatbot, Profile page, Settings page, daily scheduler |
| 9 | End-to-end QA, polish, demo video recording |
| 10 | Final submission — README, PPT, GitHub cleanup |

---

## 👥 Team

| Name | Role |
|------|------|
| **Dev A** | Frontend Lead — React screens, Sidebar navigation, mini game |
| **Dev B** | Backend Lead — FastAPI endpoints, reward engine, Gemini integration |
| **Dev C** | Firebase + AI — Firestore schema, Cloud Functions, Gemini prompts |
| **Dev D** | Design + Demo — UI/UX in Figma, PPT, demo video |

---

## 🏆 The 30-Second Pitch

> *"Every year, 8 million tons of plastic enter our oceans — yet most students learn about it in a textbook and forget by tomorrow. EcoTatva changes that. It's a gamified web app where students complete real-world eco-tasks daily, earn XP and badges, compete on global and local leaderboards, share achievements in a community feed, and watch their actual environmental impact grow. Powered by Google's Gemini AI, every task is personalized and every lesson is interactive. We're not teaching sustainability — we're building the habit."*

---

## 🔮 What's Next

The architecture is already built to support everything below — it's just a matter of adding new routes and screens:

- Photo proof upload + Gemini Vision validation
- Full impact dashboard (CO₂ saved, water conserved, trees equivalent)
- Eco-events tab with location-based filtering
- GPS mobility tracking for walking-based tasks
- Teacher dashboard and classroom leaderboards
- Flutter mobile app (iOS + Android)
- NGO partnerships for real-world rewards
- Digital eco-certificates (PDF download)
- Monthly community challenges
- 6 additional education topics

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with 💚 for the **GDG Solution Challenge 2026**

*EcoTatva — Sanskrit for "eco essence" — because sustainability isn't a trend, it's a way of being.*

</div>
