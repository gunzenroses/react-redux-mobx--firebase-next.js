import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { SignInPageForm } from 'components/SignInPageForm/SignInPageForm';
import { useMobxStore } from 'hooks/hooks';

import styles from './SignInPage.module.scss';

const SignInPage = () => {
  const { userStore } = useMobxStore();
  const navigate = useNavigate();

  const handleSignIn = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        userStore.getUser(user.uid);
      }).then(() => {
        navigate('/');
      })
      .catch(alert);
  };

  return (
    <main className={styles.signInPage}>
      <div className={styles.signInPage__container}>
        <SignInPageForm handleOnSubmit={handleSignIn} />
      </div>
    </main>
  );
};

export { SignInPage };
