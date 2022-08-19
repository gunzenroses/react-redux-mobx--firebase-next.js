import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Comment, Pagination } from 'components';
import { setComments } from 'redux/slices/roomDetailsSlice';
import { useAppDispatch, useAuth } from 'hooks/hooks';
import { removeLike, setLike } from 'redux/thunks/users';
import { changeUserLikes } from 'redux/slices/userSlice';

import styles from './CommentList.module.scss';

type Props = {
  title?: string;
  amount?: number;
  items?: CommentType[] | null;
  isAuth?: boolean;
  roomId?: string;
};

const CommentList: FC<Props> = ({
  title = 'reviews.reviewsTitle',
  amount = 2,
  items = null,
  isAuth = false,
  roomId = '',
}) => {
  const dispatch = useAppDispatch();
  const { likes, id } = useAuth();
  const itemsLength = items ? items.length : 0;
  const hasComments = items && items.length > 1;
  const itemsOnPage = amount;
  const withPagination = itemsLength > itemsOnPage;
  const [currentPage, setCurrentPage] = useState(1);
  const initialComments = items && items.slice(0, itemsOnPage);
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
  const { t } = useTranslation('room-details');

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
    dispatch(setLike({ roomId, commentId: realCommentId, uid: id }));
    if (items) {
      const comments = items.map((item, i) => {
        if (i === realCommentId) {
          return { ...item, likes: item.likes + 1 };
        }
        return item;
      });
      dispatch(setComments({ comments }));
    }
    const newLikes = likes.map((item) => {
      if (item.room === roomId) {
        return { ...item, comments: [...item.comments, realCommentId] };
      }
      return item;
    });
    dispatch(changeUserLikes({ likes: newLikes }));
  };

  const handleDislike = (commentId: number) => {
    const start = (currentPage - 1) * itemsOnPage;
    const realCommentId = start + commentId;
    dispatch(removeLike({ roomId, commentId: realCommentId, uid: id }));
    if (items) {
      const comments = items.map((item, i) => {
        if (i === realCommentId) {
          return { ...item, likes: item.likes - 1 };
        }
        return item;
      });
      dispatch(setComments({ comments }));
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
    dispatch(changeUserLikes({ likes: newLikes }));
  };

  return (
    <section className={styles.content}>
      <h2 className={styles.title}>{t(title)}</h2>
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
        <span className={styles.reviews}>{`${itemsLength} ${t(
          'reviews.review',
          {
            count: itemsLength,
          }
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
                  key={String(key.toFixed())}
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
