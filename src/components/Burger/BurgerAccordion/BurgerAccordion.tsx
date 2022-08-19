import { FC, useState } from 'react';
import cn from 'classnames';
import { BsChevronDown } from 'react-icons/bs';

import { BurgerItem, Props as BurgerItemProps } from '../BurgerItem/BurgerItem';
import styles from './BurgerAccordion.module.scss';

type Props = {
  title: string;
  content: BurgerItemProps[];
  to: string;
};

const BurgerAccordion: FC<Props> = ({ title, content, to }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.burgerAccordion}>
      <div
        role="button"
        onClick={handleBurgerClick}
        tabIndex={0}
        onKeyDown={handleBurgerClick}
        className={cn(styles.burgerAccordion__title, {
          [styles.burgerAccordion__title_active]: isOpen,
        })}
      >
        {title}
        <BsChevronDown
          size="21px"
          className={styles.burgerAccordion__titleChevron}
        />
      </div>
      <ul
        className={cn(styles.burgerAccordion__content, {
          [styles.burgerAccordion__content_active]: isOpen,
        })}
      >
        {content.map((item, key) => {
          return (
            <BurgerItem
              title={item.title}
              to={`${to}${item.to}`}
              key={String(key.toFixed())}
            />
          );
        })}
      </ul>
    </div>
  );
};

export { BurgerAccordion };
export type { Props };
