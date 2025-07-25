# Frontend – Task Manager App (React + Vite + Material UI)

Welcome to the **Task Manager Frontend**! This is the user interface for the Fullstack-React-Node-Test project, built with React, Vite, and Material UI.

---

## ✨ Features
- User registration, login, and logout
- List, add, edit, and delete your tasks
- Form validation with clear user feedback
- Responsive and modern UI (Material UI)
- Connects seamlessly to the backend API

---

## 🚀 Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Configure environment variables
- Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL (default: `http://localhost:4000`).

### 3. Run the app
```sh
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## ⚙️ Environment Variables
| Variable         | Description                        |
|------------------|------------------------------------|
| VITE_API_URL     | URL of the backend API             |

---

## 📦 Available Scripts
- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build
- `npm test` – Run frontend tests (Jest + React Testing Library)

---

## 🔗 Backend Connection
- All API requests are proxied to the backend defined in `VITE_API_URL`.
- Requires the backend server to be running for full functionality.

---

## 🧪 Testing
- Run `npm test` to execute all component tests.

---

## 📁 Project Structure
- `src/components/` – UI components (AuthForm, TaskForm, TaskList, Navbar)
- `src/api.ts` – API client for backend communication
- `src/types.ts` – TypeScript types

---

For more details, see the main project README.
