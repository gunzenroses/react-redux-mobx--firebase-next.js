import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Header, Footer } from 'components';
import {
  RegistrationPage,
  Landing,
  SignInPage,
  RoomSearchPage,
  RoomDetailsPage,
  UserPage,
} from 'pages';

import '../firebase/firebase';
import styles from './App.module.scss';
import { useMobxAuth, useMobxStore } from '../hooks/hooks';


const App = observer(() => {
  const { userStore } = useMobxStore();
  const { name, surname } = useMobxAuth();

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      const userData: userInfo = JSON.parse(user);
      userStore.setUser(userData);
    }
  }, [userStore]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header profileName={`${name} ${surname}`} />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/room-search" element={<RoomSearchPage />} />
          <Route path="/room-details/:roomId" element={<RoomDetailsPage />} />
          <Route path="/user-page" element={<UserPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
});

export default App;
