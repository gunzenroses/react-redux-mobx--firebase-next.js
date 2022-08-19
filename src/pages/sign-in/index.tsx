import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { SignInPageForm } from 'components/SignInPageForm/SignInPageForm';
import { useAppDispatch } from 'hooks/hooks';
import { getUser } from 'redux/thunks/users';
import { MainLayout } from 'components';
import { wrapper } from 'redux/store';

import styles from './SignInPage.module.scss';

type Props = {
  profileName: string;
  makeAuth: typeof getAuth;
};

const SignInPage: FC<Props> = ({
  profileName,
  makeAuth = getAuth
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleSignIn = (email: string, password: string) => {
    if (email.includes('@')  && email.length > 6 && password.length > 6) {
      const auth = makeAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(getUser(user.uid)).then(() => {
            router.push('/user-page');
          });
        })
        .catch(alert);
    }
  };

  return (
    <MainLayout
      title={t('signInTitle', { ns: 'common' })}
      profileName={profileName}
    >
      <div className={styles.signInPage}>
        <div className={styles.signInPage__container}>
          <SignInPageForm handleOnSubmit={handleSignIn} />
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
    let locale = null;
    if (ctx.locale) {
      locale = await serverSideTranslations(ctx.locale);
    }

    return {
      props: { profileName: `${name} ${surname}`, ...locale },
    };
  });

export default SignInPage;
