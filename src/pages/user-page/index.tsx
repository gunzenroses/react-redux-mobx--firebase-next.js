import { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAppDispatch } from 'hooks/hooks';
import {
  BookedRoomCard,
  Button,
  MainLayout,
  Pagination,
  UserPersonalForm,
  UserPhoto,
} from 'components';
import { removeUser } from 'redux/slices/userSlice';
import { getBookingInfo, removeBookingInfo } from 'redux/thunks/booking';
import { paginationControl } from 'utils/paginationControl';
import { wrapper } from 'redux/store';

import styles from './UserPage.module.scss';

type Props = {
  rooms: BookingData[];
  personalData: UserType;
  profileName: string;
};

const UserPage: FC<Props> = ({ rooms, personalData, profileName }) => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation('user-page');
  const [roomList, setRoomList] = useState(rooms);
  const roomsCounter = 4;
  const currentRooms = paginationControl({
    rooms: roomList,
    currentPage: page,
    roomsCounter,
  }) as BookingData[];

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogoutButtonClick = () => {
    dispatch(removeUser());
    router.push('./sign-in');
  };

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCancelButtonClick = (userId: string, data: BookingData) => {
    dispatch(removeBookingInfo({ id: userId, data }));
    setRoomList(roomList.filter((room) => room !== data));
  };

  return (
    <MainLayout
      title={t('userTitle', { ns: 'common' })}
      profileName={profileName}
    >
      <div className={styles.userPage}>
        <div className={styles.userPage__content}>
          <h1 className={styles.userPage__title}>
            {t('hello')} {personalData.name} {personalData.surname} !
          </h1>
          <div className={styles.userPage__dataWrapper}>
            <UserPhoto />
            <div className={styles.userPage__personalData}>
              <UserPersonalForm personalData={personalData} />
              <div className={styles.userPage__logoutButton}>
                <Button type="signIn" onClick={handleLogoutButtonClick}>
                  {t('exit')}
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.userPage__roomsWrapper}>
            <h2 className={styles.userPage__subTitle}>{t('bookedRooms')}</h2>
            {currentRooms.length === 0 ? (
              <h3
                className={[
                  styles.userPage__subTitle,
                  styles.userPage__subTitle_type_description,
                ].join(' ')}
              >
                {t('noRooms')}
              </h3>
            ) : (
              <>
                <div className={styles.userPage__rooms}>
                  {currentRooms.map((data, key) => {
                    return (
                      <BookedRoomCard
                        data={data}
                        userId={personalData.id}
                        key={String(key.toFixed())}
                        onClick={handleCancelButtonClick}
                      />
                    );
                  })}
                </div>
                {rooms.length / roomsCounter > 1 && (
                  <Pagination
                    page={page}
                    onChange={handlePaginationChange}
                    itemsPerPage={roomsCounter}
                    itemsCount={rooms.length}
                  />
                )}
              </>
            )}
          </div>
        </div>
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

    const personalData = store.getState().user;
    const { id, name, surname } = personalData;

    await store.dispatch(getBookingInfo(id));

    const rooms = store.getState().booking.data;

    let locale = null;
    if (ctx.locale) {
      locale = await serverSideTranslations(ctx.locale);
    }

    return {
      props: {
        rooms,
        personalData,
        profileName: `${name} ${surname}`,
        ...locale,
      },
    };
  });

export default UserPage;
