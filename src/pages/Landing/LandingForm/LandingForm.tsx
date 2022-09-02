import { useCallback } from "react";
import { observer } from 'mobx-react-lite';

import { useMobxStore } from "hooks/hooks";
import {
  Button,
  Calendar,
  ConfigurationDropdown,
} from 'components';

import styles from './LandingForm.module.scss';

const LandingForm = observer(() => {
  const { filterStore } = useMobxStore()

  const handleSelectedDaysChange = useCallback((date: Date[]) => {
    const selectedDates = {
      from: date[0] ? date[0].toISOString() : null,
      to: date[1] ? date[1].toISOString() : null,
    };
    filterStore.updateFreeDays(selectedDates);
  }, [filterStore]);

  const handleGuestsChange = (content: any) => {
    filterStore.updateGuests(content);
  };

  return (
    <form className={styles.landingForm} action="/room-search">
      <p className={styles.landingForm__title}>
        Найдём номера под ваши пожелания
      </p>
      <div className={styles.landingForm__calendarWrapper}>
        <Calendar mode="twin" onSelectedDate={handleSelectedDaysChange} />
      </div>
      <div className={styles.landingForm__dropdownWrapper}>
        <span className={styles.landingForm__dropdownWrapperText}>гости</span>
        <ConfigurationDropdown type="twoAndOne" onChange={handleGuestsChange} />
      </div>
      <div className={styles.landingForm__submit}>
        <Button type="submit">Подобрать номер</Button>
      </div>
    </form>
  );
});

export default LandingForm;
