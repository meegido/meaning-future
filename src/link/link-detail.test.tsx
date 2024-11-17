import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LinkDetail } from './link-detail';
import { useParams } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual, // Include other exports from react-router-dom
    useParams: vi.fn(),
  };
});

describe('Individual link page', () => {
  it('renders link props', () => {
    useParams.mockReturnValue({ id: '123' });
    const page = render(<LinkDetail />);

    expect(page.getByText('123')).toBeInTheDocument();
  });
});
