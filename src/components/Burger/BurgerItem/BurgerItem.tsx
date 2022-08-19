import { FC } from 'react';
import Link from 'next/link';

import styles from './BurgerItem.module.scss';

type Props = {
  title: string;
  to: string;
};

const BurgerItem: FC<Props> = ({ title, to }) => {
  return (
    <li className={styles.burgerItem}>
      <Link href={to} passHref>
        <a className={styles.burgerItem__link} href="replace">
          {title}
        </a>
      </Link>
    </li>
  );
};

export { BurgerItem };
export type { Props };
