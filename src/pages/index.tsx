import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { MainLayout, LandingForm } from 'components';
import { wrapper } from 'redux/store';

import styles from './Landing/Landing.module.scss';

type Props = {
  profileName: string;
  freeDays: FreeDays;
  guests: Guests;
};

const Landing: FC<Props> = ({ profileName, freeDays, guests }) => {
  const { t } = useTranslation('landing-page');
  return (
    <MainLayout
      title={t('landingTitle', { ns: 'common' })}
      profileName={profileName}
    >
      <div className={styles.landing}>
        <div className={styles.landing__inner}>
          <LandingForm freeDays={freeDays} guests={guests} />
          <span className={styles.landing__text}>{t('description')}</span>
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

    let locale = null;
    if (ctx.locale) {
      locale = await serverSideTranslations(ctx.locale);
    }

    const { name, surname } = store.getState().user;
    const { freeDays, guests } = store.getState().searchFilters;

    return {
      props: { profileName: `${name} ${surname}`, freeDays, guests, ...locale },
    };
  });

export default Landing;
