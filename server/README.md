# Backend – Task Manager API (Node.js + Express + Prisma)

Welcome to the **Task Manager Backend**! This is the RESTful API for the Fullstack-React-Node-Test project, built with Node.js, Express, and Prisma ORM.

---

## ✨ Features
- User registration, login, and logout (JWT authentication)
- CRUD API for personal tasks (id, title, description, status)
- PostgreSQL database (via Prisma ORM)
- Secure endpoints (auth required for all task operations)
- Environment variable support
- Ready for Docker deployment

---

## 🚀 Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Configure environment variables
- Copy `.env.example` to `.env` and set your values (see table below).

### 3. Run database migrations
```sh
npx prisma migrate dev --name init
```

### 4. Start the server
```sh
npm run dev
```
- The API will be available at [http://localhost:4000](http://localhost:4000)

---

## ⚙️ Environment Variables
| Variable       | Description                                 |
|----------------|---------------------------------------------|
| DATABASE_URL   | PostgreSQL connection string                |
| JWT_SECRET     | Secret for JWT signing                      |
| PORT           | Port for the Express server (default: 4000) |

---

## 📦 Available Scripts
- `npm run dev` – Start the server with nodemon
- `npm start` – Start the server
- `npm test` – Run backend tests (Jest + Supertest)
- `npx prisma migrate dev` – Run database migrations
- `npx prisma studio` – Open Prisma Studio (DB GUI)

---

## 🔗 Frontend Connection
- The frontend connects to this API via the URL set in its `VITE_API_URL` variable.
- All endpoints are CORS-enabled for local development.

---

## 🛠️ API Overview

### Authentication
- `POST /auth/register` — Register a new user `{ username, password }`
- `POST /auth/login` — Login user `{ username, password }` (sets HTTP-only cookie)
- `POST /auth/logout` — Logout user (clears cookie)
- `GET /auth/me` — Get current authenticated user (requires cookie)

### Tasks (all endpoints require authentication)
- `GET /tasks` — List all tasks for the authenticated user
- `GET /tasks/:id` — Get a single task (must belong to user)
- `POST /tasks` — Create a task `{ title, description, status? }`
- `PUT /tasks/:id` — Update a task `{ title, description, status }`
- `DELETE /tasks/:id` — Delete a task

---

## 🧪 Testing
- Run `npm test` to execute all backend API tests.

---

## 🗂️ Project Structure
- `index.js` – Main Express server
- `prisma/schema.prisma` – Database schema
- `test/` – API tests (Jest + Supertest)

---

For more details, see the main project README. 