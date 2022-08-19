import { FC, FormEvent, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Input, RadioButtonGroup, Toggle, Button, MaskInput } from 'components';

import styles from './RegistrationForm.module.scss';

type Props = {
  handleOnSubmit: (
    email: string,
    password: string,
    data: RegistrationData
  ) => void;
};

const RegistrationForm: FC<Props> = ({ handleOnSubmit }) => {
  const [email, setEmail] = useState('');
  const handleInputEmailOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(e.target.value);
  };
  const { t } = useTranslation('registration-form');

  const [password, setPassword] = useState('');
  const handleInputPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: RegistrationData = Object.fromEntries(
      formData
    ) as RegistrationData;
    handleOnSubmit(email, password, data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>{t('title')}</h3>
      <div className={cn(styles.wrapper, styles.wrapper_xl)}>
        <Input placeholder={t('name')} name="name" />
        <Input placeholder={t('surname')} name="surname" />
        <RadioButtonGroup
          buttonsProps={[
            { name: 'gender', text: t('male'), value: 'male' },
            { name: 'gender', text: t('female'), value: 'female' },
          ]}
          active="male"
        />
      </div>
      <div className={cn(styles.wrapper, styles.wrapper_m)}>
        <div className={styles.inputWrapper}>
          <span className={styles.label}>{t('birthday')}</span>
          <MaskInput name="birthday" />
        </div>
      </div>
      <div className={cn(styles.wrapper, styles.wrapper_m)}>
        <div className={styles.inputWrapper}>
          <span className={styles.label}>{t('loginInformation')}</span>
          <Input
            placeholder="Email"
            type="email"
            onChange={handleInputEmailOnChange}
          />
        </div>
        <Input
          placeholder={t('password')}
          type="password"
          onChange={handleInputPasswordOnChange}
        />
        <Toggle text={t('specOffers')} name="getSpecOffers" />
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="submit">{t('buttonSignUp')}</Button>
      </div>
      <div className={styles.login}>
        <span className={styles.text}>{t('login')}</span>
        <Button type="signIn" href="/sign-in">
          {t('buttonSignIn')}
        </Button>
      </div>
    </form>
  );
};

export { RegistrationForm };
