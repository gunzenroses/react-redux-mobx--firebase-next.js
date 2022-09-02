import { FC } from 'react';

import { Checkbox } from 'components';
import { Props as CheckboxProps } from 'components/Checkbox/Checkbox';

import { accessibilityData, additionalFacilitiesData, rulesData } from './constants';

const CheckboxListData = {
  accessibility: accessibilityData,
  additionalFacilities: additionalFacilitiesData,
  rules: rulesData,
};

type CheckboxListDataType = keyof typeof CheckboxListData | undefined;

type Props = {
  items: {
    [name: string]: boolean;
  };
  data?: CheckboxProps[];
  type?: CheckboxListDataType;
  onChange: (item: { [name: string]: boolean }) => void;
};

const CheckboxList: FC<Props> = ({
  items,
  data,
  type = undefined,
  onChange,
}) => {
  let appliedData;
  if (data) {
    appliedData = data 
  } else if (type) {
    appliedData = CheckboxListData[type]; 
  };

  const itemsKeys = Object.keys(items);
  const newData =
    appliedData &&
    appliedData.map((dataItem) => {
      const matchingKey = itemsKeys.find((itemKey) => {
        return itemKey === dataItem.name;
      });
      const checkedState = matchingKey ? items[matchingKey] : dataItem.checked;
      return {
        ...dataItem,
        checked: checkedState,
      };
    });

  return (
    <>
      {newData &&
        newData.map(({ text, name, checked, titleText, isShort }) => {
          return (
            <Checkbox
              key={name}
              name={name}
              checked={checked}
              text={text}
              titleText={titleText}
              isShort={isShort}
              onChange={onChange}
            />
          );
        })}
    </>
  );
};

export type { CheckboxListDataType };
export { CheckboxList };