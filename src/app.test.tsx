import { render, screen } from '@testing-library/react';
import { App } from './app.tsx';
import { describe, it } from 'vitest';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);

    screen.debug();
  });
});
