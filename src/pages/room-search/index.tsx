import { FC, useDeferredValue, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import {
  MainLayout,
  Pagination,
  RoomCard,
  SideBar,
  SideBarDropdown,
} from 'components';
import { writeRooms } from 'redux/thunks/rooms';
import { wrapper } from 'redux/store';
import { useAppDispatch } from 'hooks/hooks';
import { selectSearchFilters } from 'redux/slices/searchFiltersSlice';
import { selectRooms } from 'redux/slices/roomsSlice';
import { paginationControl } from 'utils/paginationControl';

import styles from './RoomSearchPage.module.scss';

type Props = {
  profileName: string;
  freeDays: FreeDays;
  guests: Guests;
};

const RoomSearchPage: FC<Props> = ({ profileName, freeDays, guests }) => {
  const [page, setPage] = useState(1);
  const roomsCounter = 12;
  const { t } = useTranslation('room-search');

  const dispatch = useAppDispatch();
  const currentFilters = useSelector(selectSearchFilters);
  const rooms = useSelector(selectRooms)!;

  const currentRooms: Room[] = useDeferredValue(
    paginationControl({
      rooms,
      currentPage: page,
      roomsCounter,
    }) as Room[]
  );

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(writeRooms(currentFilters));
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [currentFilters, dispatch]);

  return (
    <MainLayout
      title={t('searchTitle', { ns: 'common' })}
      profileName={profileName}
    >
      <div className={styles.roomSearchPage}>
        <div className={styles.roomSearchPage__content}>
          <aside className={styles.roomSearchPage__sidebar}>
            <div className={styles.roomSearchPage__sidebarDropdownWrapper}>
              <SideBarDropdown freeDays={freeDays} guests={guests} />
            </div>
            <div className={styles.roomSearchPage__sidebarWrapper}>
              <SideBar freeDays={freeDays} guests={guests} />
            </div>
          </aside>
          <article className={styles.roomSearchPage__rooms}>
            <h1 className={styles.roomSearchPage__roomsTitle}>{t('title')}</h1>
            {currentRooms === null && (
              <AiOutlineLoading3Quarters
                className={styles.roomSearchPage__loading}
              />
            )}
            <div className={styles.roomSearchPage__roomsContent}>
              {currentRooms !== null &&
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
                        id={id}
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
            <div className={styles.roomSearchPage__pagination}>
              <Pagination
                page={page}
                onChange={handlePaginationChange}
                itemsPerPage={roomsCounter}
                itemsCount={rooms?.length}
              />
            </div>
          </article>
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

    const { name, surname } = store.getState().user;
    const { freeDays, guests } = store.getState().searchFilters;

    let locale = null;
    if (ctx.locale) {
      locale = await serverSideTranslations(ctx.locale);
    }

    return {
      props: { profileName: `${name} ${surname}`, freeDays, guests, ...locale },
    };
  });

export default RoomSearchPage;
