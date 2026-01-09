import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 100 } }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 100 });
    
    // Value should still be initial before delay
    expect(result.current).toBe('initial');

    // Wait for debounce with sufficient timeout
    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 500 });
  });

  it('should cancel previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'first' });
    rerender({ value: 'second' });
    rerender({ value: 'final' });

    await waitFor(() => {
      expect(result.current).toBe('final');
    }, { timeout: 200 });
  });
});