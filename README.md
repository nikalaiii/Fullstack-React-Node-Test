# Fullstack Task Manager – React, Node.js, Express, Prisma, PostgreSQL

Welcome to the **Fullstack Task Manager**! This project is a modern, full-featured task management app built with React (frontend), Node.js/Express (backend), Prisma ORM, and PostgreSQL. It is fully Dockerized and ready for local or cloud deployment.

---

## ✨ Features
- User registration, login, and logout (JWT authentication)
- Personal task management: list, add, edit, delete tasks
- Form validation and user feedback
- Responsive, modern UI (Material UI)
- Secure REST API (auth required for all task operations)
- PostgreSQL database (via Prisma ORM)
- Full Docker Compose support
- Comprehensive tests (backend and frontend)

---

## 🏗️ Architecture
```
[ React + Vite + Material UI ]  <––>  [ Express + Prisma + PostgreSQL ]
         (client/)                        (server/)
```
- **Frontend:** React, Vite, Material UI
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL (Dockerized)

---

## 🚀 Quick Start (Docker Compose)

### 1. Clone the repository
```sh
git clone https://github.com/your-username/Fullstack-React-Node-Test.git
cd Fullstack-React-Node-Test
```

### 2. Configure environment variables
- Copy `.env.example` to `.env` in both `client/` and `server/` and adjust as needed.

### 3. Start the full stack
```sh
docker-compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)
- Database: PostgreSQL on port 5432

---

## 🛠️ Manual Setup (Local Dev)

### Backend
```sh
cd server
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run dev
```

### Frontend
```sh
cd client
npm install
cp .env.example .env
npm run dev
```

---

## ⚙️ Environment Variables
| Location   | Variable         | Description                        |
|------------|------------------|------------------------------------|
| server     | DATABASE_URL     | PostgreSQL connection string       |
| server     | JWT_SECRET       | Secret for JWT signing             |
| server     | PORT             | Backend port (default: 4000)       |
| client     | VITE_API_URL     | Backend API URL                    |

---

## 📦 Available Scripts
- **Frontend** (`client/`):
  - `npm run dev` – Start dev server
  - `npm run build` – Build for production
  - `npm run preview` – Preview production build
  - `npm test` – Run frontend tests
- **Backend** (`server/`):
  - `npm run dev` – Start backend with nodemon
  - `npm start` – Start backend
  - `npm test` – Run backend tests
  - `npx prisma migrate dev` – Run DB migrations
  - `npx prisma studio` – Open Prisma Studio

---

## 🖥️ Functionality Overview

### Authentication
- Register, login, and logout (JWT in HTTP-only cookies)
- Auth required for all task operations

### Tasks
- List, add, edit, and delete your personal tasks
- Each task: `id`, `title`, `description`, `status` (PENDING, IN_PROGRESS, COMPLETED)

### UI
- Responsive, modern design (Material UI)
- Clear validation and error feedback

---

## 🔗 API Endpoints
- `POST /auth/register` — Register `{ username, password }`
- `POST /auth/login` — Login `{ username, password }`
- `POST /auth/logout` — Logout
- `GET /auth/me` — Get current user
- `GET /tasks` — List tasks
- `GET /tasks/:id` — Get a task
- `POST /tasks` — Create a task
- `PUT /tasks/:id` — Update a task
- `DELETE /tasks/:id` — Delete a task

---

## 🧪 Testing
- **Backend:** `cd server && npm test` (Jest + Supertest)
- **Frontend:** `cd client && npm test` (Jest + React Testing Library)

---

## 🗂️ Project Structure
- `client/` – React frontend
- `server/` – Express backend
- `docker-compose.yml` – Full stack orchestration
- `README.md` – Main project guide

---

## 🤝 Contributing & Branching
- Use feature/task branches (e.g., `tasks/task-1`) and merge to `main` after completion.
- Do **not** delete original branches after merging.

---

## 📣 Final Notes
- All requirements are met: clear structure, full CRUD, authentication, Docker, environment, and tests.
- For any issues, see the READMEs in `client/` and `server/` or open an issue.

Enjoy your new fullstack task manager! 🚀 