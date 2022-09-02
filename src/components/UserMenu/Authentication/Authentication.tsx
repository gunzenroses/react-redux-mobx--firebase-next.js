import { FC } from 'react';
import cn from 'classnames';

import { Button } from 'components/Button/Button';

import styles from './Authentication.module.scss';

type Props = {
  inBurger?: boolean;
};

const Authentication: FC<Props> = ({ inBurger = false }) => {
  return (
    <div
      className={cn(styles.authentication, {
        [styles.authentication_inBurger]: inBurger,
      })}
    >
      <div className={styles.authentication__signIn}>
        <Button type="signIn" href="/sign-in">
          Войти
        </Button>
      </div>
      <div className={styles.authentication__registration}>
        <Button type="registration" href="/register">
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export { Authentication };
