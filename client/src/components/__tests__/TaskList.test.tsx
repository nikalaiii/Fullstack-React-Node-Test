import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from '../TaskList';
import { Task } from '../../types';

describe('TaskList', () => {
  const tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Desc 1', status: 'PENDING', userId: 1 },
    { id: 2, title: 'Task 2', description: 'Desc 2', status: 'COMPLETED', userId: 1 },
  ];

  it('renders tasks and handles edit/delete', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    fireEvent.click(screen.getAllByLabelText(/edit/i)[0]);
    expect(onEdit).toHaveBeenCalledWith(tasks[0]);
    fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);
    expect(onDelete).toHaveBeenCalledWith(tasks[0].id);
  });
}); 