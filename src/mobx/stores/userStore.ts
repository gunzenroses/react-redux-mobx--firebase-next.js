import { makeAutoObservable, runInAction } from 'mobx';
import { User } from 'firebase/auth';

import ApiUsers from '../../firebase/Api/ApiUsers';

const initialState: UserStateType = {
  id: '',
  name: '',
  surname: '',
  email: '',
  birthday: '',
  gender: '',
  getSpecOffers: false,
  likes: [],
};

class UserStore {
  userState: UserStateType;

  constructor(state?: UserStateType) {
    makeAutoObservable(this);
    this.userState = state || initialState;
  }

  setUser(newInfo: userInfo | UserStateType) {
    this.userState = {
      ...this.userState,
      ...newInfo,
    };
  }

  removeUser() {
    runInAction(() => {
      this.userState = initialState;
    });
    window.localStorage.removeItem('user');
  }

  changeUserLikes(likes: UserLikesInfo[]) {
    this.userState.likes = likes;
  }

  async setLike({ roomId, commentId, uid }: SetLikeProps) {
    try {
      const newUserLikes = await new ApiUsers().setLike(roomId, commentId, uid);
      runInAction(() => {
        this.userState.likes = newUserLikes;
      });
      this.setLocalStorage();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  async removeLike({ roomId, commentId, uid }: SetLikeProps) {
    try {
      const newUserLikes = await new ApiUsers().removeLike(roomId, commentId, uid);
      runInAction(() => {
        this.userState.likes = newUserLikes;
      });
      this.setLocalStorage();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async getUser(uid: string) {
    try {
      const gottenUser = (await new ApiUsers().getUser(uid)) as UserStateType;
      this.setUser(gottenUser);
      this.setLocalStorage();
    } catch (error: any) {
      console.error('Ошибка входа');
    }
  }

  async createUser({ user, data }: { user: User; data: RegistrationData }) {
    try {
      const createdUser = await new ApiUsers().createUser(user, data);
      this.setUser(createdUser);
      this.setLocalStorage();
    } catch (error: any) {
      console.error('Ошибка регистрации');
    }
  }

  async updateUser({ id, data }: { id: string; data: PersonalFormData }) {
    try {
      const updatedUser = await new ApiUsers().updateUser(id, data);
      this.setUser(updatedUser);
      this.setLocalStorage();
    } catch (error: any) {
      console.error(
        'Невозможно обновить информацию! Скорее всего такого пользователя не существует'
      );
    }
  }

  setLocalStorage() {
    window.localStorage.clear();
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        email: this.userState.email,
        id: this.userState.id,
        name: this.userState.name,
        likes: this.userState.likes,
        surname: this.userState.surname,
      })
    );
  }
}

const userStore = new UserStore();

export { userStore, UserStore};