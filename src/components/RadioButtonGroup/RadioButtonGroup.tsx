import { FC, useState } from 'react';

import { RadioButton } from 'components';
import { Props as RadioButtonProps } from 'components/RadioButton/RadioButton';

import styles from './RadioButtonGroup.module.scss';

type Props = {
  buttonsProps: RadioButtonProps[];
  active?: string;
  onChange?: (value: string) => void;
};

const RadioButtonGroup: FC<Props> = ({
  buttonsProps,
  active = '',
  onChange,
}) => {
  const [activeValue, setActiveValue] = useState(active);
  const onButtonChange = (value: string) => {
    setActiveValue(value);
    if (onChange) onChange(String(value));
  };

  return (
    <div className={styles.radioButtonGroup}>
      {buttonsProps.map(({ name, value, text }, key) => {
        return (
          <RadioButton
            name={name}
            value={value}
            text={text}
            isChecked={value === activeValue}
            onChange={onButtonChange}
            key={String(key.toFixed())}
          />
        );
      })}
    </div>
  );
};

export { RadioButtonGroup };
