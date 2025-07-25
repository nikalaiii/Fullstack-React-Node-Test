const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/', (req, res) => {
  res.send('API is running');
});

// Register
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { username, password: hashed } });
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ id: user.id, username: user.username });
});

// Logout
app.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Get current user
app.get('/auth/me', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, username: true } });
  res.json(user);
});

// Protect all /tasks endpoints
app.use('/tasks', authMiddleware);

// Task CRUD endpoints (user-specific)
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(req.params.id) } });
    if (!task || task.userId !== req.user.id) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  try {
    const task = await prisma.task.create({
      data: { title, description, status, userId: req.user.id },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    // Only update if the task belongs to the user
    const task = await prisma.task.findUnique({ where: { id: Number(req.params.id) } });
    if (!task || task.userId !== req.user.id) return res.status(404).json({ error: 'Task not found' });
    const updated = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: { title, description, status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(req.params.id) } });
    if (!task || task.userId !== req.user.id) return res.status(404).json({ error: 'Task not found' });
    await prisma.task.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 