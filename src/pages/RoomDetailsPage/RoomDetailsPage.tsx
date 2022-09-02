import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';

import {
  BulletList,
  RoomGallery,
  RoomInfoList,
  CommentList,
  RoomForm,
  InfoBlock,
  RoomImpressions,
  TextArea,
} from 'components';
import { useMobxStore, useMobxAuth } from 'hooks/hooks';

import { cancellationPolicy } from './constants';
import styles from './RoomDetailsPage.module.scss';

const RoomDetailsPage = observer(() => {
    
    const { roomId } = useParams();
    const { isAuth, name, surname } = useMobxAuth();
    const { roomDetailsStore } = useMobxStore();
    const { rules, comments, info, impressions, isFetching, isRejected } =
      roomDetailsStore.roomDetailsState;
    const { great, good, ok, crap } = impressions;
    const fullName = `${name} ${surname}`;
    const isCommentedBefore =
        comments.find((item) => item.name === fullName) !== undefined;

    const [commentsLength, setCommentsLength] = useState(comments.length);

    useEffect(() => {
      if (roomId) {
        roomDetailsStore.getRoomDetails(roomId);
      }
    }, [roomId, roomDetailsStore, commentsLength]);

    const handleCreateComment = (value: string) => {
      const defaultImg = `https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/comments%2Fempty.jpg?alt=media&token=292b4734-11d8-4d59-a57f-2df6bfa56291`;
      const newComment = {
        likes: 0,
        isPressed: false,
        time: Date.now(),
        text: value,
        name: `${name} ${surname}`,
        img: defaultImg,
      };
      if (!isCommentedBefore && roomId) {
        roomDetailsStore
          .createComment({ id: String(roomId), newComment })
          .then(() => {
            setCommentsLength(commentsLength + 1);
          });
      }
    };

    return (
      <main className={styles.content}>
        {isFetching && <AiOutlineLoading3Quarters className={styles.loader} />}
        {!isFetching && !isRejected && (
          <>
            <section className={styles.view}>
              <RoomGallery />
            </section>
            <section className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.description}>
                  <div className={styles.roomData}>
                    <RoomInfoList data={info} />
                    <div className={styles.roomImpression}>
                      <RoomImpressions
                        great={great}
                        good={good}
                        ok={ok}
                        crap={crap}
                      />
                    </div>
                  </div>
                  <div className={styles.reviews}>
                    <CommentList
                      roomId={String(roomId)}
                      isAuth={isAuth}
                      items={comments}
                    />
                  </div>
                  {
                    isAuth 
                    && !isCommentedBefore 
                    && (
                      <TextArea onSubmit={handleCreateComment} />
                      )
                  }
                  <div className={styles.properties}>
                    <div className={styles.rules}>
                      <BulletList textArray={rules} />
                    </div>
                    <div className={styles.cancellation}>
                      <InfoBlock text={cancellationPolicy} />
                    </div>
                  </div>
                </div>
                <div className={styles.booking}>
                  <RoomForm roomId={roomId} />
                </div>
              </div>
            </section>
          </>
        )}
        {isRejected && (
          <div className={styles.error__container}>
            <NavLink to="/" className={styles.error__message}>
              Упс! Что-то пошло не так. В нашем отеле нет данных о таком номере,
              попробуйте выбрать из имеющихся в наличии
            </NavLink>
          </div>
        )}
      </main>
    );
  }
);

export { RoomDetailsPage };
