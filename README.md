# CineVerse - Intelligent Arthouse Film Companion 🎬

**A Thoughtful Cinema Journal & Curated Discovery Platform**

CineVerse is a full-stack film journaling application designed for intentional movie discovery.
Instead of opaque recommendation algorithms, it surfaces curated suggestions based on your own cinematic taste — directors and genres you’ve already engaged with.

The goal is clarity, simplicity, and authorship-driven discovery.

---

## Core Features

### Film Discovery

* Browse films by:

  * Title
  * Director
  * Genre
  * Language
  * Mood
* Clean grid-based browsing interface
* Public access to film catalogue

### Personal Journal

* Write private or public entries for films
* Add:

  * Rating
  * Notes
  * Watched date
  * Mood
* Edit & manage entries

### User Profiles

* Secure authentication (JWT-based)
* Profile metadata:

  * Display name
  * Email
  * Account creation date
* Protected routes

### Curated Picks

CineVerse uses deterministic relational logic:

* Extracts genres and directors from films you've journaled
* Finds other films matching those attributes
* Excludes already reviewed films
* Randomizes results for variety
* Returns a rotating top selection

---

## Architecture

### Frontend

* React (Vite)
* React Router
* Modular component structure
* Custom CSS design system (`theme.css`)
* JWT stored in localStorage

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL (or compatible DB)
* JWT authentication middleware

### Database Models (Core)

* `User`
* `Film`
* `JournalEntry`
* `Visibility` (enum)
* `JournalMood` (enum)

Relational structure:

```
User → JournalEntry → Film
```

---

## Authentication Flow

* Login returns JWT
* Token stored in localStorage
* Protected routes require `Authorization: Bearer <token>`
* Middleware attaches `req.user`

Protected endpoints:

* `/profile`
* `/journals`
* `/curated`

Public endpoints:

* `/films`
* `/auth`
* `/health`

---

## Running the Project

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=4000
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Ensure your frontend `API_URL` points to:

```
http://localhost:4000
```

---

## Design Philosophy

CineVerse is built around:

* Minimalism
* Editorial tone
* Human curation
* No algorithmic opacity
* Film culture over content consumption

It avoids:

* Engagement-maximizing AI
* Recommendation black boxes
* Behavioral exploitation

Instead, it encourages intentional viewing and reflection.

---

## Project Structure

```
cineverse/
│
├── backend/
│   ├── routes/
│   ├── prisma/
│   ├── auth.js
│   ├── db.js
│   └── index.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── theme.css
│
└── README.md
```

---

## Future Improvements (Planned)

* Pagination for film lists
* Director-based deep dive pages
* Public journal feed
* Festival / movement filters
* Admin film management panel
* Cloud deployment (Render / Railway / Vercel)

---

## Status

CineVerse is feature-complete as a personal film journaling and curated discovery system.

It prioritizes stability, clarity, and maintainability over complexity.

---
