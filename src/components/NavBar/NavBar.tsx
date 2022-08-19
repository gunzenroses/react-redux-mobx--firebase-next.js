import { FC } from 'react';

import { LanguageSwitcher } from 'components';

import { NavItem, Props as NavItemProps } from './NavItem/NavItem';
import styles from './NavBar.module.scss';

type Props = {
  items: NavItemProps[];
};

const NavBar: FC<Props> = ({ items = [] }) => {
  return (
    <ul className={styles.navBar}>
      {items.map(({ title, to, content }, key) => {
        return (
          <NavItem
            key={String(key.toFixed())}
            title={title}
            to={to}
            content={content}
          />
        );
      })}
      <li className={styles.languageSwitcher}>
        <LanguageSwitcher />
      </li>
    </ul>
  );
};

export { NavBar };
