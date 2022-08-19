import { FC } from 'react';
import cn from 'classnames';

import styles from './RoomCardRating.module.scss';

type Props = {
  rating: number;
};

const RoomCardRating: FC<Props> = ({ rating }) => {
  return (
    <div className={styles.roomCardRating}>
      <div className={styles.roomCardRating__inner}>
        {[...Array(5)].map((star, index) => {
          return (
            <span
              key={String(index + 1)}
              className={cn(styles.roomCardRating__star, {
                [styles.roomCardRating__star_active]: index < rating,
              })}
            />
          );
        })}
      </div>
    </div>
  );
};

export { RoomCardRating };
