import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../__mocks__/testWrapper';
import { preloadedState } from '../__mocks__/preloadedState';
import SignInPage from '../src/pages/sign-in/index';

const mockAuth = jest.fn().mockReturnThis();

const expectedProps = {
  profileName: '',
  makeAuth: mockAuth,
};

beforeEach(() => {
  jest.clearAllMocks();
});

const signInPage = renderWithProviders(
  <SignInPage {...expectedProps} />,
  { preloadedState },
  { asPath: '/signin' }
);

describe('signIn page snapshot', () => {
  it('draw page', () => {
    const { container } = signInPage;
    expect(container).toMatchSnapshot();
  });
});

describe('signIn page ', () => {
  it('render header', () => {
    const { container } = renderWithProviders(
      <SignInPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/signin' }
    );
    const header = container.getElementsByTagName('header')[0];
    expect(header).toBeVisible();
  });

  it('render footer', () => {
    const { container } = renderWithProviders(
      <SignInPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/signin' }
    );
    const header = container.getElementsByTagName('footer')[0];
    expect(header).toBeVisible();
  });

  it('render SignIn Form', () => {
    renderWithProviders(
      <SignInPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/signin' }
    );
    const formName = screen.getByRole('heading', { name: /title/i });
    const signInBtn = screen.getByRole('button', { name: 'buttonSignIn' });

    expect(formName).toBeVisible();
    expect(signInBtn).toBeVisible();
  });

  it('call a function getAuth to sign in a user', async () => {
    const { container, getByText } = renderWithProviders(
      <SignInPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/signin' }
    );

    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'SomePassword123' },
    });
    fireEvent.click(getByText('buttonSignIn'));

    await expect(mockAuth).toHaveBeenCalledTimes(1);
  });

  it('do not call a function getAuth without email', () => {
    const { container, getByText } = renderWithProviders(
      <SignInPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/signin' }
    );

    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: '' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'SomePassword123' },
    });
    fireEvent.click(getByText('buttonSignIn'));

    expect(mockAuth).toHaveBeenCalledTimes(0);
  });

  it('do not call a function getAuth without password', () => {
    const { container, getByText } = renderWithProviders(
      <SignInPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/signin' }
    );

    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: '' },
    });
    fireEvent.click(getByText('buttonSignIn'));

    expect(mockAuth).toHaveBeenCalledTimes(0);
  });
});
