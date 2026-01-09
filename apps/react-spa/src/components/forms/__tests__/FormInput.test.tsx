import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/utils';
import userEvent from '@testing-library/user-event';
import { FormInput } from '../FormInput';

describe('FormInput', () => {
  it('should render input with label', () => {
    render(
      <FormInput
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Email')).toBeTruthy();
  });

  it('should display error message', () => {
    render(
      <FormInput
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
        error={{ type: 'required', message: 'Email is required' }}
      />
    );

    expect(screen.getByText('Email is required')).toBeTruthy();
  });

  it('should call onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FormInput
        label="Email"
        name="email"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Email');
    await user.type(input, 'test@example.com');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <FormInput
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
        disabled
      />
    );

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should render required indicator', () => {
    render(
      <FormInput
        label="Email"
        name="email"
        value=""
        onChange={vi.fn()}
        required
      />
    );

    expect(screen.getByText('*')).toBeTruthy();
  });
});