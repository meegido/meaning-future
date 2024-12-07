import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { Feed } from './feed';
import { getDocuments } from '../shared/infrastructure/firestore-client.tsx';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

vi.mock('../shared/infrastructure/firestore-client', () => ({
  getDocuments: vi.fn(),
}));
let history: ReturnType<typeof createMemoryHistory>;
// function mockResolvedValue(value: Awaited<ReturnType<T>>): MockInstance<T>

describe('Links feed', () => {
  const mockResponse = [
    {
      id: '1',
      serviceIcon: 'icon1.png',
      url: 'http://example.com/1',
      title: 'Example 1',
      text: 'Description 1',
      imageUrl: 'image1.png',
    },
    {
      id: '2',
      serviceIcon: 'icon2.png',
      url: 'http://example.com/2',
      title: 'Example 2',
      text: 'Description 2',
      imageUrl: 'image2.png',
    },
  ];
  beforeEach(async () => {
    (getDocuments as Mock).mockResolvedValue(mockResponse);
    history = createMemoryHistory();
    history.push = vi.fn();
    await act(async () => {
      render(
        <MemoryRouter>
          <Feed />
        </MemoryRouter>
      );
    });
  });

  it('display all users links', async () => {
    const links = await screen.findAllByText(/View link/i);

    expect(links).toHaveLength(2);
  });

  it.skip('user goes to individual link page when click on view button', async () => {
    const [viewButton] = await screen.findAllByText(/View link/i);
    await act(async () => {
      fireEvent.click(viewButton);
    });

    expect(history.push).toHaveBeenCalledWith('/link/1');
  });
});
