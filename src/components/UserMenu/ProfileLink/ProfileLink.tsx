import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProfileLink.module.scss';

type Props = {
  name: string;
};

const ProfileLink: FC<Props> = ({ name }) => {
  return (
    <Link to="/user-page" className={styles.profile}>
      {name}
    </Link>
  );
};

export { ProfileLink };
