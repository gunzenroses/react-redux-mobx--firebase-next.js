import { screen, render, fireEvent } from '@testing-library/react';

import { RegistrationForm } from './RegistrationForm';

describe('Sign-in page', () => {
  let form: HTMLElement;
  const handleOnSubmit = jest.fn();

  beforeEach(() => {
    form = render(<RegistrationForm handleOnSubmit={handleOnSubmit} />).container;
  });

  test('Snapshot', () => {
    expect(form).toMatchSnapshot();
  });

  test('Email input exist', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('Email input work correctly', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com'}});
    expect(emailInput).toHaveValue('test@gmail.com');
  });

  test('Password input exist', () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Password input work correctly', () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '12345678' }});
    expect(passwordInput).toHaveValue('12345678');
  });

  test('Name input exist', () => {
    const nameInput = screen.queryByPlaceholderText('name');
    expect(nameInput).toBeInTheDocument();
  });

  test('Name input work correctly', () => {
    const nameInput = screen.getByPlaceholderText('name');
    fireEvent.change(nameInput, { target: { value: 'Test' }});
    expect(nameInput).toHaveValue('Test');
  });

  test('Surname input exist', () => {
    const surnameInput = screen.queryByPlaceholderText('surname');
    expect(surnameInput).toBeInTheDocument();
  });

  test('Surname input work correctly', () => {
    const surnameInput = screen.getByPlaceholderText('surname');
    fireEvent.change(surnameInput, { target: { value: 'Testing' }});
    expect(surnameInput).toHaveValue('Testing');
  });

  test('Gender radio group exist', () => {
    const male = screen.queryByDisplayValue('male');
    const female = screen.queryByDisplayValue('female');
    expect(male).toBeInTheDocument();
    expect(female).toBeInTheDocument();
  });

  test('Surname input work correctly', () => {
    const male = screen.getByDisplayValue('male');
    const female = screen.getByDisplayValue('female');
    expect(male).toBeChecked();
    fireEvent.click(female);
    expect(female).toBeChecked();
    fireEvent.click(male);
    expect(male).toBeChecked();
  });

  test('Birthday input exist', () => {
    const birthdayInput = screen.getByPlaceholderText('birthdayPlaceholder');
    expect(birthdayInput).toBeInTheDocument();
  });

  test('Birthday input work correctly', () => {
    const birthdayInput = screen.getByPlaceholderText('birthdayPlaceholder');
    fireEvent.change(birthdayInput, { target: { value: ''}});
    expect(birthdayInput).toHaveValue('');
    fireEvent.change(birthdayInput, { target: { value: '00' } });
    expect(birthdayInput).toHaveValue('00');
    fireEvent.change(birthdayInput, { target: { value: '5' } });
    expect(birthdayInput).toHaveValue('5');
  });

  test('Special offer input exist', () => {
    const specialOfferInput = screen.getByRole('checkbox');
    expect(specialOfferInput).toBeInTheDocument();
  });

  test('Special offer work correctly', () => {
    const specialOfferInput = screen.getByRole('checkbox');
    expect(specialOfferInput).not.toBeChecked();
    fireEvent.click(specialOfferInput);
    expect(specialOfferInput).toBeChecked();
    fireEvent.click(specialOfferInput);
    expect(specialOfferInput).not.toBeChecked();
  });

  test('Registration button exist', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  test('Sign In button exist', () => {
    const registrationButton = screen.getByRole('link');
    expect(registrationButton).toBeInTheDocument();
  });

  test('Sign in button can be called', () => {
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    expect(handleOnSubmit).toBeCalled();
  });
});
