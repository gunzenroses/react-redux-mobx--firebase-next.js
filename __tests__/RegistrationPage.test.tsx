import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../__mocks__/testWrapper';
import { preloadedState } from '../__mocks__/preloadedState';
import RegistrationPage from '../src/pages/register/index';

const mockGetAuth = jest.fn().mockReturnThis();

const expectedProps = {
  profileName: '',
  authentication: mockGetAuth
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Registration page snapshot', () => {
  it('draw page', () => {
    const { container } = renderWithProviders(
      <RegistrationPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/register' }
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Registration page ', () => {
  it('renders Header', () => {
    const { container } = renderWithProviders(
      <RegistrationPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/register' }
    );
    const header = container.getElementsByTagName('header')[0];
    expect(header).toBeVisible();
  });

  it('renders Footer', () => {
    const { container } = renderWithProviders(
      <RegistrationPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/register' }
    );
    const footer = container.getElementsByTagName('footer')[0];
    expect(footer).toBeVisible();
  });

  it('renders Registration Form', () => {
    renderWithProviders(
      <RegistrationPage {...expectedProps} />,
      { preloadedState },
      { asPath: '/registrer' }
    );
    const formName = screen.getByRole('heading', { name: /title/i });
    const registerButton = screen.getByRole('button', { name: 'buttonSignUp' });

    expect(formName).toBeVisible();
    expect(registerButton).toBeVisible();
  });

  it('create a user when all data filled', () => {
    const { container, getByPlaceholderText, getByRole, getByText } =
      renderWithProviders(
        <RegistrationPage {...expectedProps} />,
        { preloadedState },
        { asPath: '/registration' }
      );

    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Somename' },
    });
    fireEvent.change(getByPlaceholderText('surname'), {
      target: { value: 'Somesurname' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'female' }));
    fireEvent.change(getByPlaceholderText('birthdayPlaceholder'), {
      target: { value: '23.01.1991' },
    });
    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'SomePassword123' },
    });
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('buttonSignUp'));

    expect(mockGetAuth).toHaveBeenCalledTimes(1);
  });

  it('do not createUser without name', () => {
    const { container, getByPlaceholderText, getByRole, getByText } =
      renderWithProviders(
        <RegistrationPage {...expectedProps} />,
        { preloadedState },
        { asPath: '/registration' }
      );

    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: '' },
    });
    fireEvent.change(getByPlaceholderText('surname'), {
      target: { value: 'Somesurname' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'female' }));
    fireEvent.change(getByPlaceholderText('birthdayPlaceholder'), {
      target: { value: '23.01.1991' },
    });
    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'SomePassword123' },
    });
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('buttonSignUp'));

    expect(mockGetAuth).toHaveBeenCalledTimes(0);
  });

  it('do not createUser without surname', () => {
    const { container, getByPlaceholderText, getByRole, getByText } =
      renderWithProviders(
        <RegistrationPage {...expectedProps} />,
        { preloadedState },
        { asPath: '/registration' }
      );

    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Somename' },
    });
    fireEvent.change(getByPlaceholderText('surname'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'female' }));
    fireEvent.change(getByPlaceholderText('birthdayPlaceholder'), {
      target: { value: '23.01.1991' },
    });
    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'SomePassword123' },
    });
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('buttonSignUp'));

    expect(mockGetAuth).toHaveBeenCalledTimes(0);
  });

  it('do not createUser without BDay', () => {
    const { container, getByPlaceholderText, getByRole, getByText } =
      renderWithProviders(
        <RegistrationPage {...expectedProps} />,
        { preloadedState },
        { asPath: '/registration' }
      );

    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Somename' },
    });
    fireEvent.change(getByPlaceholderText('surname'), {
      target: { value: 'Somesurname' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'female' }));
    fireEvent.change(getByPlaceholderText('birthdayPlaceholder'), {
      target: { value: '' },
    });
    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'SomePassword123' },
    });
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('buttonSignUp'));

    expect(mockGetAuth).toHaveBeenCalledTimes(0);
  });

  it('do not createUser with wrong email', () => {
    const { container, getByPlaceholderText, getByRole, getByText } =
      renderWithProviders(
        <RegistrationPage {...expectedProps} />,
        { preloadedState },
        { asPath: '/registration' }
      );
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Somename' },
    });
    fireEvent.change(getByPlaceholderText('surname'), {
      target: { value: 'Somesurname' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'female' }));
    fireEvent.change(getByPlaceholderText('birthdayPlaceholder'), {
      target: { value: '23.01.1991' },
    });
    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 's' },
    });
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('buttonSignUp'));

    expect(mockGetAuth).toHaveBeenCalledTimes(0);
  });

  it('do not createUser with wrong password', () => {
    const { container, getByPlaceholderText, getByRole, getByText } =
      renderWithProviders(
        <RegistrationPage {...expectedProps} />,
        { preloadedState },
        { asPath: '/registration' }
      );

    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Somename' },
    });
    fireEvent.change(getByPlaceholderText('surname'), {
      target: { value: 'Somesurname' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'female' }));
    fireEvent.change(getByPlaceholderText('birthdayPlaceholder'), {
      target: { value: '23.01.1991' },
    });
    fireEvent.change(container.querySelector(`[type="email"]`)!, {
      target: { value: 'someemail@mail.ru' },
    });
    fireEvent.change(container.querySelector(`[type="password"]`)!, {
      target: { value: 'S' },
    });
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText('buttonSignUp'));

    expect(mockGetAuth).toHaveBeenCalledTimes(0);
  });
});
