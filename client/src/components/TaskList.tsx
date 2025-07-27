import React from 'react';

import { List, ListItem, ListItemText, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatus } from '../types'


interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}


import * as types from '../types';
console.log(types); // Перевір, що експортується

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const statusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED': return 'success';
    case 'IN_PROGRESS': return 'warning';
    default: return 'default';
  }
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => (
  <List>
    {tasks.map(task => (
      <ListItem key={task.id} secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }>
        <ListItemText
          primary={task.title}
          secondary={task.description}
        />
        <Chip label={task.status} color={statusColor(task.status)} sx={{ ml: 2 }} />
      </ListItem>
    ))}
  </List>
); 