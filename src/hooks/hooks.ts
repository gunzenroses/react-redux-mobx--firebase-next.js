import { useContext } from 'react';

import { rootStoreContext } from 'mobx/mainStore';

export const useMobxStore = () => useContext(rootStoreContext);

export const useMobxAuth = () => {
  const { userStore } = useMobxStore();
  const { email, name, id, surname, birthday, gender, getSpecOffers, likes } = userStore.userState;
  return {
    isAuth: !!email,
    email,
    name,
    id,
    surname,
    birthday,
    gender,
    getSpecOffers,
    likes,
  };
};
