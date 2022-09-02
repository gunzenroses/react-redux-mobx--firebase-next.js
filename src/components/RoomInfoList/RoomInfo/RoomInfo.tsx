import { FC } from 'react';

import styles from './RoomInfo.module.scss';

const RoomInfo: FC<Info> = ({
  title = 'lorem ipsum',
  text = 'lorem ipsum dolor sit amet',
  img,
}) => {
  return (
    <div className={styles.roomInfo}>
      <div className={styles.roomInfo__imgWrapper}>
        <img src={img} alt="title" />
      </div>
      <div className={styles.roomInfo__content}>
        <p className={styles.roomInfo__title}>{title}</p>
        <p className={styles.roomInfo__text}>{text}</p>
      </div>
    </div>
  );
};

export { RoomInfo };
