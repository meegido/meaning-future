import { render, screen } from '@testing-library/react';
import { Home } from './home/page';
import { describe, expect, test } from 'vitest';
import { Feed } from './home/containers/feed';
import { Header } from './shared/components/header';

describe('When the page loads', () => {
  test('renders the Home component', () => {
    render(<Home />);

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
