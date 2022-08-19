import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import man from 'assets/images/misc/man.png';

import styles from './Comment.module.scss';
import { Like } from '../index';

type Props = {
  likes: number;
  text: string;
  time: number;
  name: string;
  isPressed: boolean;
  img?: string;
  isAuth?: boolean;
  id?: number;
  onSetLike?: (id: number) => void;
  onRemoveLike?: (id: number) => void;
};

const Comment: FC<Props> = ({
  likes,
  text,
  time,
  name,
  isPressed,
  img = man,
  isAuth = false,
  id = -1,
  onSetLike,
  onRemoveLike,
}) => {
  const [pressed, setPressed] = useState(isPressed);
  const [like, setLike] = useState(likes);
  const { t } = useTranslation('room-details');

  const days = (Date.now() - time) / (1000 * 60 * 60 * 24);
  let realTime: string;
  if (days < 1) {
    realTime = t('reviews.today');
  } else {
    const daysRound = Math.floor(days);
    realTime = `${daysRound} ${t('reviews.days', { count: daysRound })} ${t(
      'reviews.ago'
    )}`;
  }
  useEffect(() => {
    setPressed(isPressed);
    setLike(likes);
  }, [isPressed, likes]);
  const handleLikeClick = () => {
    if (!isAuth) return;
    if (pressed && onRemoveLike) {
      onRemoveLike(id);
    } else if (onSetLike) {
      onSetLike(id);
    }
  };

  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment__info}>
        <div className={styles.comment__imgWrapper}>
          <Image
            className={styles.comment__img}
            loader={myLoader}
            src={img}
            alt=""
            layout="fill"
          />
        </div>
        <div className={styles.commentInner}>
          <p className={styles.comment__author}>{name}</p>
          <p className={styles.comment__time}>{realTime}</p>
        </div>
      </div>
      <div className={styles.comment__content}>
        <Like likes={like} isPressed={pressed} onClick={handleLikeClick} />
        <p className={styles.comment__text}>{text}</p>
      </div>
    </div>
  );
};

export type { Props };
export { Comment };
