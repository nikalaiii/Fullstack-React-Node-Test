import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from '../AuthForm';

describe('AuthForm', () => {
  it('renders and validates login form', () => {
    const onSubmit = jest.fn();
    render(<AuthForm onSubmit={onSubmit} type="login" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(onSubmit).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
  });
}); 