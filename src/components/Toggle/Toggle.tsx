import { FC, useState } from 'react';
import cn from 'classnames';

import styles from './Toggle.module.scss';

type Props = {
  text?: string;
  isChecked?: boolean;
  name?: string;
};

const Toggle: FC<Props> = ({
  text = 'For change',
  isChecked = false,
  name = '',
}) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);
  const handleChange = (): void => {
    setIsCheckedState((prevState) => !prevState);
  };

  return (
    <label className={styles.toggle}>
      <span className={styles.toggle__inputWrapper}>
        <input
          type="checkbox"
          checked={isCheckedState}
          onChange={handleChange}
          className={styles.toggle__control}
          name={name}
        />
        <span
          className={cn(styles.toggle__border, {
            [styles.toggle__border_active]: isCheckedState,
          })}
        />
      </span>
      <span className={styles.toggle__text}>{text}</span>
    </label>
  );
};

export { Toggle };
