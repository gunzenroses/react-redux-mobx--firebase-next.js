import { FC } from 'react';

import { FooterContent } from './FooterContent/FooterContent';
import { FooterSocial } from './FooterSocial/FooterSocial';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <FooterContent />
      <FooterSocial />
    </footer>
  );
};

export { Footer };
