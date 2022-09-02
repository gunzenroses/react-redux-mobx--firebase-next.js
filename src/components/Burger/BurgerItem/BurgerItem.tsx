import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './BurgerItem.module.scss';

type Props = {
  title: string;
  to: string;
};

const BurgerItem: FC<Props> = ({ title, to }) => {
  return (
    <li className={styles.burgerItem}>
      <Link to={to} className={styles.burgerItem__link}>
        {title}
      </Link>
    </li>
  );
};

export { BurgerItem };
export type { Props };
