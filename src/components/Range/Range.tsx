import { FC, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './Range.module.scss';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  labelText?: string;
  rangeText?: string;
  onChange?: (val: number[]) => void;
};

const Range: FC<Props> = ({
  min = 0,
  max = 15000,
  step = 100,
  value = [5000, 10000],
  labelText = 'Диапазон цены',
  rangeText = 'Стоимость за сутки пребывания в номере',
  onChange,
}) => {
  const inputText = (val: number | number[]) => {
    return typeof val === 'number'
      ? val.toLocaleString()
      : `${val[0].toLocaleString()}₽ - ${val[1].toLocaleString()}₽`;
  };

  const [currentValue, setCurrentValue] = useState<number | number[]>(value);

  const [inputValue, setInputValue] = useState(inputText(currentValue));

  const handleInput = (val: number[]): void => {
    if (onChange) {
      onChange(val);
    }
  };

  const handleRange = (val: number | number[]): void => {
    if (Array.isArray(val)){
      setCurrentValue(val);
      setInputValue(inputText(val));
      handleInput(val);
    }
  };

  const handleValueChange = (newValue: number | number[]) => {
    setCurrentValue(newValue);
    setInputValue(inputText(newValue));
  };

  return (
    <div className={styles.range}>
      <label className={styles.range__label}>
        {labelText}
        <input
          type="text"
          name="range"
          placeholder=""
          className={styles.range__data}
          value={inputValue}
          readOnly
        />
      </label>
      <Slider
        range
        allowCross={false}
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onAfterChange={handleRange}
        onChange={handleValueChange}
      />
      <p className={styles.range__text}>{rangeText}</p>
    </div>
  );
};

export { Range };