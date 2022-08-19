import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RoomInfoList } from './RoomInfoList';

describe('test existing RoomInfoList', () => {
  beforeEach(() => {
    render(<RoomInfoList />);
  });

  test('RoomInfoList exists', () => {
    const roomInfoList = screen.getByTestId('RoomInfoList-wrapper');
    expect(roomInfoList).toBeInTheDocument();
    const title = screen.getByTestId('RoomInfoList-wrapper');
    expect(title).toBeInTheDocument();
  });
});

describe('test RoomInfoList has content', () => {
  test('RoomInfo has content', () => {
    const roomInfo = screen.queryAllByTestId('RoomInfoList-content');
    roomInfo.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).not.toBeEmptyDOMElement();
    });
  });
});
