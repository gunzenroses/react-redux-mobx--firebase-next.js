import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RoomImpressions } from './RoomImpressions';

describe('test existing RoomImpressions', () => {
  beforeEach(() => {
    render(<RoomImpressions crap={10} good={15} great={20} ok={5} />);
  });
  test('RoomImpressions exists', () => {
    const roomImpressions = screen.getByTestId('RoomImpressions-wrapper');
    expect(roomImpressions).toBeInTheDocument();
    const title = screen.getByTestId('RoomImpressions-title');
    expect(title).toBeInTheDocument();
    const figure = screen.getByTestId('RoomImpressions-figure');
    expect(figure).toBeInTheDocument();
    const figcaption = screen.getByTestId('RoomImpressions-figcaption');
    expect(figcaption).toBeInTheDocument();
    const svg = screen.getByTestId('RoomImpressions-svg');
    expect(svg).toBeInTheDocument();
  });
});

describe('test RoomImpressions has content', () => {
  beforeEach(() => {
    render(<RoomImpressions crap={10} good={15} great={20} ok={5} />);
  });
  test('svg has content', () => {
    const svg = screen.getByTestId('RoomImpressions-svg');
    const lg = screen.queryAllByTestId('RoomImpressions-linearGradient');
    lg.forEach((item) => {
      expect(svg).toContainElement(item);
    });
    const g = screen.getByTestId('RoomImpressions-g');
    expect(g).not.toBeEmptyDOMElement();
    const sum = screen.getByText('50');
    expect(sum).toBeInTheDocument();
  });
  test('figcaption has content', () => {
    const list = screen.getByTestId('RoomImpressions-figcaption-list');
    expect(list).not.toBeEmptyDOMElement();
  });
});
