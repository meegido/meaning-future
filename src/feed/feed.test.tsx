import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Feed } from './feed';

describe('Links feed', () => {
  it('display all users links', () => {
    render(<Feed />);
  });

  it('user goes to individual link page when click on view button', () => {});
});
