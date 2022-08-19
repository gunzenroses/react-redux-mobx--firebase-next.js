import { FC } from 'react';

import { Burger } from 'components/Burger/Burger';
import { NavBar } from 'components/NavBar/NavBar';
import { Logo } from 'components/Logo/Logo';
import { UserMenu } from 'components/UserMenu/UserMenu';

import { NavBarData } from './NavBarData';
import styles from './Header.module.scss';

type Props = {
  profileName?: string;
};

const Header: FC<Props> = ({ profileName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        <div className={styles.header__menu}>
          <div className={styles.header__burgerMenu}>
            <Burger profileName={profileName} items={NavBarData} />
          </div>
          <div className={styles.header__userMenu}>
            <UserMenu profileName={profileName} />
          </div>
          <div className={styles.header__navbar}>
            <NavBar items={NavBarData} />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
