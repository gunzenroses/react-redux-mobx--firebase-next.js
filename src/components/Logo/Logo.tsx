import { Link } from 'react-router-dom';

import logoPic from 'assets/images/logo/logo-pic.svg';
import logoText from 'assets/images/logo/logo-text.svg';

import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src={logoPic} alt="logo"/>
      <img src={logoText} alt="company name"/>
    </Link>
  );
}

export { Logo };