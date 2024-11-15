import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { LinkDetail } from './link-detail';

describe('Individual link page', () => {
  it('renders link props', () => {
    render(<LinkDetail />);
  });
});
