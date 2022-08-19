import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { MainLayout, RegistrationForm } from 'components';
import { useAppDispatch } from 'hooks/hooks';
import { createUser } from 'redux/thunks/users';
import { wrapper } from 'redux/store';

import styles from './RegistrationPage.module.scss';

type Props = {
  profileName: string;
  authentication: typeof getAuth;
};

const RegistrationPage: FC<Props> = ({
  profileName,
  authentication = getAuth
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleRegistration = (
    email: string,
    password: string,
    data: RegistrationData
  ) => {
    const validEmail = email.length > 8 && email.includes('@');
    const validPassword = password.length > 8;
    const validData =
      data.name.length > 3 && data.surname.length > 2 && data.birthday;
    const validSubmit = validPassword && validEmail && validData;
    if (validSubmit) {
      const auth = authentication();
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(createUser({ user, data }));
          router.push('/');
        })
        .catch(alert);
    }
  };

  return (
    <MainLayout
      title={t('signUpTitle', { ns: 'common' })}
      profileName={profileName}
    >
      <div className={styles.page}>
        <div className={styles.form}>
          <RegistrationForm handleOnSubmit={handleRegistration} />
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

export default RegistrationPage;
