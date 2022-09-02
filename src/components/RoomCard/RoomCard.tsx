import { Carousel } from 'react-responsive-carousel';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { ending } from '../../utils/ending';
import styles from './RoomCard.module.scss';
import { RoomCardRating } from './RoomCardRating/RoomCardRating';
import { defaultImages } from './constants';

const RoomCard: FC<RoomCardData> = ({
  roomId = 1,
  imgSrc = defaultImages,
  type = '',
  number = 228,
  price = 1337,
  costRange = 'в сутки',
  reviewsAmount = 42,
  rating = 5,
}) => {
  return (
    <div className={styles.roomCard}>
      <div className={styles.roomCard__top}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          preventMovementUntilSwipeScrollTolerance
        >
          {imgSrc.map((path, key) => {
            return (
              <div key={String(key)}>
                <img alt="room" src={path} />
              </div>
            );
          })}
        </Carousel>
      </div>
      <Link
        to={`/room-details/${roomId}`}
        className={styles.roomCard__roomLink}
      >
        <div className={styles.roomCard__content}>
          <ul className={styles.roomCard__list}>
            <li className={styles.roomCard__listItem}>
              <div className={styles.roomCard__number}>
                <strong>{number}</strong>
                {type && <span className={styles.roomCard__type}>{type}</span>}
              </div>
              <div className={styles.roomCard__price}>
                <strong className={styles.roomCard__priceInner}>
                  {price.toLocaleString()}₽{' '}
                </strong>
                <span className={styles.roomCard__priceDate}>{costRange}</span>
              </div>
            </li>
            <li className={styles.roomCard__listItem}>
              <div className={styles.roomCard__rating}>
                <RoomCardRating rating={rating} />
              </div>
              <div className={styles.roomCard__reviews}>
                <strong className={styles.roomCard__reviewsText}>
                  {reviewsAmount}{' '}
                </strong>
                {ending(reviewsAmount, ['Отзыв', 'Отзыва', 'Отзывов'])}
              </div>
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export { RoomCard };
