const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let server;
let app;
let prisma;

beforeAll(async () => {
  process.env.JWT_SECRET = 'testsecret';
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/tasksdb_test';
  app = require('../index');
  prisma = new PrismaClient();
  // Clean up test db
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth & Task API', () => {
  let agent = request.agent('http://localhost:4000');
  let token;
  let userId;
  let taskId;

  it('should register a user', async () => {
    const res = await agent.post('/auth/register').send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('testuser');
    userId = res.body.id;
  });

  it('should login and set cookie', async () => {
    const res = await agent.post('/auth/login').send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('testuser');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should get current user', async () => {
    const res = await agent.get('/auth/me');
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('testuser');
  });

  it('should not access tasks when not logged in', async () => {
    const unauth = request('http://localhost:4000');
    const res = await unauth.get('/tasks');
    expect(res.statusCode).toBe(401);
  });

  it('should create a task', async () => {
    const res = await agent.post('/tasks').send({ title: 'Test Task', description: 'Test Desc', status: 'PENDING' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    taskId = res.body.id;
  });

  it('should get tasks for user', async () => {
    const res = await agent.get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe('Test Task');
  });

  it('should update a task', async () => {
    const res = await agent.put(`/tasks/${taskId}`).send({ title: 'Updated', description: 'Updated', status: 'COMPLETED' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.status).toBe('COMPLETED');
  });

  it('should delete a task', async () => {
    const res = await agent.delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(204);
  });

  it('should logout', async () => {
    const res = await agent.post('/auth/logout');
    expect(res.statusCode).toBe(200);
  });

  it('should not access tasks after logout', async () => {
    const res = await agent.get('/tasks');
    expect(res.statusCode).toBe(401);
  });
}); 