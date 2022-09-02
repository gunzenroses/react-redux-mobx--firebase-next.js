import { FC, useEffect, useMemo, useState } from 'react';

import { Comment, Pagination } from 'components';
import { ending } from 'utils/ending';
import { useMobxAuth, useMobxStore } from 'hooks/hooks';
import { roomDetailsStore } from 'mobx/stores/roomDetailsStore';

import styles from './CommentList.module.scss';

type Props = {
  title?: string;
  amount?: number;
  items?: CommentType[] | null;
  isAuth?: boolean;
  roomId?: string;
};

const CommentList: FC<Props> = ({
  title = 'Отзывы посетителей номера',
  amount = 2,
  items = null,
  isAuth = false,
  roomId = '',
}) => {

  const { userStore } = useMobxStore();
  const itemsLength = items ? items.length : 0;
  const hasComments = items && items.length > 1;
  const itemsOnPage = amount;
  const withPagination = itemsLength > itemsOnPage;
  const [currentPage, setCurrentPage] = useState(1);
  const initialComments = items && items.slice(0, itemsOnPage);

  const { id, likes } = useMobxAuth();

  const liked = useMemo(
    () =>
      likes.filter((item: { room: string }) => {
        return item.room === String(roomId);
      }),
    [likes, roomId]
  );

  const [currentComments, setCurrentComments] = useState(initialComments);
  const [likedCurrentUser, setLikedCurrentUser] = useState([-1]);
  const handlePaginationChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsOnPage;
    const end = currentPage * itemsOnPage;
    const likedCurr =
      liked.length > 0
        ? liked[0].comments
            ?.filter((item) => {
              return item < end && item >= start;
            })
            .map((item) => {
              return item % 2;
            })
        : [];
    setLikedCurrentUser(likedCurr);
    const listOfComments = items && items.slice(start, end);
    setCurrentComments(listOfComments);
  }, [currentPage, items, itemsOnPage, liked]);

  const handleLike = (commentId: number) => {
    const start = (currentPage - 1) * itemsOnPage;
    const realCommentId = start + commentId;
    userStore.setLike({ roomId, commentId: realCommentId, uid: id });
    if (items) {
      const comments = items.map((item, i) => {
        if (i === realCommentId) {
          return { ...item, likes: item.likes + 1 };
        }
        return item;
      });
      roomDetailsStore.setComments(comments);
    }
    const newLikes = likes.map((item) => {
      if (item.room === roomId) {
        return { ...item, comments: [...item.comments, realCommentId] };
      }
      return item;
    });
    userStore.changeUserLikes(newLikes);
  };

  const handleDislike = (commentId: number) => {
    const start = (currentPage - 1) * itemsOnPage;
    const realCommentId = start + commentId;
    userStore.removeLike({ roomId, commentId: realCommentId, uid: id });
    if (items) {
      const comments = items.map((item, i) => {
        if (i === realCommentId) {
          return { ...item, likes: item.likes - 1 };
        }
        return item;
      });
      roomDetailsStore.setComments(comments);
    }
    const newLikes = likes.map((item) => {
      if (item.room === roomId) {
        return {
          ...item,
          comments: item.comments.filter((i) => i !== realCommentId),
        };
      }
      return item;
    });
    userStore.changeUserLikes(newLikes);
  };

  return (
    <section className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      {withPagination && (
        <div className={styles.pagination}>
          <Pagination
            page={currentPage}
            itemsPerPage={itemsOnPage}
            itemsCount={itemsLength}
            withText={false}
            onChange={handlePaginationChange}
          />
        </div>
      )}
      {hasComments && (
        <span className={styles.reviews}>{`${itemsLength} ${ending(
          itemsLength,
          ['oтзыв', 'oтзыва', 'oтзывов']
        )}`}</span>
      )}
      <div className={styles.comment}>
        {!hasComments && (
          <div className={styles.text}>
            Будьте первым, кто оставит свой отзыв!
          </div>
        )}
        {hasComments &&
          currentComments &&
          currentComments.map(
            ({ likes: likesCurr, text, time, name, img, isPressed }, key) => {
              return (
                <Comment
                  key={String(key)}
                  id={key}
                  text={text}
                  likes={likesCurr}
                  name={name}
                  img={img}
                  isPressed={likedCurrentUser.includes(key)}
                  time={Number(time)}
                  isAuth={isAuth}
                  onSetLike={handleLike}
                  onRemoveLike={handleDislike}
                />
              );
            }
          )}
      </div>
    </section>
  );
};

export { CommentList };
