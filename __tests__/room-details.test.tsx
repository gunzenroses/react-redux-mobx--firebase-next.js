import { screen } from '@testing-library/react';

import { renderWithProviders } from '../__mocks__/testWrapper';
import {
  freeDays,
  user,
  guests,
  roomInfo,
  roomDetails,
} from '../__mocks__/utils/mock-data-room-details';
import RoomDetailsPage from '../src/pages/room-details/[id]';

describe('test existing RoomDetails', () => {
  test('RoomDetails exists', () => {
    renderWithProviders(
      <RoomDetailsPage
        roomDetails={roomDetails}
        roomInfo={roomInfo}
        roomId={109}
        user={user}
        freeDays={freeDays}
        guests={guests}
      />,
      { preloadedState: {} },
      { asPath: '/' }
    );
    const wrapper = screen.getByTestId('RoomDetails-wrapper');
    expect(wrapper).toBeInTheDocument();
  });
  test('reject page exists', () => {
    renderWithProviders(
      <RoomDetailsPage
        roomDetails={{ ...roomDetails, isRejected: true }}
        roomInfo={roomInfo}
        roomId={109}
        user={user}
        freeDays={freeDays}
        guests={guests}
      />,
      { preloadedState: {} },
      { asPath: '/' }
    );
    expect(screen.queryByTestId('RoomDetails-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('RoomDetails-reject')).toBeInTheDocument();
    expect(screen.getByText(/rejected/i)).toBeVisible();
  });
});
