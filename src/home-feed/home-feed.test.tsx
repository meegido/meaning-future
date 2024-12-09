import { act, render, screen } from '@testing-library/react';
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
      perplexitySummary: 'perplexity summary',
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
      perplexitySummary: 'perplexity summary 2',
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
  it('display all users links', async () => {
    const links = await screen.findAllByText(/Read more/i);

    expect(links).toHaveLength(2);
  });
});
