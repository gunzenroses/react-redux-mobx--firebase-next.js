import React, { FC, useState } from 'react';

import { Input } from 'components/Input/Input';
import { Logo } from 'components/Logo/Logo';

import styles from './FooterContent.module.scss';
import { FooterList } from './FooterList/FooterList';
import { links } from './constants';

const FooterContent: FC = () => {
  const [email, setEmail] = useState('');
  const handleInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(e.target.value);
  };

  const handleFormOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert(email);
  };

  return (
    <div className={styles.footerContent}>
      <div className={styles.footerContent__container}>
        <div className={styles.footerContent__content}>
          <div className={styles.footerContent__column}>
            <div className={styles.footerContent__logo}>
              <Logo />
            </div>
            <p className={styles.footerContent__description}>
              Бронирование номеров в лучшем отеле 2019 года по версии ассоциации
              «Отельные взгляды»
            </p>
          </div>
          {links.map((item, index) => (
            <div
              className={styles.footerContent__column}
              key={`${item.title + index}`}
            >
              <FooterList title={item.title} links={item.links} />
            </div>
          ))}
          <div className={styles.footerContent__column}>
            <h3 className={styles.footerContent__subtitle}>подписка</h3>
            <p className={styles.footerContent__description}>
              Получайте специальные предложения и новости сервиса
            </p>
            <form
              className={styles.footerContent__form}
              onSubmit={handleFormOnSubmit}
            >
              <Input withArrow onChange={handleInputOnChange} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FooterContent };
