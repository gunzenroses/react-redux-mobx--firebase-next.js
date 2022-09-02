import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { observer } from 'mobx-react-lite';

import { Button, Calendar, ConfigurationDropdown } from 'components';
import { useMobxAuth, useMobxStore } from 'hooks/hooks';
import { getPeriodBetweenDates } from 'utils/days';

import { Calculation } from './Calculation/Calculation';
import styles from './RoomForm.module.scss';

type Props = {
  roomId?: string;
  discount?: number;
  serviceCharge?: number;
  additionalFees?: number;
};

const RoomForm: FC<Props> = observer(
  ({
    roomId = '1',
    discount = 2179,
    serviceCharge = 0,
    additionalFees = 300,
  }) => {
    const { bookingStore, roomInfoStore, filterStore } = useMobxStore();
    const { filters } = filterStore;
    const initialBookingInfo = roomInfoStore.roomInfo.info as RoomInfo;
    const { type, price, number, imgSrc, rating, reviewsAmount } = 
      initialBookingInfo || {};
    const initialDate = filters.freeDays;
    const initialGuests = filters.guests;
    const userId = useMobxAuth().id;

    const [date, setDate] = useState(initialDate);
    const [guests, setGuests] = useState(initialGuests);
    const [totalCost, setTotalCost] = useState(0);
    const status = bookingStore.getStatus();
    const hasDate = date.from !== null || date.to !== null;
    const hasGuests = guests.adults !== 0;
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
      if (roomId) {
        roomInfoStore.getRoomInfo(roomId);
      }
    }, [roomId, roomInfoStore]);

    const handleClosePopup = () => {
      setOpenPopup(false);
      bookingStore.setStatus('idle');
    };

    const handleSetCost = (cost: number) => setTotalCost(cost);

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

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const bookingInfo: BookingData = {
        type, 
        price, 
        number, 
        imgSrc, 
        rating, 
        reviewsAmount,
        date,
        guests,
        totalCost,
      };
      setOpenPopup(true);
      if (userId && hasDate && hasGuests) {
        bookingStore.addBooking({
          id: userId,
          booking: bookingInfo,
        });
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
                <span className={styles.roomForm__headType}>{type}</span>
              )}
            </div>
            <div className={styles.roomForm__headPrice}>
              <strong className={styles.roomForm__headCost}>
                {price?.toLocaleString()}₽{' в сутки'}
              </strong>
            </div>
          </div>
          <div className={styles.roomForm__date}>
            <Calendar mode="twin" onSelectedDate={handleSelectedDays} />
          </div>
          <div className={styles.roomForm__guests}>
            <h3 className={styles.roomForm__guestsTitle}>гости</h3>
            <ConfigurationDropdown onChange={handleGuestsChange} />
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
            <Button type="submit">забронировать</Button>
          </div>
          <Popup
            open={status === 'fulfilled'}
            closeOnDocumentClick
            onClose={handleClosePopup}
          >
            <span className={styles.roomForm__alert}>
              Ваш номер успешно забронирован
            </span>
          </Popup>
          <Popup
            open={userId.length === 0 && openPopup}
            closeOnDocumentClick
            onClose={handleClosePopup}
          >
            <span className={styles.roomForm__alert}>
              Чтобы забронировать номер, нужно зарегистрироваться
            </span>
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
  }
);

export { RoomForm };
