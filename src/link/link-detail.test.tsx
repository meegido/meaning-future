import { render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { getDocument } from '../shared/infrastructure/firestore-client';
import { LinkDetail } from './link-detail';
import { useParams } from 'react-router-dom';
import { LinkInfo } from '../types';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual, // Include other exports from react-router-dom
    useParams: vi.fn(),
  };
});

vi.mock('../shared/infrastructure/firestore-client.tsx', () => ({
  getDocument: vi.fn(),
}));

describe('Individual link page', () => {
  const mockResponse: LinkInfo = {
    title:
      'Tove Blomgren on LinkedIn: There is a new loud climate denier in town, and she goes by the innocent… | 60 comments',
    userName: 'laponyo',
    text: 'There is a new loud climate denier in town, and she goes by the innocent name of ”optimism”. \n\nI&amp;#39;m not talking about the optimism of activism and agency… | 60 comments on LinkedIn',
    url: 'https://www.linkedin.com/posts/tove-blomgren-670a703_there-is-a-new-loud-climate-denier-in-town-ugcPost-7254364324859699201-smJb/?utm_source=share&utm_medium=member_ios',
    perplexitySummary:
      'The LinkedIn post by Tove Blomgren, titled "There is a new loud climate denier in town," discusses a critical perspective on the current approach to climate change. Here are the key points:\n\n- Blomgren argues that a new form of climate denial is emerging, which she terms "optimism." However, this is not the optimism associated with activism or positive change.\n- She suggests that this form of optimism is misleading because it downplays the severity of the climate crisis and the lack of significant progress in addressing it.\n- Blomgren critiques the idea that things are improving or that we are on the right path to mitigating climate change, emphasizing instead that the current efforts are insufficient and that there is no credible pathway to limit global warming to 1.5°C, as highlighted by recent UN reports.\n\nOverall, the post is a call to action, urging people to face the harsh reality of the climate situation rather than being complacent with overly optimistic narratives.',
    service: 'linkedin.com',
    serviceIcon: 'https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQEPRc5vUY6C3g/feedshare-shrink_800/feedshare-shrink_800/0/1729575231403?e=2147483647&v=beta&t=4tyIHI629zT1fgRkfLFdm0HvZt55ZlHeHQwVAaARIgY',
    id: '3l6sb85ZaUC5IPpMDDgz',
  };

  beforeEach(async () => {
    (useParams as Mock).mockReturnValue({ id: '123' });
    (getDocument as Mock).mockResolvedValue(mockResponse);

    await act(async () => {
      render(<LinkDetail />);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders link title', () => {
    const linkTitle = screen.queryByRole('heading', {
      level: 1,
    });

    expect(getDocument).toHaveBeenCalledWith('123');
    expect(linkTitle).toBeInTheDocument();
  });
});
