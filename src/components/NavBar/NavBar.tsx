import { FC } from 'react';

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
          <NavItem key={String(key)} title={title} to={to} content={content} />
        );
      })}
    </ul>
  );
};

export { NavBar };