import { FC } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import cn from 'classnames';

import { Input } from 'components';

import { Props as RoomDropdownListProps } from '../ListItem/ListItem';
import { dropdownData, TemplateConfiguration } from './DropdownInputData';
import styles from './DropdownInput.module.scss';

type Props = {
  closed: boolean;
  output: {
    type: 'sum' | 'twoAndOne' | 'sequential';
    template: 'rooms' | 'guests' | TemplateConfiguration;
  };
  list: RoomDropdownListProps[];
  onClick: () => void;
};

const DropdownInput: FC<Props> = ({
  closed,
  output,
  list,
  onClick,
}) => {
  const template: TemplateConfiguration =
    typeof output.template === 'string'
      ? dropdownData[output.template]
      : output.template;

  const calculateSumValue = (): number => {
    let counter = 0;

    list.forEach((listItem) => {
      counter += Number(listItem.value);
    });

    return counter;
  };

  const getWordEnding = (value: number): number => {
    const isSecondWordEnd = value > 1 && value < 5;

    switch (true) {
      case value === 1:
        return 1;
      case isSecondWordEnd:
        return 2;
      default:
        return 3;
    }
  };

  const getOutput = (templateIndex: number, value: number) => {
    const wordsTemplate = template.templates;
    const wordRoot = wordsTemplate[templateIndex][0];
    const endOfWord = wordsTemplate[templateIndex][getWordEnding(value)];
    return value ? `${value} ${wordRoot}${endOfWord}` : '';
  };

  const prepareSequentialOutput = (): string => {
    const firstValueOutput = getOutput(0, list[0].value);
    const secondValueOutput = getOutput(1, list[1].value);
    const thirdValueOutput = getOutput(2, list[2].value);

    const totalOutput: string[] = [];
    if (firstValueOutput) totalOutput.push(firstValueOutput);
    if (secondValueOutput) totalOutput.push(secondValueOutput);
    if (thirdValueOutput) totalOutput.push(thirdValueOutput);

    return String(totalOutput).replace(/,/g, ', ');
  };

  const prepareTwoAndOneOutput = (): string => {
    const sumOfFistTwo = list[0].value + list[1].value;
    const firstAndSecondOutput = getOutput(0, sumOfFistTwo);
    const thirdOutput = getOutput(1, list[2].value);

    const totalOutput = [];
    if (firstAndSecondOutput) totalOutput.push(firstAndSecondOutput);
    if (thirdOutput) totalOutput.push(thirdOutput);

    return String(totalOutput).replace(/,/g, ', ');
  };

  const prepareSumOutput = (): string => {
    return getOutput(0, calculateSumValue());
  };

  const prepareOutputValue = (): string => {
    const totalValue = calculateSumValue();
    if (totalValue === 0) return `${template.default}`;

    switch (output.type) {
      case 'twoAndOne':
        return prepareTwoAndOneOutput();
      case 'sequential':
        return prepareSequentialOutput();
      default:
        return prepareSumOutput();
    }
  };

  return (
    <div
      className={styles.roomDropdownInput}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <Input isReadOnly parentValue={prepareOutputValue()} isOpen={!closed}/>
      <span className={styles.roomDropdownInput__iconWrapper}>
        <FiChevronDown
          className={cn(styles.roomDropdownInput__icon, {
            [styles.roomDropdownInput__icon_active]: !closed,
          })}
          size="20px"
        />
      </span>
    </div>
  );
};

export { DropdownInput };
