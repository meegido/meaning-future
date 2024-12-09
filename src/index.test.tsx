import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Header } from './shared/components/header';
import { MemoryRouter } from 'react-router-dom';
import { HomeFeed } from './home-feed/home-feed';

describe('When the page loads', () => {
  test('renders the Home component', () => {
    render(<HomeFeed />);

    screen.debug();
  });

  test('renders the header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', {
      name: /Meaning future/i,
    });

    expect(heading).toHaveTextContent(/Meaning future/);

    screen.debug();
  });
});
