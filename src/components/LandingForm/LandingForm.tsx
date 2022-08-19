import { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button, Calendar, ConfigurationDropdown } from 'components';
import { useAppDispatch } from 'hooks/hooks';
import { updateFreeDays, updateGuests } from 'redux/slices/searchFiltersSlice';

import styles from './LandingForm.module.scss';

type Props = {
  freeDays: FreeDays;
  guests: Guests;
};

const LandingForm: FC<Props> = ({ freeDays, guests }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation('landing-form');

  const handleSelectedDaysChange = (date: Date[]) => {
    const selectedDays = {
      from: date[0] ? date[0].toISOString() : null,
      to: date[1] ? date[1].toISOString() : null,
    };
    dispatch(updateFreeDays(selectedDays));
  };

  const handleGuestsChange = (content: any) => {
    dispatch(updateGuests(content));
  };

  const onClick = () => {
    router.push('/room-search');
  };

  return (
    <form className={styles.landingForm} onSubmit={(e) => e.preventDefault()}>
      <p className={styles.landingForm__title}>{t('title')}</p>
      <div className={styles.landingForm__calendarWrapper}>
        <Calendar
          mode="twin"
          onSelectedDate={handleSelectedDaysChange}
          selectedDates={freeDays}
        />
      </div>
      <div className={styles.landingForm__dropdownWrapper}>
        <ConfigurationDropdown
          title="guestsTitle"
          type="twoAndOne"
          onChange={handleGuestsChange}
          initialContent={guests}
        />
      </div>
      <div>
        <Button onClick={onClick} type="submit">
          {t('button')}
        </Button>
      </div>
    </form>
  );
};

export { LandingForm };
