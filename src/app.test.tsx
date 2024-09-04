import { render, screen } from '@testing-library/react';
import { App } from './app.tsx';
import { beforeEach, describe, expect, test, vi } from 'vitest';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('./home/containers/feed', async (importActual) => {
  const mod = await importActual<T>();

  return {
    ...mod,
    Feed: () => (
      <section>
        <article>
          <div className="_article__wrapper_5wf1d_1">
            <div className="_title__wrapper_5wf1d_24">
              <img
                className="_social__icon_5wf1d_19"
                src="https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
                alt="service icon"
              />
              <a href="https://www.linkedin.com/pulse/musk-symptom-big-tech-crisis-sherif-elsayed-ali-wppge/?trackingId=ijfwsMuGR4os02PeugdTOw%3D%3D">
                Musk is the symptom, Big Tech is the crisis
              </a>
            </div>
            <div>
              <p>
                By Tanya O'Carroll and Sherif Elsayed-Ali “Civil war is inevitable”. That was Elon
                Musk’s immediate view on the violent and criminal riots that rocked the UK this
                August.
              </p>
            </div>
          </div>
        </article>
        <article>
          <div className="_article__wrapper_5wf1d_1">
            <div className="_title__wrapper_5wf1d_24">
              <img
                className="_social__icon_5wf1d_19"
                src="https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
                alt="service icon"
              />
              <a href="https://www.nytimes.com/2024/07/25/style/tiktok-underconsumption-influencers.html?unlocked_article_code=1._k0.ydM0.P7sg12L-xzu3ssmid=url-share">
                Tired of Influencers, TikTok Users Try ‘Underconsumption Core’ to Cut Costs
              </a>
            </div>
            <div>
              <p>
                The trend of “underconsumption core” romanticizes buying and using only what you
                need. Yes, being normal is now trending. Experts say it’s a response to a period of
                economic hardship.
              </p>
            </div>
          </div>
        </article>
      </section>
    ),
  };
});

describe('When the page loads', () => {
  test('renders the App component', () => {
    render(<App />);

    screen.debug();
  });

  test('renders the header', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /Meaning future/i,
    });

    expect(heading).toHaveTextContent(/Meaning future/);

    screen.debug();
  });

  test('renders the list of links from the Feed component', () => {
    render(<App />);

    const firstLink = screen.getByRole('link', {
      name: 'Musk is the symptom, Big Tech is the crisis',
    });

    const secondLink = screen.getByRole('link', {
      name: 'Tired of Influencers, TikTok Users Try ‘Underconsumption Core’ to Cut Costs',
    });

    expect(firstLink).toHaveProperty(
      'href',
      'https://www.linkedin.com/pulse/musk-symptom-big-tech-crisis-sherif-elsayed-ali-wppge/?trackingId=ijfwsMuGR4os02PeugdTOw%3D%3D'
    );

    expect(secondLink).toHaveProperty(
      'href',
      'https://www.nytimes.com/2024/07/25/style/tiktok-underconsumption-influencers.html?unlocked_article_code=1._k0.ydM0.P7sg12L-xzu3ssmid=url-share'
    );
  });
});
