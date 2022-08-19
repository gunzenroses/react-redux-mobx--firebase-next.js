import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import twitter from 'assets/images/socialIcons/twitter.svg';
import facebook from 'assets/images/socialIcons/facebook.svg';
import instagram from 'assets/images/socialIcons/instagram.svg';
import { Logo } from 'components/Logo/Logo';

import styles from './FooterSocial.module.scss';

const FooterSocial: FC = () => {
  const { t } = useTranslation('footer');
  return (
    <div className={styles.footerSocial}>
      <div className={styles.footerSocial__container}>
        <div className={styles.footerSocial__content}>
          <div className={styles.footerSocial__logo}>
            <Logo />
          </div>
          <p className={styles.footerSocial__text}>{t('copyright')}</p>
          <div className={styles.footerSocial__icons}>
            <Link href="https://twitter.com/" passHref>
              <a
                className={styles.footerSocial__link}
                href="replace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={twitter}
                  alt="twitter"
                  className={styles.footerSocial__icon}
                />
              </a>
            </Link>
            <Link href="https://facebook.com/" passHref>
              <a
                className={styles.footerSocial__link}
                href="replace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={facebook}
                  alt="facebook"
                  className={styles.footerSocial__icon}
                />
              </a>
            </Link>
            <Link href="https://instagram.com/" passHref>
              <a
                className={styles.footerSocial__link}
                href="replace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={instagram}
                  alt="instagram"
                  className={styles.footerSocial__icon}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FooterSocial };
