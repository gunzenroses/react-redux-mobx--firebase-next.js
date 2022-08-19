import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  Calendar,
  CheckboxList,
  CheckboxDropdown,
  ConfigurationDropdown,
  Range,
} from 'components';
import {
  selectSearchFilters,
  updateAccessibility,
  updateAdditionalFacilities,
  updateFreeDays,
  updateGuests,
  updatePrice,
  updateRoomAmenities,
  updateRules,
} from 'redux/slices/searchFiltersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

import styles from './SideBar.module.scss';

type Props = {
  freeDays: FreeDays;
  guests: Guests;
};

const SideBar: FC<Props> = ({ freeDays, guests }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectSearchFilters);
  const [additionalFacilities, setAdditionalFacilities] = useState(
    filters.additionalFacilities
  );
  const [rules, setRules] = useState(filters.rules);
  const [accessibility, setAccessibility] = useState(filters.accessibility);
  const { t } = useTranslation('room-search');

  useEffect(() => {
    const newAccessibility = filters.accessibility;
    setAccessibility((prevState) => ({ ...prevState, ...newAccessibility }));
  }, [filters.accessibility]);

  useEffect(() => {
    const newRules = filters.rules;
    setRules((prevState) => ({ ...prevState, ...newRules }));
  }, [filters.rules]);

  useEffect(() => {
    const newAdditionalFacilities = filters.additionalFacilities;
    setAdditionalFacilities((prevState) => ({
      ...prevState,
      ...newAdditionalFacilities,
    }));
  }, [filters.additionalFacilities]);

  const onAccessibilityInputChange = (item: {
    [itemId: string]: boolean;
  }): void => {
    dispatch(updateAccessibility(item));
  };

  const onExtrasInputChange = (item: { [itemId: string]: boolean }): void => {
    dispatch(updateAdditionalFacilities(item));
  };

  const onSelectedDaysChange = useCallback(
    (date: Date[]) => {
      const selectedDates = {
        from: date[0] ? date[0].toISOString() : null,
        to: date[1] ? date[1].toISOString() : null,
      };
      dispatch(updateFreeDays(selectedDates));
    },
    [dispatch]
  );

  const onGuestsChange = (content: Content) => {
    dispatch(updateGuests(content as Guests));
  };

  const onRoomAmenitiesChange = (content: Content) => {
    dispatch(updateRoomAmenities(content as RoomAmenities));
  };

  const onRangeChange = (value: number[]): void => {
    const newPrice = {
      from: value[0],
      to: value[1],
    };
    dispatch(updatePrice(newPrice));
  };

  const onRulesInputChange = (item: { [itemId: string]: boolean }): void => {
    dispatch(updateRules(item));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__calendar}>
        <Calendar
          mode="single"
          onSelectedDate={onSelectedDaysChange}
          selectedDates={freeDays}
        />
      </div>
      <div className={styles.sidebar__guests}>
        <ConfigurationDropdown
          title="guestsTitle"
          type="twoAndOne"
          initialContent={guests}
          onChange={onGuestsChange}
        />
      </div>
      <div className={styles.sidebar__range}>
        <Range onChange={onRangeChange} />
      </div>
      <div className={styles.sidebar__rules}>
        <p className={styles.sidebar__subTitle}>{t('rules')}</p>
        <div className={styles.sidebar__rulesContainer}>
          <CheckboxList
            items={rules}
            type="rules"
            onChange={onRulesInputChange}
          />
        </div>
      </div>
      <div className={styles.sidebar__accessibility}>
        <p className={styles.sidebar__subTitle}>{t('accessability')}</p>
        <div className={styles.sidebar__accessibilityContainer}>
          <CheckboxList
            items={accessibility}
            type="accessibility"
            onChange={onAccessibilityInputChange}
          />
        </div>
      </div>
      <div className={styles.sidebar__roomConfig}>
        <ConfigurationDropdown
          title="amenitiesTitle"
          template="rooms"
          type="sequential"
          onChange={onRoomAmenitiesChange}
        />
      </div>
      <div className={styles.sidebar__extras}>
        <CheckboxDropdown
          titleText={t('additionalAmenities')}
          items={additionalFacilities}
          type="additionalFacilities"
          onChange={onExtrasInputChange}
        />
      </div>
    </div>
  );
};

export { SideBar };
