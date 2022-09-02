import { observer } from "mobx-react-lite";
import {useCallback, useEffect, useState} from 'react';

import {
  Calendar,
  CheckboxList,
  CheckboxDropdown,
  ConfigurationDropdown,
  Range,
} from 'components';
import { useMobxStore } from 'hooks/hooks';

import styles from './SideBar.module.scss';

const SideBar = observer(() => {
  const { filterStore } = useMobxStore()
  const { filters } = filterStore;
  const [additionalFacilities, setAdditionalFacilities] = useState(
    filters.additionalFacilities
  );
  const [rules, setRules] = useState(filters.rules);
  const [accessibility, setAccessibility] = useState(filters.accessibility);

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
    filterStore.updateAccessibility(item);
  };

  const onExtrasInputChange = (item: { [itemId: string]: boolean }): void => {
    filterStore.updateAdditionalFacilities(item);
  };

  const onSelectedDaysChange = useCallback((date: Date[]) => {
    const selectedDates = {
      from: date[0] ? date[0].toISOString() : null,
      to: date[1] ? date[1].toISOString() : null,
    };
    filterStore.updateFreeDays(selectedDates);
  }, [filterStore]);

  const onGuestsChange = (content: any) => {
    filterStore.updateGuests(content);
  };

  const onRoomAmenitiesChange = (content: any) => {
    filterStore.updateRoomAmenities(content);
  };

  const onRangeChange = (value: number[]): void => {
    const newPrice = {
      from: value[0],
      to: value[1],
    };
    filterStore.updatePrice(newPrice);
  };

  const onRulesInputChange = (item: { [itemId: string]: boolean }): void => {
    filterStore.updateRules(item);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__calendar}>
        <Calendar mode="single" onSelectedDate={onSelectedDaysChange} />
      </div>
      <div className={styles.sidebar__guests}>
        <ConfigurationDropdown
          title="гости"
          type="twoAndOne"
          onChange={onGuestsChange}
        />
      </div>
      <div className={styles.sidebar__range}>
        <Range onChange={onRangeChange} />
      </div>
      <div className={styles.sidebar__rules}>
        <p className={styles.sidebar__subTitle}>правила дома</p>
        <div className={styles.sidebar__rulesContainer}>
          <CheckboxList
            items={rules}
            type="rules"
            onChange={onRulesInputChange}
          />
        </div>
      </div>
      <div className={styles.sidebar__accessibility}>
        <p className={styles.sidebar__subTitle}>доступность</p>
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
          title="удобства номера"
          template="rooms"
          type="sequential"
          onChange={onRoomAmenitiesChange}
        />
      </div>
      <div className={styles.sidebar__extras}>
        <CheckboxDropdown
          items={additionalFacilities}
          type="additionalFacilities"
          onChange={onExtrasInputChange}
        />
      </div>
    </div>
  );
});

export { SideBar };
