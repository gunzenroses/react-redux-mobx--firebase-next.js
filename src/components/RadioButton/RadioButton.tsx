import { FC } from 'react';
import cn from 'classnames';

import styles from './RadioButton.module.scss';

type Props = {
  name: string;
  value: string;
  text: string;
  isChecked?: boolean;
  onChange?: (value: string) => void;
};

const RadioButton: FC<Props> = ({
  name,
  value,
  text,
  isChecked = false,
  onChange = () => {},
}) => {
  const handleChange = (): void => {
    onChange(value);
  };

  return (
    <label className={styles.radioButton}>
      <span className={styles.radioButton__inputWrapper}>
        <input
          type="radio"
          className={styles.radioButton__control}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
        />
        <span
          className={cn(styles.radioButton__border, {
            [styles.radioButton__border_active]: isChecked,
          })}
        />
      </span>
      <span
        className={cn(styles.radioButton__text, {
          [styles.radioButton__text_active]: isChecked,
        })}
      >
        {text}
      </span>
    </label>
  );
};

export { RadioButton };
export type { Props };
