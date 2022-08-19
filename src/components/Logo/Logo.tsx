import Link from 'next/link';
import Image from 'next/image';

import logoPic from 'assets/images/logo/logo-pic.svg';
import logoText from 'assets/images/logo/logo-text.svg';

import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link href="/" passHref>
      <a href="replace" className={styles.logo}>
        <Image src={logoPic} alt="logo" width={40} height={40} />
        <Image src={logoText} alt="company name" width={54} height={14} />
      </a>
    </Link>
  );
};

export { Logo };
