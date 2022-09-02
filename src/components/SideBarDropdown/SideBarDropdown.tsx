import { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { SideBar } from 'components/SideBar/SideBar';

import styles from './SideBarDropdown.module.scss';

const SideBarDropdown = () => {
  const [hidden, setHidden] = useState(true);
  const sidebar = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event: Event): void => {
      const isInArea = event
        .composedPath()
        .some((targetParent) => targetParent === sidebar.current);

      if (!isInArea) setHidden(true);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.SideBarDropdown} ref={sidebar}>
      <span
        className={styles.SideBarDropdown__title}
        onClick={() => setHidden((prevState) => !prevState)}
        onKeyDown={() => setHidden((prevState) => !prevState)}
        role="button"
        tabIndex={0}
      >
        Фильтры для поиска
        {hidden ? <FiChevronDown /> : <FiChevronUp />}
      </span>
      {!hidden && (
        <div className={styles.SideBarDropdown__content}>
          <SideBar />
        </div>
      )}
    </div>
  );
};

export { SideBarDropdown };
