import React, { FC, FormEvent, useState } from 'react';
import cn from 'classnames';

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

  const [password, setPassword] = useState('');
  const handleInputPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data: RegistrationData = Object.fromEntries(
      formData
    ) as RegistrationData;
    handleOnSubmit(email, password, data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Регистрация аккаунта</h3>
      <div className={cn(styles.wrapper, styles.wrapper_xl)}>
        <Input placeholder="Имя" name="name"/>
        <Input placeholder="Фамилия" name="surname"/>
        <RadioButtonGroup
          buttonsProps={[
            { name: 'gender', text: 'Мужчина', value: 'male' },
            { name: 'gender', text: 'Женщина', value: 'female' },
          ]}
          active="male"
        />
      </div>
      <div className={cn(styles.wrapper, styles.wrapper_m)}>
        <div className={styles.inputWrapper}>
          <span className={styles.label}>дата рождения</span>
          <MaskInput name='birthday'/>
        </div>
      </div>
      <div className={cn(styles.wrapper, styles.wrapper_m)}>
        <div className={styles.inputWrapper}>
          <span className={styles.label}>данные для входа в сервис</span>
          <Input
            placeholder="Email"
            type="email"
            onChange={handleInputEmailOnChange}
          />
        </div>
        <Input
          placeholder="Пароль"
          type="password"
          onChange={handleInputPasswordOnChange}
        />
        <Toggle text="Получать спецпредложения" name='getSpecOffers'/>
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="submit">зарегистрироваться</Button>
      </div>
      <div className={styles.login}>
        <span className={styles.text}>Уже есть аккаунт на Toxin</span>
        <Button type="signIn" href="/sign-in">
          Войти
        </Button>
      </div>
    </form>
  );
};

export { RegistrationForm };
