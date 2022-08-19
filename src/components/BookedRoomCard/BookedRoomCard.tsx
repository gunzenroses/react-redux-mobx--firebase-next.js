import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { TextButton } from 'components';
import { timeOptions } from 'utils/timeOptions';

import { RoomCard } from '../RoomCard/RoomCard';
import styles from './BookedRoomCard.module.scss';

type Props = {
  data: BookingData;
  userId: string;
  onClick?: (userId: string, data: BookingData) => void;
};

const BookedRoomCard: FC<Props> = ({ data, userId, onClick }) => {
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

  const { t } = useTranslation('room-card');
  const { locale } = useRouter();

  return (
    <div className={styles.container} data-testid="booked-card">
      <RoomCard
        rating={rating}
        reviewsAmount={reviewsAmount}
        price={price}
        imgSrc={imgSrc}
        number={number}
        type={type}
        id={data.id}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{t('bookingInfo')}:</h3>
        <p className={styles.text}>
          <span>{t('arrived')}: </span>
          {date.from &&
            new Date(date.from).toLocaleString(locale || [], timeOptions)}
        </p>
        <p className={styles.text}>
          <span>{t('departure')}: </span>{' '}
          {date.to &&
            new Date(date.to).toLocaleString(locale || [], timeOptions)}
        </p>
        <p className={styles.text}>
          <span>{t('adults')}: </span> {adults}
        </p>
        {kids > 0 && (
          <p className={styles.text}>
            <span>{t('kids')}: </span> {kids}
          </p>
        )}
        {baby > 0 && (
          <p className={styles.text}>
            <span>{t('babies')}: </span> {baby}
          </p>
        )}
        <p className={styles.text}>
          <span>{t('cost')}: </span> {totalCost.toLocaleString()}₽
        </p>
        <div className={styles.cancelButton}>
          <TextButton
            text={t('cancel')}
            onClick={() => onClick && onClick(userId, data)}
          />
        </div>
      </div>
    </div>
  );
};

export { BookedRoomCard };
