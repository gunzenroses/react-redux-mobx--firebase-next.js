import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { createMockRouter } from '../__mocks__/createMockRouter';
import { renderWithProviders } from '../__mocks__/testWrapper';
import { preloadedState } from '../__mocks__/preloadedState';
import { timeOptions } from '../src/utils/timeOptions';
import UserPage from '../src/pages/user-page/index';

describe('test user page', () => {
  beforeAll(() => {});
  const rooms = preloadedState.booking.data;
  const personalData = {
    id: '2',
    name: 'Тест',
    surname: 'Тестов',
    email: 'email@mail.mail',
    birthday: '{"seconds":-1897871417,"nanoseconds":0}',
    gender: 'male',
    getSpecOffers: false,
    likes: [],
  };
  const props = { rooms, personalData, profileName: 'Тест Тестов' };
  it('should display user info', () => {
    renderWithProviders(
      <UserPage {...props} />,
      {},
      { locale: 'ru' }
    );

    expect(screen.getByText(personalData.name)).toBeInTheDocument();
    expect(screen.getByText(personalData.surname)).toBeInTheDocument();
    expect(screen.getByText(personalData.gender)).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(
          Number(JSON.parse(personalData.birthday).seconds) * 1000
        ).toLocaleString([], timeOptions)
      )
    ).toBeInTheDocument();
    expect(screen.getByText(personalData.email)).toBeInTheDocument();
  });

  test('should display room card', () => {
    renderWithProviders(<UserPage {...props} />);
    expect(screen.getByTestId('booked-card')).toBeInTheDocument();
  });

  test('should remove room card', () => {
    renderWithProviders(<UserPage {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'cancel' }));
    expect(screen.queryByTestId('booked-card')).not.toBeInTheDocument();
    expect(screen.queryByText('noRooms')).toBeInTheDocument();
  });

  test('should logout', () => {
    const router = createMockRouter({});
    renderWithProviders(<UserPage {...props} />, {}, router);
    fireEvent.click(screen.getByRole('button', { name: 'exit' }));
    expect(router.push).toHaveBeenCalledWith('./sign-in');
  });
});
