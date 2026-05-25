import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchBox } from './search-box';

describe('SearchBox', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls onQueryChange with the typed value after the debounce delay', () => {
    const onQueryChange = vi.fn();

    render(<SearchBox onQueryChange={onQueryChange} debounceMs={250} />);

    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });
    act(() => {
      fireEvent.change(input, { target: { value: 'react' } });
    });

    expect(onQueryChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(onQueryChange).toHaveBeenCalledTimes(1);
    expect(onQueryChange).toHaveBeenLastCalledWith('react');
  });

  it('debounces rapid typing and emits only the final value', () => {
    const onQueryChange = vi.fn();

    render(<SearchBox onQueryChange={onQueryChange} debounceMs={250} />);

    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });

    onQueryChange.mockClear();

    act(() => {
      fireEvent.change(input, { target: { value: 'rea' } });
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      fireEvent.change(input, { target: { value: 'react' } });
    });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    const callsWithRealValues = onQueryChange.mock.calls.filter(([arg]) => arg !== '');
    expect(callsWithRealValues).toHaveLength(1);
    expect(callsWithRealValues[0]).toEqual(['react']);
  });
});
