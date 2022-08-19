import { renderWithProviders } from '../../../__mocks__/testWrapper';
import { LandingForm } from './LandingForm';

describe('Sign-in page', () => {
  test('Landing form snapshot', () => {
    const form = renderWithProviders(
      <LandingForm
        freeDays={{
          from: null,
          to: null,
        }}
        guests={{
          adults: 0,
          baby: 0,
          kids: 0,
        }}
      />,
      { preloadedState: {} },
      { asPath: '/' }
    ).container;

    expect(form).toMatchSnapshot();
  });
});
