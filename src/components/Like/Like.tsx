import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import cn from 'classnames';

import styles from './Like.module.scss';

type Props = {
  likes: number;
  isPressed?: boolean;
  onClick: () => void;
};

const Like: FC<Props> = ({ likes, isPressed = false, onClick }) => {
  return (
    <div
      tabIndex={0}
      onKeyDown={onClick}
      role="button"
      onClick={onClick}
      className={cn(styles.like, {
        [styles.like_active]: isPressed,
      })}
    >
      {isPressed ? (
        <AiFillHeart className={styles.like__icon} />
      ) : (
        <AiOutlineHeart className={styles.like__icon} />
      )}
      <p className={styles.like__count}>{likes}</p>
    </div>
  );
};

export { Like };
