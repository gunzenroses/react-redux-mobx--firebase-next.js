import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FC, ReactNode, useEffect, useState } from 'react';

import { Footer, Header } from 'components';

import styles from './MainLayout.module.scss';

type Props = {
  title: string;
  children: ReactNode;
  profileName: string;
};

const MainLayout: FC<Props> = ({ title, profileName, children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => url === router.asPath;

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [loading, router.asPath, router.events, router.pathname]);
  return (
    <>
      <Head>
        <meta name="description" content="самый лучший в мире отель toxin" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
      </Head>
      <>
        <Header profileName={profileName} />
        {loading && <AiOutlineLoading3Quarters className={styles.loader} />}
        {!loading && <main>{children}</main>}
        <Footer />
      </>
    </>
  );
};

export { MainLayout };
