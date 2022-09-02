import { FC, useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import {
  BurgerAccordion,
  Props as AccordionProps,
} from './BurgerAccordion/BurgerAccordion';
import { BurgerItem, Props as BurgerItemProps } from './BurgerItem/BurgerItem';
import styles from './Burger.module.scss';
import { UserMenu } from '../UserMenu/UserMenu';

type Props = {
  items: (BurgerItemProps | AccordionProps)[];
  profileName?: string;
};
const Burger: FC<Props> = ({ items, profileName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const component = useRef(null);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handlePointerDown = (event: Event): void => {
      const isInArea = event
        .composedPath()
        .some((targetParent) => targetParent === component.current);
      if (!isInArea) setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <nav className={styles.burger} ref={component}>
      <GiHamburgerMenu
        className={styles.burger__icon}
        onClick={handleBurgerClick}
      />
      {isOpen && (
        <div className={styles.burger__contentWrapper}>
          <ul className={styles.burger__content}>
            {items.map((item, key) => {
              return 'content' in item ? (
                <BurgerAccordion
                  title={item.title}
                  content={item.content}
                  to={item.to}
                  key={key.toFixed()}
                />
              ) : (
                <BurgerItem
                  title={item.title}
                  to={item.to}
                  key={String(key.toFixed())}
                />
              );
            })}
            <div className={styles.burger__contentButtons}>
              <UserMenu profileName={profileName} inBurger />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export { Burger };
