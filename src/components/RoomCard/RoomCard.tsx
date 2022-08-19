import { Carousel } from 'react-responsive-carousel';
import { FC } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import styles from './RoomCard.module.scss';
import { RoomCardRating } from './RoomCardRating/RoomCardRating';
import { defaultImages } from './constants';

type Props = {
  id?: number;
  imgSrc?: string[];
  type?: string;
  number?: number;
  price?: number;
  costRange?: string;
  reviewsAmount?: number;
  rating?: number;
};

const RoomCard: FC<Props> = ({
  id = 1,
  imgSrc = defaultImages,
  type = '',
  number = 228,
  price = 1337,
  costRange = 'perDay',
  reviewsAmount = 42,
  rating = 5,
}) => {
  const myLoader = ({ src }: { src: string }) => {
    return `https:/firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-${src}?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e`;
  };
  const { t } = useTranslation('room-card');

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
              <div key={String(key.toFixed())}>
                <Image
                  loader={myLoader}
                  src={`${id}.jpg`}
                  alt="room"
                  height={152}
                  width={270}
                  layout="fixed"
                  priority
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <Link href={`/room-details/${id}`}>
        <a className={styles.roomCard__roomLink}>
          <div className={styles.roomCard__content}>
            <ul className={styles.roomCard__list}>
              <li className={styles.roomCard__listItem}>
                <div className={styles.roomCard__number}>
                  <strong>{number}</strong>
                  {type && (
                    <span className={styles.roomCard__type}>{t('luxury')}</span>
                  )}
                </div>
                <div className={styles.roomCard__price}>
                  <strong className={styles.roomCard__priceInner}>
                    {price.toLocaleString()}₽{' '}
                  </strong>
                  <span className={styles.roomCard__priceDate}>
                    {t(costRange)}
                  </span>
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
                  {t('reviews', { count: reviewsAmount })}
                </div>
              </li>
            </ul>
          </div>
        </a>
      </Link>
    </div>
  );
};

export { RoomCard };
export type { Props as RoomCardProps };
