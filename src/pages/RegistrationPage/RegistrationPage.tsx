import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { RegistrationForm } from 'components';
import { useMobxStore } from 'hooks/hooks';

import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  const { userStore } = useMobxStore();
  const navigate = useNavigate();

  const handleRegistration = (
    email: string,
    password: string,
    data: RegistrationData
  ) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        userStore.createUser({ user, data });
      })
      .then(() => {
        navigate('/');
      })
      .catch(alert);
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <RegistrationForm handleOnSubmit={handleRegistration} />
      </div>
    </div>
  );
};

export { RegistrationPage };
