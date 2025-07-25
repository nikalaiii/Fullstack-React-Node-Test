import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from '../TaskForm';

describe('TaskForm', () => {
  it('renders and validates form', () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Task', description: 'Desc', status: 'PENDING' });
  });
}); 