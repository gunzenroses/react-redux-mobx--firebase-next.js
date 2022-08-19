import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../__mocks__/testWrapper';
import { preloadedState } from '../__mocks__/preloadedState';
import RoomSearchPage from '../src/pages/room-search/index';

jest.spyOn(window, 'scrollTo').mockImplementation(() => {
  return {};
});

const expectedProps = {
  profileName: '',
  freeDays: { from: '', to: '' },
  guests: { adults: 0, baby: 0, kids: 0 },
};

describe('RoomSearchPage snapshot', () => {
  it('RoomSearchPage snapshot', () => {
    const { container } = renderWithProviders(
      <RoomSearchPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/room-search' }
    );
    expect(container).toMatchSnapshot();
  });
});

describe('RoomSearchPage with props', () => {
  it('RoomSearchPage with profileName', () => {
    const props = { ...expectedProps, profileName: 'roomSearch roomSearch' };

    renderWithProviders(
      <RoomSearchPage {...props} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    const profileName = screen.getByText('roomSearch roomSearch');
    expect(profileName).toBeVisible();
    const signInButton = screen.queryByText('signIn');
    expect(signInButton).toBeNull();
    const logInButton = screen.queryByText('signUp');
    expect(logInButton).toBeNull();
  });

  it('RoomSearchPage without profileName', () => {
    const props = { ...expectedProps, profileName: '' };

    renderWithProviders(
      <RoomSearchPage {...props} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    const signInButton = screen.getByText('signIn');
    expect(signInButton).toBeVisible();
    const logInButton = screen.queryByText('signUp');
    expect(logInButton).toBeVisible();
  });

  it('RoomSearchPage with props 1 adult', () => {
    const props = { ...expectedProps, guests: { adults: 1, baby: 0, kids: 0 } };

    renderWithProviders(
      <RoomSearchPage {...props} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    const guestsinput = screen.getByDisplayValue('1 guests');
    expect(guestsinput).toBeVisible();
  });

  it('RoomSearchPage with props 2 adult 2 kids 1 baby', async () => {
    const props = { ...expectedProps, guests: { adults: 2, baby: 1, kids: 2 } };

    renderWithProviders(
      <RoomSearchPage {...props} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    const guestsinput = screen.getByDisplayValue('4 guests, 1 babies');
    expect(guestsinput).toBeVisible();
  });

  it('RoomSearchPage get and show rooms', () => {
    renderWithProviders(
      <RoomSearchPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    const roomNumber111 = screen.getByText('111');
    const roomNumber222 = screen.getByText('222');
    const nonExistentRoomNumber = screen.queryByText('999');

    expect(roomNumber111).toBeVisible();
    expect(roomNumber222).toBeVisible();
    expect(nonExistentRoomNumber).toBeNull();
  });
});

describe('RoomSearchPage linkButtons', () => {
  it('RoomSearchPage registartion button', () => {
    renderWithProviders(
      <RoomSearchPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    expect(screen.getByText('signUp').closest('a')).toHaveAttribute(
      'href',
      '/register'
    );
  });

  it('RoomSearchPage sign-in button', () => {
    renderWithProviders(
      <RoomSearchPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    expect(screen.getByText('signIn').closest('a')).toHaveAttribute(
      'href',
      '/sign-in'
    );
  });
});

describe('RoomSearchPage checkbox event', () => {
  it('RoomSearchPage checkbox event', () => {
    renderWithProviders(
      <RoomSearchPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/room-search' }
    );

    const input = screen.getByRole('checkbox', {
      name: 'allowPets',
    });
    fireEvent.change(input, { target: { checked: true } });

    expect(input).toBeChecked();
  });
});
