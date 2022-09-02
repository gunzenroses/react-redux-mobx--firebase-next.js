import React, { FC, FormEvent, useState } from 'react';

import { Button, Input } from 'components';

import styles from './SignInPageForm.module.scss';

type Props = {
  handleOnSubmit: (email: string, password: string) => void
}

const SignInPageForm: FC<Props> = ({ handleOnSubmit }) => {
  const [email, setEmail] = useState('');
  const handleInputEmailOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState('');
  const handleInputPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleOnSubmit(email, password)
  };

  return (
    <form className={styles.signInPageForm} onSubmit={handleSubmit}>
      <div className={styles.signInPageForm__inner}>
        <h2 className={styles.signInPageForm__title}>Войти</h2>
        <div className={styles.signInPageForm__input}>
          <Input type="email" onChange={handleInputEmailOnChange} />
        </div>
        <div className={styles.signInPageForm__input}>
          <Input
            placeholder="Пароль"
            type="password"
            onChange={handleInputPasswordOnChange}
          />
        </div>
        <div className={styles.signInPageForm__button}>
          <Button type="submit">войти</Button>
        </div>
        <div className={styles.signInPageForm__direction}>
          <p className={styles.signInPageForm__text}>Нет аккаунта на Toxin?</p>
          <div className={styles.signInPageForm__link}>
            <Button type="signIn" theme="authorization" href="/register">
              создать
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export { SignInPageForm };
