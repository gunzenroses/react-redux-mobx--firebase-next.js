import { FC } from 'react';

import { Authentication } from './Authentication/Authentication';
import { ProfileLink } from './ProfileLink/ProfileLink';

type Props = {
  profileName?: string;
  inBurger?: boolean;
};

const UserMenu: FC<Props> = ({ profileName = '', inBurger = false }) => {
  return profileName.trim() ? (
    <ProfileLink name={profileName} />
  ) : (
    <Authentication inBurger={inBurger} />
  );
};

export { UserMenu };
