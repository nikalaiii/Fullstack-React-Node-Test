import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout, onNavigate }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => onNavigate('/')}>Task Manager</Typography>
      {isAuthenticated ? (
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      ) : (
        <Box>
          <Button color="inherit" onClick={() => onNavigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => onNavigate('/register')}>Register</Button>
        </Box>
      )}
    </Toolbar>
  </AppBar>
); 