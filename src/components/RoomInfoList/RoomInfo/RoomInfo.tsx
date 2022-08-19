import { FC } from 'react';
import Image from 'next/image';

import styles from './RoomInfo.module.scss';

type Props = {
  img: string;
  title?: string;
  text?: string;
};

const RoomInfo: FC<Props> = ({
  title = 'lorem ipsum',
  text = 'lorem ipsum dolor sit amet',
  img,
}) => {
  const myLoader = ({ src }: { src: string }) => {
    return src;
  };
  return (
    <div className={styles.roomInfo}>
      <div className={styles.roomInfo__imgWrapper}>
        <Image loader={myLoader} src={img} alt="title" layout="fill" />
      </div>
      <div className={styles.roomInfo__content}>
        <p className={styles.roomInfo__title}>{title}</p>
        <p className={styles.roomInfo__text}>{text}</p>
      </div>
    </div>
  );
};

export { RoomInfo };
export type { Props };
