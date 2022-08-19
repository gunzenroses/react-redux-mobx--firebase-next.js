import React, { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Input } from 'components/Input/Input';
import { Logo } from 'components/Logo/Logo';

import styles from './FooterContent.module.scss';
import { FooterList } from './FooterList/FooterList';
import { links } from './constants';

const FooterContent: FC = () => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation('footer');
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
              {t('description')}
            </p>
          </div>
          {links.map((item, index) => (
            <div
              className={styles.footerContent__column}
              key={`${item.title + index}`}
            >
              <FooterList title={t(item.title)} links={item.links} />
            </div>
          ))}
          <div className={styles.footerContent__column}>
            <h3 className={styles.footerContent__subtitle}>
              {t('subscription')}
            </h3>
            <p className={styles.footerContent__description}>
              {t('subscriptionText')}
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
