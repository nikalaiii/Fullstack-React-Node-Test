import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types';
import { Button, TextField, MenuItem, Box, Alert } from '@mui/material';

const statusOptions: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

interface TaskFormProps {
  initial?: Partial<Task>;
  onSubmit: (data: Omit<Task, 'id'>) => void;
  error?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initial = {}, onSubmit, error }) => {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [status, setStatus] = useState<TaskStatus>(initial.status || 'PENDING');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTitle(initial.title || '');
    setDescription(initial.description || '');
    setStatus(initial.status || 'PENDING');
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!title.trim() || !description.trim()) return;
    onSubmit({ title, description, status });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        error={touched && !title.trim()}
        helperText={touched && !title.trim() ? 'Title is required' : ''}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        error={touched && !description.trim()}
        helperText={touched && !description.trim() ? 'Description is required' : ''}
        required
      />
      <TextField
        select
        label="Status"
        value={status}
        onChange={e => setStatus(e.target.value as TaskStatus)}
      >
        {statusOptions.map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained">Save</Button>
    </Box>
  );
}; 