import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './shared/components/header';
import { MemoryRouter } from 'react-router-dom';
import { HomeFeed } from './home-feed/home-feed';

describe('When the page loads', () => {
  it('renders the Home Feed component', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeFeed />
        </MemoryRouter>
      );
    });

    const [titles] = await screen.findAllByRole('heading', { level: 2 });
    expect(titles).toBeInTheDocument();
  });

  it('renders the header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', {
      name: /Meaning future/i,
    });
    expect(heading).toHaveTextContent(/Meaning future/);

    const menuNavigation = screen.getByRole('navigation');
    expect(menuNavigation).toBeInTheDocument();

    screen.debug();
  });

  it('navigates when the user clicks on About page', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const aboutElement = screen.getByText(/About/i);

    fireEvent.click(aboutElement);
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
