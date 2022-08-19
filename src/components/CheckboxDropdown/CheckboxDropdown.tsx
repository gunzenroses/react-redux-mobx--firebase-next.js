import { FC, useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import {
  CheckboxList,
  CheckboxListDataType,
} from 'components/CheckboxList/CheckboxList';

import styles from './CheckboxDropdown.module.scss';

type Props = {
  items: { [name: string]: boolean };
  type: CheckboxListDataType;
  titleText?: string;
  onChange: (item: { [name: string]: boolean }) => void;
};

const CheckboxDropdown: FC<Props> = ({
  items,
  type,
  titleText = 'Дополнительные удобства',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const listContainer = useRef(null);

  const handleTitleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleDocumentClick = (event: Event): void => {
      const isInArea = event
        .composedPath()
        .some((targetParent) => targetParent === listContainer.current);

      if (!isInArea) setIsOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.CheckboxDropdown} ref={listContainer}>
      <div
        className={styles.CheckboxDropdown__title}
        onClick={handleTitleClick}
        onKeyDown={handleTitleClick}
        role="button"
        tabIndex={0}
      >
        <span className={styles.CheckboxDropdown__titleText}>{titleText}</span>
        {isOpen ? (
          <FiChevronUp className={styles.CheckboxDropdown__titleIcon} />
        ) : (
          <FiChevronDown className={styles.CheckboxDropdown__titleIcon} />
        )}
      </div>
      {isOpen && (
        <div className={styles.CheckboxDropdown__content}>
          {items && (
            <CheckboxList type={type} items={items} onChange={onChange} />
          )}
        </div>
      )}
    </div>
  );
};

export { CheckboxDropdown };
