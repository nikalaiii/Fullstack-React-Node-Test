import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box, CircularProgress } from "@mui/material";
import { Task, User } from "./types";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  register,
  login,
  logout,
  getMe,
} from "./api";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { AuthForm } from "./components/AuthForm";
import { Navbar } from "./components/Navbar";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (e) {
      setError("Failed to fetch tasks");
    }
  };

  const fetchMe = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    console.log(`USER STATE: ${JSON.stringify(user)}`);
  }, [user]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const handleAdd = async (data: Omit<Task, "id">) => {
    try {
      await createTask(data);
      fetchTasks();
      setEditing(null);
      setError("");
    } catch {
      setError("Failed to add task");
    }
  };

  const handleEdit = (task: Task) => {
    setEditing(task);
    console.log("EDITING ACTIVE", task);
  };

  const handleUpdate = async (data: Omit<Task, "id">) => {
    if (!editing) return;
    try {
      await updateTask(editing.id, data);
      fetchTasks();
      setEditing(null);
      setError("");
    } catch {
      setError("Failed to update task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const handleRegister = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      console.log(`REGISTER DATA: ${JSON.stringify(data)}`);
      await register(data);
      handleLogin(data);
    } catch {
      setError("Registration failed");
    }
  };

  const handleLogin = async (data: any) => {
    try {
      await login(data);
      await fetchMe(); // Чекаємо оновлення user
      setError("");
    } catch {
      setError("Login failed");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setTasks([]);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Navbar isAuthenticated={!!user} onLogout={handleLogout} />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <TaskList
                    tasks={tasks}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  <Box sx={{ mt: 4 }}>
                    <TaskForm
                      onSubmit={editing ? handleUpdate : handleAdd}
                      error={error}
                      initial={
                        editing
                          ? {
                              title: editing.title,
                              description: editing.description,
                              status: editing.status,
                            }
                          : null
                      }
                    />
                  </Box>
                </>
              ) : (
                <AuthForm onSubmit={handleLogin} error={error} type="login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              <AuthForm onSubmit={handleLogin} error={error} type="login" />
            }
          />
          <Route
            path="/register"
            element={
              <AuthForm
                onSubmit={handleRegister}
                error={error}
                type="register"
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
