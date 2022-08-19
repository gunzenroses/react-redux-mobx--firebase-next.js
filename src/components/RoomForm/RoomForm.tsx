import { FC, FormEvent, useCallback, useState } from 'react';
import Popup from 'reactjs-popup';
import { useTranslation } from 'next-i18next';

import { Button, Calendar, ConfigurationDropdown } from 'components';
import { useAppDispatch, useAuth, useBookingStatus } from 'hooks/hooks';
import { addBookingInfo } from 'redux/thunks/booking';
import { getPeriodBetweenDates } from 'utils/days';
import { setBookingStatus } from 'redux/slices/bookingSlice';

import { Calculation } from './Calculation/Calculation';
import styles from './RoomForm.module.scss';

type Props = {
  data: RoomCardType;
  discount?: number;
  serviceCharge?: number;
  additionalFees?: number;
  initialDate: FreeDays;
  initialGuests: Guests;
};

const RoomForm: FC<Props> = ({
  data,
  discount = 2179,
  serviceCharge = 0,
  additionalFees = 300,
  initialDate,
  initialGuests,
}) => {
  const dispatch = useAppDispatch();
  const { type, price, number } = data;
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState(initialGuests);
  const [totalCost, setTotalCost] = useState(0);
  const hasDate = date.from !== null || date.to !== null;
  const hasGuests = guests.adults !== 0;
  const [openPopup, setOpenPopup] = useState(false);
  const status = useBookingStatus();
  const { t } = useTranslation('room-form');

  const userId = useAuth().id;
  const handleSelectedDays = useCallback((selectedDates: Date[]) => {
    const selectedDays = {
      from: selectedDates[0] ? selectedDates[0].toISOString() : null,
      to: selectedDates[1] ? selectedDates[1].toISOString() : null,
    };
    setDate(selectedDays);
  }, []);
  const handleGuestsChange = (content: Content) => {
    setGuests(content as Guests);
  };
  const handleSetCost = (cost: number) => setTotalCost(cost);
  const handleClosePopup = () => {
    setOpenPopup(false);
    dispatch(setBookingStatus('idle'));
  };

  const handleSubmit = (e: FormEvent) => {
    setOpenPopup(true);
    e.preventDefault();
    setOpenPopup(true);
    if (userId && hasDate && hasGuests) {
      dispatch(
        addBookingInfo({
          id: userId,
          data: { ...data, guests, date, totalCost },
        })
      );
    }
  };

  return (
    <form className={styles.roomForm} onSubmit={handleSubmit}>
      <div className={styles.roomForm__inner}>
        <div className={styles.roomForm__head}>
          <div className={styles.roomForm__headInfo}>
            <span className={styles.roomForm__headSign}>№</span>
            <span className={styles.roomForm__headNumber}>{number}</span>
            {type && (
              <span className={styles.roomForm__headType}>{t('luxury')}</span>
            )}
          </div>
          <div className={styles.roomForm__headPrice}>
            <strong className={styles.roomForm__headCost}>
              {price.toLocaleString()}₽ {t('perDay')}
            </strong>
          </div>
        </div>
        <div className={styles.roomForm__date}>
          <Calendar
            mode="twin"
            onSelectedDate={handleSelectedDays}
            selectedDates={initialDate}
          />
        </div>
        <div className={styles.roomForm__guests}>
          <ConfigurationDropdown
            title="guests"
            onChange={handleGuestsChange}
            initialContent={initialGuests}
          />
        </div>
        <Calculation
          price={price}
          discount={discount}
          serviceCharge={serviceCharge}
          additionalFees={additionalFees}
          days={getPeriodBetweenDates(date)}
          countCost={handleSetCost}
        />
        <div className={styles.roomForm__button}>
          <Button type="submit">{t('bookBtn')}</Button>
        </div>
        <Popup
          open={status === 'fulfilled'}
          closeOnDocumentClick
          onClose={handleClosePopup}
        >
          <span className={styles.roomForm__alert}>{t('successBook')}</span>
        </Popup>
        <Popup
          open={userId.length === 0 && openPopup}
          closeOnDocumentClick
          onClose={handleClosePopup}
        >
          <span className={styles.roomForm__alert}>{t('rejectBook')}</span>
        </Popup>
        <Popup
          open={userId.length > 0 && openPopup && !hasDate}
          closeOnDocumentClick
          onClose={handleClosePopup}
        >
          <span className={styles.roomForm__alert}>Выберите дату</span>
        </Popup>
        <Popup
          open={userId.length > 0 && openPopup && !hasGuests}
          closeOnDocumentClick
          onClose={handleClosePopup}
        >
          <span className={styles.roomForm__alert}>
            Выберите количество гостей
          </span>
        </Popup>
      </div>
    </form>
  );
};

export { RoomForm };
