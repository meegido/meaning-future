import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Feed } from './feed';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

let history: ReturnType<typeof createMemoryHistory>;

describe('Links feed', () => {
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
    history = createMemoryHistory();
    history.push = vi.fn();
    await act(async () => {
      render(
        <MemoryRouter>
          <Feed links={mockResponse} />
        </MemoryRouter>
      );
    });
  });

  it('shows the links title', async () => {
    const [title] = await screen.findAllByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('shows the link image', async () => {
    const images = await screen.findAllByRole('img', { name: 'link image' });
    expect(images.length).toBeGreaterThan(1);

    images.forEach((attribute: HTMLElement, index: number) => {
      expect(attribute).toHaveAttribute('src', mockResponse[index].imageUrl);
    });
  });

  it('shows the source image', async () => {
    const images = await screen.findAllByRole('img', { name: 'service icon' });
    expect(images.length).toBeGreaterThan(1);

    images.forEach((attribute: HTMLElement, index: number) => {
      expect(attribute).toHaveAttribute('src', mockResponse[index].serviceIcon);
    });
  });

  it('user goes to individual link page when click on view button', async () => {
    const [viewButton] = await screen.findAllByText(/Read more/i);

    fireEvent.click(viewButton);

    waitFor(() => {
      expect(history.push).toHaveBeenCalledWith('link/1');
    });
  });
});
