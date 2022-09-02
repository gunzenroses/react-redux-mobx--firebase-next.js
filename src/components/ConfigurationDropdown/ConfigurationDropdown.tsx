import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { TextButton } from 'components';
import { useMobxStore } from 'hooks/hooks';

import { Props as ListItemsProps, ListItem } from './ListItem/ListItem';
import {
  dropdownData,
  TemplateConfiguration,
} from './DropdownInput/DropdownInputData';
import { DropdownInput } from './DropdownInput/DropdownInput';
import styles from './ConfigurationDropdown.module.scss';

type Props = {
  template?: 'rooms' | 'guests' | TemplateConfiguration;
  type?: 'sum' | 'twoAndOne' | 'sequential';
  hidden?: boolean;
  minValue?: number;
  maxValue?: number;
  title?: string;
  onChange?: (content: Content) => void;
};

const ConfigurationDropdown: FC<Props> = ({
  template = 'guests',
  type = template === 'rooms' ? 'sequential' : 'sum',
  hidden: hiddenProp = true,
  minValue = 0,
  maxValue = 5,
  title = null,
  onChange = () => {},
}) => {
  const { filterStore } = useMobxStore();
  const initialList =
    typeof template !== 'object' ? dropdownData[template].list : template.list;

  const pickContent = (list: ListItemsProps[]): Content => {
    return list.reduce((acc: any, { value, id }) => {
      acc[id] = value;
      return acc;
    }, {});
  };

  const [content, setContent] = useState(pickContent(initialList));
  const [itemList, setItemList] = useState(initialList);
  const [hidden, setHidden] = useState(hiddenProp);
  const [isZeroValues, setIsZeroValues] = useState(() => {
    return !itemList.some(({ value }) => value > minValue);
  });

  const dropdown = useRef(null);

  const changeValue = (value: number, isIncrease: boolean): number => {
    const newValue = isIncrease ? value + 1 : value - 1;

    if (newValue > maxValue) return maxValue;
    if (newValue < minValue) return minValue;
    return newValue;
  };

  const checkIsNotZeroValues = (newList: ListItemsProps[]): boolean => {
    return newList.some(({ value }) => value > minValue);
  };

  const fixGuestsValues = (list: ListItemsProps[]): ListItemsProps[] => {
    return list.map((item) => {
      return list[0].value === 0 ? { ...item, value: 0 } : item;
    });
  };

  const handleCalcButtonClick = (
    listKey: string,
    isIncrease: boolean
  ): void => {
    const newList = itemList.map((item) => {
      return item.id === listKey
        ? { ...item, value: changeValue(item.value, isIncrease) }
        : item;
    });
    const fixedList =
      template === 'guests' ? fixGuestsValues(newList) : newList;
    setItemList(fixedList);
    setContent(pickContent(fixedList));
    setIsZeroValues(!checkIsNotZeroValues(fixedList));
  };

  const handleInputClick = (): void => {
    setHidden((prevState) => !prevState);
  };

  const handleSubmitButtonClick = (): void => {
    onChange(content);
    setHidden(true);
  };

  const handleClearButtonClick = (): void => {
    const newValue = itemList.map((item) => {
      return { ...item, value: minValue };
    });
    setItemList(newValue);
    setContent(pickContent(newValue));
    setIsZeroValues(true);
  };

  useEffect(() => {
    if (template === 'guests')
      filterStore.updateGuests({
        adults: itemList[0].value,
        kids: itemList[1].value,
        baby: itemList[2].value,
      });

    const handleDocumentClick = (event: Event): void => {
      const isInDropdownArea = event
        .composedPath()
        .some((targetParent) => targetParent === dropdown.current);

      if (!isInDropdownArea) setHidden(true);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [filterStore, itemList, template]);

  return (
    <div className={styles.roomDropdown} ref={dropdown}>
      {title && <p className={styles.roomDropdown__title}>{title}</p>}
      <DropdownInput
        closed={hidden}
        onClick={handleInputClick}
        output={{
          type,
          template,
        }}
        list={itemList}
      />
      {!hidden && (
        <div className={styles.roomDropdown__control}>
          <ul className={styles.roomDropdown__list}>
            {itemList.map(({ id, value, text }, index) => {
              const isChangesForbidden =
                template === 'guests' && itemList[0].value === 0 && index > 0;

              return (
                <ListItem
                  key={String(id)}
                  id={id}
                  value={value}
                  text={text}
                  isDisabled={isChangesForbidden}
                  onClick={handleCalcButtonClick}
                  minValue={minValue}
                  maxValue={maxValue}
                />
              );
            })}
          </ul>
          <div
            className={cn(styles.roomDropdown__controlButtons, {
              [styles.roomDropdown__controlButtons_clearButton_hidden]:
                isZeroValues,
            })}
          >
            {!isZeroValues && (
              <TextButton text="очистить" onClick={handleClearButtonClick} />
            )}
            <TextButton text="применить" onClick={handleSubmitButtonClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export { ConfigurationDropdown };
