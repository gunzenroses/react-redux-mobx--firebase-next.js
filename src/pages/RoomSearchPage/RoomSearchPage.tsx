import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { observer } from "mobx-react-lite";

import { Pagination, RoomCard, SideBar, SideBarDropdown } from 'components';
import { useMobxStore } from 'hooks/hooks';
import { paginationControl } from 'utils/paginationControl';

import styles from './RoomSearchPage.module.scss';

const RoomSearchPage = observer(() => {
  const [page, setPage] = useState(1);
  const roomsCounter = 12;
  const { filterStore, roomsStore } = useMobxStore()
  const currentFilters = filterStore.filters;
  const { rooms } = roomsStore;

  const currentRooms: Room[] = paginationControl({
    rooms,
    currentPage: page,
    roomsCounter,
  }) as Room[];

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  useEffect(() => {
    roomsStore.getRooms(currentFilters);
    setPage(1);
  }, [currentFilters, roomsStore]);

  return (
    <main className={styles.roomSearchPage}>
      <div className={styles.roomSearchPage__content}>
        <aside className={styles.roomSearchPage__sidebar}>
          <div className={styles.roomSearchPage__sidebarDropdownWrapper}>
            <SideBarDropdown />
          </div>
          <div className={styles.roomSearchPage__sidebarWrapper}>
            <SideBar />
          </div>
        </aside>
        <article className={styles.roomSearchPage__rooms}>
          <h1 className={styles.roomSearchPage__roomsTitle}>
            Номера, которые мы для вас подобрали
          </h1>
          {currentRooms.length === 0 && (
            <AiOutlineLoading3Quarters
              className={styles.roomSearchPage__loading}
            />
          )}
          <div className={styles.roomSearchPage__roomsContent}>
            {currentRooms.length !== 0 &&
              currentRooms.map(
                ({
                  id,
                  number,
                  price,
                  type,
                  rating,
                  reviewsAmount,
                  imgSrc,
                }) => {
                  return (
                    <RoomCard
                      roomId={id}
                      key={id}
                      number={number}
                      price={price}
                      type={type}
                      rating={rating}
                      reviewsAmount={reviewsAmount}
                      imgSrc={imgSrc}
                    />
                  );
                }
              )}
          </div>
          {rooms && rooms.length / roomsCounter > 1 && (
            <div className={styles.roomSearchPage__pagination}>
              <Pagination
                page={page}
                onChange={handlePaginationChange}
                itemsPerPage={roomsCounter}
                itemsCount={rooms.length}
              />
            </div>
          )}
        </article>
      </div>
    </main>
  );
});

export { RoomSearchPage };
