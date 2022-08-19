import { FC } from 'react';
import Link from 'next/link';

import styles from './ProfileLink.module.scss';

type Props = {
  name: string;
};

const ProfileLink: FC<Props> = ({ name }) => {
  return (
    <Link href="/user-page" passHref>
      <a href="replace" className={styles.profile}>
        {name}
      </a>
    </Link>
  );
};

export { ProfileLink };
