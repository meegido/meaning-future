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
});
