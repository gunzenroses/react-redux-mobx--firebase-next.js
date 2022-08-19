import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../__mocks__/testWrapper';
import { SignInPageForm } from './SignInPageForm';

describe('Sign-in page', () => {
  let form: HTMLElement;
  const handeOnSubmit = jest.fn();

  beforeEach(() => {
    form = renderWithProviders(
      <SignInPageForm handleOnSubmit={handeOnSubmit} />,
      { preloadedState: {} },
      { asPath: '/' }
    ).container;
  });

  test('Sign in snapshot', () => {
    expect(form).toMatchSnapshot();
  });

  test('Email input exist', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('Email input work correctly', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' },
    });
    expect(emailInput).toHaveValue('test@gmail.com');
  });

  test('Password input exist', () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Password input work correctly', () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, {
      target: { value: '12345678' },
    });
    expect(passwordInput).toHaveValue('12345678');
  });

  test('Sign in button exist', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveAccessibleName('buttonSignIn');
  });

  test('Sign up button exist', () => {
    const registrationButton = screen.getByRole('link');
    expect(registrationButton).toBeInTheDocument();
  });

  test('Sign in button can be called', () => {
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    expect(handeOnSubmit).toBeCalled();
  });
});
