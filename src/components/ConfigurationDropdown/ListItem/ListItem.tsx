import { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import styles from './ListItem.module.scss';

type Props = {
  id: string;
  value: number;
  minValue: number;
  maxValue: number;
  text?: string;
  onClick?: (key: string, isIncrease: boolean) => void;
  isDisabled?: boolean;
};

const ListItem: FC<Props> = ({
  id,
  value,
  minValue,
  maxValue,
  text = 'For change',
  onClick = () => {},
  isDisabled = false,
}) => {
  const isDecreaseDisabled = value === minValue || isDisabled;
  const isIncreaseDisabled = value === maxValue || isDisabled;
  const { t } = useTranslation('dropdown');

  return (
    <li className={styles.roomDropdownListItem}>
      <span className={styles.roomDropdownListItem__text}>{t(text)}</span>
      <div className={styles.roomDropdownListItem__calc}>
        <button
          type="button"
          className={cn(styles.roomDropdownListItem__calcButton, {
            [styles.roomDropdownListItem__calcButton_disabled]:
              isDecreaseDisabled,
          })}
          disabled={isDecreaseDisabled}
          onClick={() => onClick(id, false)}
        >
          -
        </button>
        <output className={styles.roomDropdownListItem__output}>{value}</output>
        <button
          type="button"
          className={cn(styles.roomDropdownListItem__calcButton, {
            [styles.roomDropdownListItem__calcButton_disabled]:
              isIncreaseDisabled,
          })}
          disabled={isIncreaseDisabled}
          onClick={() => onClick(id, true)}
        >
          +
        </button>
      </div>
    </li>
  );
};

export { ListItem };
export type { Props };
