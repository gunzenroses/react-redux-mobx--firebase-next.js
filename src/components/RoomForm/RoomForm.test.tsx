import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../__mocks__/testWrapper';
import { RoomForm } from './RoomForm';

describe('Sign-in page', () => {
  let form: HTMLElement;

  const expectedProps = {
    data: {
      id: 100,
      imgSrc: [''],
      number: 130,
      type: '',
      rating: 3,
      price: 4000,
      costRange: '',
      reviewsAmount: 50,
    },
    initialDate: {
      from: new Date(2022, 6, 6).toISOString(),
      to: new Date(2022, 6, 8).toISOString(),
    },
    initialGuests: { adults: 1, baby: 0, kids: 0 },
  };

  beforeEach(() => {
    form = renderWithProviders(
      <RoomForm {...expectedProps} />,
      { preloadedState: {} },
      { asPath: '/' }
    ).container;
  });

  test('Sign in snapshot', () => {
    expect(form).toMatchSnapshot();
  });

  test('Room number exist', () => {
    const roomNumber = screen.getByText(/130/i);
    expect(roomNumber).toBeInTheDocument();
  });

  test('Calculation exist', () => {
    const calculation = screen.getByText(/2 day/i);
    expect(calculation).toBeInTheDocument();
  });
});
