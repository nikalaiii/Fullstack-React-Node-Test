import React, { useState } from 'react';
import { Button, TextField, Box, Alert } from '@mui/material';

interface AuthFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  error?: string;
  type: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, error, type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!username.trim() || !password.trim()) return;
    onSubmit({ username, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        error={touched && !username.trim()}
        helperText={touched && !username.trim() ? 'Username is required' : ''}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={touched && !password.trim()}
        helperText={touched && !password.trim() ? 'Password is required' : ''}
        required
      />
      <Button type="submit" variant="contained">{type === 'login' ? 'Login' : 'Register'}</Button>
    </Box>
  );
}; 