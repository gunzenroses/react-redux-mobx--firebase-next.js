import { FC } from 'react';

import twitter from 'assets/images/socialIcons/twitter.svg';
import facebook from 'assets/images/socialIcons/facebook.svg';
import instagram from 'assets/images/socialIcons/instagram.svg';
import { Logo } from 'components/Logo/Logo';

import styles from './FooterSocial.module.scss';

const FooterSocial: FC = () => {
  return (
    <div className={styles.footerSocial}>
      <div className={styles.footerSocial__container}>
        <div className={styles.footerSocial__content}>
          <div className={styles.footerSocial__logo}>
            <Logo />
          </div>
          <p className={styles.footerSocial__text}>
            Copyright © 2018 Toxin отель. Все права защищены.
          </p>
          <div className={styles.footerSocial__icons}>
            <a
              className={styles.footerSocial__link}
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitter}
                alt="twitter"
                className={styles.footerSocial__icon}
              />
            </a>
            <a
              className={styles.footerSocial__link}
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="facebook"
                className={styles.footerSocial__icon}
              />
            </a>
            <a
              className={styles.footerSocial__link}
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagram}
                alt="instagram"
                className={styles.footerSocial__icon}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FooterSocial };
