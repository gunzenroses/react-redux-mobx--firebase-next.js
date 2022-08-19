import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Like } from './Like';

describe('test existing Like', () => {
  const onClick = () => {};
  beforeEach(() => {
    render(<Like likes={2} isPressed={false} onClick={onClick} />);
  });

  test('Like exists', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    const counter = screen.getByTestId('Like-counter');
    expect(counter).toBeInTheDocument();
    expect(counter).toContainHTML('2');
    expect(screen.getByTestId('Like-Outline-heart')).toBeInTheDocument();
  });
});

describe('test working Like', () => {
  const onClick = () => {};
  test('Like works fine', () => {
    render(<Like likes={3} isPressed onClick={onClick} />);
    expect(screen.getByTestId('Like-fill-heart')).toBeInTheDocument();
    expect(screen.getByTestId('Like-counter')).toContainHTML('3');
  });
});
