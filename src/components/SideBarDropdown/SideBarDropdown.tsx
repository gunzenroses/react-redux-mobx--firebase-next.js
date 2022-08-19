import { FC, useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';

import { SideBar } from 'components/SideBar/SideBar';

import styles from './SideBarDropdown.module.scss';

type Props = {
  freeDays: FreeDays;
  guests: Guests;
};

const SideBarDropdown: FC<Props> = ({ freeDays, guests }) => {
  const [hidden, setHidden] = useState(true);
  const sidebar = useRef(null);
  const { t } = useTranslation('room-search');

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
        {t('filter')}
        {hidden ? <FiChevronDown /> : <FiChevronUp />}
      </span>
      {!hidden && (
        <div className={styles.SideBarDropdown__content}>
          <SideBar freeDays={freeDays} guests={guests} />
        </div>
      )}
    </div>
  );
};

export { SideBarDropdown };
