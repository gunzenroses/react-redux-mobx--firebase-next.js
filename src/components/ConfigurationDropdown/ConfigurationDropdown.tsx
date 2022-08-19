import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { TextButton } from 'components';
import { useAppDispatch } from 'hooks/hooks';
import { updateGuests } from 'redux/slices/searchFiltersSlice';

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
  initialContent?: Guests | RoomAmenities;
  onChange?: (content: Content) => void;
};

const ConfigurationDropdown: FC<Props> = ({
  template = 'guests',
  type = template === 'rooms' ? 'sequential' : 'sum',
  hidden: hiddenProp = true,
  minValue = 0,
  maxValue = 5,
  title = null,
  initialContent,
  onChange = () => {},
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('dropdown');
  const getInitialList = () => {
    const result =
      typeof template !== 'object'
        ? dropdownData[template].list
        : template.list;
    if (initialContent) {
      return result.map((item) => {
        item.value =
          initialContent[item.id as keyof Guests & keyof RoomAmenities];
        return item;
      });
    }
    return result;
  };

  const initialList = getInitialList();
  const pickContent = (list: ListItemsProps[]): Guests | RoomAmenities => {
    return list.reduce((acc: any, { value, id }) => {
      acc[id] = value;
      return acc;
    }, {});
  };

  const checkIsNotZeroValues = (newList: ListItemsProps[]): boolean => {
    return newList.some(({ value }) => value > minValue);
  };

  const [itemList, setItemList] = useState(initialList);
  const [hidden, setHidden] = useState(hiddenProp);
  const [isZeroValues, setIsZeroValues] = useState(
    checkIsNotZeroValues(itemList)
  );

  const dropdown = useRef(null);

  const changeValue = (value: number, isIncrease: boolean): number => {
    const newValue = isIncrease ? value + 1 : value - 1;

    if (newValue > maxValue) return maxValue;
    if (newValue < minValue) return minValue;
    return newValue;
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
    setIsZeroValues(!checkIsNotZeroValues(fixedList));
  };

  const handleInputClick = (): void => {
    setHidden((prevState) => !prevState);
  };

  const handleSubmitButtonClick = (): void => {
    onChange(pickContent(itemList));
    setHidden(true);
  };

  const handleClearButtonClick = (): void => {
    const newValue = itemList.map((item) => {
      return { ...item, value: minValue };
    });
    setItemList(newValue);
    onChange(pickContent(itemList));
    setIsZeroValues(true);
  };

  useEffect(() => {
    if (template === 'guests')
      dispatch(
        updateGuests({
          adults: itemList[0].value,
          kids: itemList[1].value,
          baby: itemList[2].value,
        })
      );
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
  }, [dispatch, itemList, template]);

  return (
    <div className={styles.roomDropdown} ref={dropdown}>
      {title && <p className={styles.roomDropdown__title}>{t(title)}</p>}
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
              <TextButton
                text={t('btnClear')}
                onClick={handleClearButtonClick}
              />
            )}
            <TextButton
              text={t('btnApply')}
              onClick={handleSubmitButtonClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { ConfigurationDropdown };
