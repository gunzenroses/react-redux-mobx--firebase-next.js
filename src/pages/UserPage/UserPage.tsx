import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useMobxAuth, useMobxStore } from 'hooks/hooks';
import {
  BookedRoomCard,
  Button,
  Pagination,
  UserPersonalForm,
  UserPhoto,
} from 'components';
import { paginationControl } from 'utils/paginationControl';

import styles from './UserPage.module.scss';

const UserPage = observer(() => {

  const [page, setPage] = useState(1);
  const roomsCounter = 4;
  const { bookingStore, userStore } = useMobxStore();
  const rooms = bookingStore.bookings;
  const currentRooms = paginationControl({
    rooms,
    currentPage: page,
    roomsCounter,
  }) as BookingData[];

  const personalData = useMobxAuth();

  const handleLogoutButtonClick = () => {
    userStore.removeUser();
  };

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (personalData.id !== '') {
      userStore.getUser(personalData.id);
      bookingStore.getBooking(personalData.id)
    }
  }, [userStore, personalData.id, bookingStore, page]);

  return (
    <main className={styles.userPage}>
      <div className={styles.userPage__content}>
        <h1 className={styles.userPage__title}>
          Приветсвуем ваc, {personalData.name} {personalData.surname} !
        </h1>
        <div className={styles.userPage__dataWrapper}>
          <UserPhoto />
          <div className={styles.userPage__personalData}>
            <UserPersonalForm personalData={personalData}/>
            <div className={styles.userPage__logoutButton}>
              <Button
                type="signIn"
                href="/sign-in"
                onClick={handleLogoutButtonClick}
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.userPage__roomsWrapper}>
          <h2 className={styles.userPage__subTitle}>
            Арендованные вами номера:
          </h2>
          {rooms.length === 0 ? (
            <h3 className={[
                styles.userPage__subTitle,
                styles.userPage__subTitle_type_description,
            ].join(' ')}>
              У вас нет арендованных номеров
            </h3>
          ) : (
            <>
              <div className={styles.userPage__rooms}>
                {currentRooms.map((data, key) => {
                  return (
                    <BookedRoomCard
                      data={data}
                      id={String(key)}
                      key={String(key)}
                    />
                  );
                })}
              </div>
              {rooms.length / roomsCounter > 1 && <Pagination
                  page={page}
                  onChange={handlePaginationChange}
                  itemsPerPage={roomsCounter}
                  itemsCount={rooms.length}
              />}
            </>
          )}
        </div>
      </div>
    </main>
  );
});

export { UserPage };
