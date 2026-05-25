import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { MemoryRouter } from 'react-router-dom';
import { HomeFeed } from './home-feed';

vi.mock('../shared/infrastructure/firestore-client.tsx', () => ({
  getDocuments: vi.fn(),
}));

describe('Home feed', () => {
  const mockResponse = [
    {
      id: '1',
      serviceIcon: 'icon1.png',
      url: 'http://example.com/1',
      title: 'Example 1',
      text: 'Description 1',
      imageUrl: 'image1.png',
      userName: 'laponyo',
      perplexitySummary: 'A summary about React hooks',
      service: 'Linkedin',
    },
    {
      id: '2',
      serviceIcon: 'icon2.png',
      url: 'http://example.com/2',
      title: 'Example 2',
      text: 'Description 2',
      imageUrl: 'image2.png',
      userName: 'laponyo',
      perplexitySummary: 'A summary about TypeScript generics',
      service: 'Youtube',
    },
  ];

  beforeEach(async () => {
    (getDocuments as Mock).mockResolvedValue(mockResponse);
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeFeed />
        </MemoryRouter>
      );
    });
  });

  it('displays all user links when no query is entered', async () => {
    const readMoreLink = await screen.findAllByText(/Read more/i);
    expect(readMoreLink).toHaveLength(2);
  });

  it('filters links by perplexitySummary when the user types', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });

    await user.type(input, 'react');

    await waitFor(() => {
      expect(screen.getAllByText(/Read more/i)).toHaveLength(1);
      expect(screen.getByRole('heading', { level: 2, name: 'Example 1' })).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { level: 2, name: 'Example 2' })
      ).not.toBeInTheDocument();
    });
  });

  it('shows a "no results" message when the query matches no link', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });

    await user.type(input, 'zzz-no-match');

    expect(await screen.findByText('No se han encontrado enlaces')).toBeInTheDocument();
    expect(screen.queryByText(/Read more/i)).not.toBeInTheDocument();
  });
});
