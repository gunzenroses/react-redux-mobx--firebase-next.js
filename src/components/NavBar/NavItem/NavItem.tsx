import { FC, useEffect, useRef, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames/bind';

import styles from './NavItem.module.scss';

type Props = {
  title: string;
  to: string;
  content?: { title: string; to: string; }[];
};

const cn = classNames.bind(styles);

const NavItem: FC<Props> = ({
  title,
  to,
  content
}) => {
  const [isOpen, setOpen] = useState(false);

  const button = useRef(null);

  const dropdown = useRef(null);

  const isMatched = useMatch(to);

  useEffect(() => {
    const handlePointerDown = (event: Event): void => {
      const isOnButton = event.composedPath().some((targetParent) => {
        return targetParent === button.current;
      });

      const isInArea = event.composedPath().some((targetParent) => {
        return targetParent === dropdown.current;
      });

      if (!isInArea && !isOnButton) { 
        setOpen(false);
      } else if (isOnButton) {
        setOpen((prevValue) => !prevValue);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return content ? (
    <li
      className={cn({
        navLink: true,
        navLink_type_dropdown: content,
      })}
    >
      <div className={styles.navLink__dropdown} ref={button}>
        <MdExpandMore size="21px" className={styles.navLink__icon} />
        <div
          className={cn({
            navLink__button: true,
            navLink__button_type_active: isMatched,
          })}
          title={title}
        >
          {title}
        </div>
      </div>
      {isOpen && (
        <ul className={styles.navLink__content} ref={dropdown}>
          {content &&
            content.map((item, key) => {
              return (
                <li className={styles.navLink__contentLink} key={String(key)}>
                  <NavLink
                    to={`${to}${item.to}`}
                    className={cn({
                      navLink__button: true,
                      navLink__button_type_active: isMatched,
                    })}
                    title={item.title}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
        </ul>
      )}
    </li>
  ) : (
    <li
      className={cn({
        navLink: true,
        navLink_type_dropdown: content,
      })}
    >
      <NavLink
        to={to}
        className={cn({
          navLink__button: true,
          navLink__button_type_active: isMatched,
        })}
        title={title}
      >
        {title}
      </NavLink>
    </li>
  );
};

export { NavItem };
export type { Props };