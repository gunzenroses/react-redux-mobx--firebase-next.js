import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import {
  BulletList,
  RoomGallery,
  RoomInfoList,
  CommentList,
  RoomForm,
  InfoBlock,
  RoomImpressions,
  TextArea,
  MainLayout,
} from 'components';
import { getComments, getRoomDetails } from 'redux/thunks/roomDetails';
import { wrapper } from 'redux/store';
import { getRoomInfo } from 'redux/thunks/roomInfo';
import { useAppDispatch, useRoomDetails } from 'hooks/hooks';
import { createComment } from 'redux/thunks/createComment';

import styles from './RoomDetailsPage.module.scss';

type Props = {
  roomDetails: RoomDetailsType;
  roomInfo: Room;
  roomId: number;
  user: UserType & { isAuth: boolean };
  freeDays: FreeDays;
  guests: Guests;
};

const RoomDetailsPage: FC<Props> = ({
  roomDetails,
  roomInfo,
  roomId,
  user,
  freeDays,
  guests,
}) => {
  const dispatch = useAppDispatch();
  const { rules, info, impressions, isFetching, isRejected } = roomDetails;
  const { comments } = useRoomDetails();
  const { name, surname, isAuth } = user;
  const { great, good, ok, crap } = impressions;
  const [commentsLength, setCommentsLength] = useState(comments.length);
  const { t } = useTranslation('room-details');
  const handleCreateComment = async (value: string) => {
    const defaultImg = `https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/comments%2Fempty.jpg?alt=media&token=292b4734-11d8-4d59-a57f-2df6bfa56291`;
    const newComment = {
      likes: 0,
      isPressed: false,
      time: Date.now(),
      text: value,
      name,
      img: defaultImg,
    };
    await dispatch(createComment({ id: String(roomId), newComment })).then(
      () => {
        setCommentsLength(commentsLength + 1);
      }
    );
    await dispatch(getComments(String(roomId)));
  };
  return (
    <MainLayout
      title={`${t('detailsTitle', { ns: 'common' })}${roomId}`}
      profileName={`${name} ${surname}`}
    >
      <div data-testid="RoomDetails-wrapper" className={styles.content}>
        {!isFetching && !isRejected && (
          <>
            <section className={styles.view}>
              <RoomGallery roomId={roomId} />
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
                    {isAuth && <TextArea onSubmit={handleCreateComment} />}
                  </div>
                  <div className={styles.properties}>
                    <div className={styles.rules}>
                      <BulletList title={t('rules')} textArray={rules} />
                    </div>
                    <div className={styles.cancellation}>
                      <InfoBlock title={t('cancel')} text={t('cancelText')} />
                    </div>
                  </div>
                </div>
                <div className={styles.booking}>
                  <RoomForm
                    data={roomInfo}
                    initialDate={freeDays}
                    initialGuests={guests}
                  />
                </div>
              </div>
            </section>
          </>
        )}
        {isRejected && (
          <div
            data-testid="RoomDetails-reject"
            className={styles.error__container}
          >
            <Link href="/" passHref>
              <a className={styles.error__message} href="replace">
                {t('rejected')}
              </a>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    const roomId = ctx.params?.id;
    await store.dispatch(getRoomDetails(`${roomId}`));
    await store.dispatch(getRoomInfo(`${roomId}`));
    const { roomDetails } = store.getState();
    const roomInfo = store.getState().roomInfo.data;

    const { user } = store.getState();
    const isAuth = !!user.email;
    const { freeDays, guests } = store.getState().searchFilters;

    let locale = null;
    if (ctx.locale) {
      locale = await serverSideTranslations(ctx.locale);
    }

    return {
      props: {
        roomDetails,
        roomInfo,
        roomId,
        isAuth,
        user: { ...user, isAuth },
        freeDays,
        guests,
        ...locale,
      },
    };
  });

export default RoomDetailsPage;
