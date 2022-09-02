import { FC, useEffect, useState } from 'react';

import man from 'assets/images/misc/man.png';

import styles from './Comment.module.scss';
import { Like } from '../index';
import { ending } from '../../utils/ending';

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

  const days = (Date.now() - time) / (1000 * 60 * 60 * 24);
  let realTime: string;
  if (days < 1) {
    realTime = 'Сегодня';
  } else {
    const daysRound = Math.floor(days);
    realTime = `${daysRound} ${ending(daysRound, [
      'день',
      'дня',
      'дней',
    ])} назад`;
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

  return (
    <div className={styles.comment}>
      <div className={styles.comment__info}>
        <div className={styles.comment__imgWrapper}>
          <img className={styles.comment__img} src={img} alt="" />
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
