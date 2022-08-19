import { FC, FormEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Button, Input } from 'components';

import styles from './SignInPageForm.module.scss';

type Props = {
  handleOnSubmit: (email: string, password: string) => void;
};

const SignInPageForm: FC<Props> = ({ handleOnSubmit }) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation('sign-in-form');
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
    handleOnSubmit(email, password);
  };

  return (
    <form className={styles.signInPageForm} onSubmit={handleSubmit}>
      <div className={styles.signInPageForm__inner}>
        <h2 className={styles.signInPageForm__title}>{t('title')}</h2>
        <div className={styles.signInPageForm__input}>
          <Input type="email" onChange={handleInputEmailOnChange} />
        </div>
        <div className={styles.signInPageForm__input}>
          <Input
            placeholder={t('password')}
            type="password"
            onChange={handleInputPasswordOnChange}
          />
        </div>
        <div className={styles.signInPageForm__button}>
          <Button type="submit">{t('buttonSignIn')}</Button>
        </div>
        <div className={styles.signInPageForm__direction}>
          <p className={styles.signInPageForm__text}>{t('account')}</p>
          <div className={styles.signInPageForm__link}>
            <Button type="signIn" theme="authorization" href="/Registration">
              {t('buttonSignUp')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export { SignInPageForm };
