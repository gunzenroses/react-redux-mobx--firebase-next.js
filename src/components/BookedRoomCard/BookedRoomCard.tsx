import { FC } from 'react';

import { TextButton } from 'components/TextButton/TextButton';
import { RoomCard } from 'components';
import { bookingStore } from 'mobx/stores/bookingStore';
import { toLocalTimeOptions } from 'utils/timeOptions';

import styles from './BookedRoomCard.module.scss';

type Props = { data: BookingData; id: string };

const BookedRoomCard: FC<Props> = ({ data, id }) => {
  const {
    imgSrc,
    type,
    number,
    price,
    reviewsAmount,
    rating,
    date,
    guests,
    totalCost,
  } = data;
  const { adults, baby, kids } = guests;

  const handleCancelButtonClick = () => {
    bookingStore.removeBooking({ id, data });
  };

  return (
    <div className={styles.container}>
      <RoomCard
        rating={rating}
        reviewsAmount={reviewsAmount}
        price={price}
        imgSrc={imgSrc}
        number={number}
        type={type}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>Информация о бронировании:</h3>
        <p className={styles.text}>
          <span>прибытие: </span>
          {date.from ? toLocalTimeOptions(date.from) : ''}
        </p>
        <p className={styles.text}>
          <span>выезд: </span>{' '}
          {date.to ? toLocalTimeOptions(date.to) : ''}
        </p>
        <p className={styles.text}>
          <span>взрослых: </span> {adults}
        </p>
        {kids > 0 && (
          <p className={styles.text}>
            <span>детей: </span> {kids}
          </p>
        )}
        {baby > 0 && (
          <p className={styles.text}>
            <span>младенцев: </span> {baby}
          </p>
        )}
        <p className={styles.text}>
          <span>цена: </span> {totalCost.toLocaleString()}₽
        </p>
        <div className={styles.cancelButton}>
          <TextButton
            text="Отменить бронирование"
            onClick={handleCancelButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export { BookedRoomCard };
