import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Header } from './shared/components/header';
import { Feed } from './feed/feed';

describe('When the page loads', () => {
  test('renders the Home component', () => {
    render(<Feed />);

    screen.debug();
  });

  test('renders the header', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', {
      name: /Meaning future/i,
    });

    expect(heading).toHaveTextContent(/Meaning future/);

    screen.debug();
  });
});
