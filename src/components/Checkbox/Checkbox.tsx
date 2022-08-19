import { ChangeEvent, FC } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import styles from './Checkbox.module.scss';

type Props = {
  text: string;
  name: string;
  checked: boolean;
  titleText?: string;
  isShort?: boolean;
  onChange?: (item: { [name: string]: boolean }) => void;
};

const Checkbox: FC<Props> = ({
  text,
  name,
  checked,
  titleText = null,
  isShort = false,
  onChange,
}) => {
  const { t } = useTranslation('checkbox');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetChecked = event.target.checked;
    const targetName = event.target.name;
    const item: { [name: string]: boolean } = {};
    item[targetName] = targetChecked;
    if (onChange) onChange(item);
  };

  return (
    <label className={styles.checkbox}>
      <span className={styles.checkbox__inputWrapper}>
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={styles.checkbox__control}
        />
        <span
          className={cn(styles.checkbox__border, {
            [styles.checkbox__border_active]: checked,
          })}
        />
      </span>
      <div
        className={cn(styles.checkbox__textWrapper, {
          [styles.checkbox__textWrapper_length_short]: isShort,
        })}
      >
        {titleText && (
          <span className={styles.checkbox__title}>{t(titleText)}</span>
        )}
        <span className={styles.checkbox__text}>{t(text)}</span>
      </div>
    </label>
  );
};

export { Checkbox };
export type { Props };
