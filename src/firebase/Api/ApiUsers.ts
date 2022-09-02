import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  User,
  updateEmail,
  getAuth,
  updatePassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { fireApp } from '../firebase';

class ApiUsers {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  async createUser(user: User, data: RegistrationData) {
    const ref = doc(this.db, 'users', user.uid);
    const { birthday } = data;
    const birthdaySplit = birthday.split('.');
    const birthdayDate = new Date(
      Number(birthdaySplit[2]),
      Number(birthdaySplit[1]) - 1,
      Number(birthdaySplit[0])
    );
    await setDoc(ref, {
      id: user.uid,
      email: user.email,
      name: data.name,
      surname: data.surname,
      gender: data.gender,
      getSpecOffers: data.getSpecOffers === 'on',
      birthday: birthdayDate,
      likes: [],
    });
    return {
      id: user.uid,
      name: data.name,
      surname: data.surname,
      email: user.email || '',
      likes: [],
    };
  }

  async getUser(userId: string) {
    const userInfo = doc(this.db, 'users', userId);
    const docSnap = await getDoc(userInfo);

    if (docSnap.exists()) {
      const data = docSnap.data();
      data.birthday = JSON.stringify(data.birthday);
      return data;
    }

    throw new Error('No such user');
  }

  async updateUser(userId: string, personalData: PersonalFormData) {
    const userInfo = doc(this.db, 'users', userId);
    const auth = getAuth();
    const docSnap = await getDoc(userInfo);
    const data: UserStateType = docSnap.data() as UserStateType;
    const value =
      personalData.key === 'birthday'
        ? new Date(+personalData.value * 1000)
        : personalData.value;

    onAuthStateChanged(auth, (user) => {
      if (!user) throw new Error('No such user');

      if (personalData.key === 'email')
        updateEmail(auth.currentUser!, personalData.value);
      if (personalData.key === 'password')
        updatePassword(auth.currentUser!, personalData.value);

      data.email = auth.currentUser!.email!;
      if (personalData.key !== 'password')
        data[personalData.key] = value as never;
      setDoc(userInfo, data, { merge: true });
    });

    return {
      id: userId,
      name: data.name,
      surname: data.surname,
      email: data.email,
    };
  }

  async setLike(roomId: string, commentId: number, uid: string) {
    let result;
    const ref = doc(this.db, 'details', roomId);
    const comments = await getDoc(ref);
    if (comments.exists()) {
      const data = comments.data();
      data.comments[commentId].likes += 1;
      await updateDoc(ref, {
        comments: [...data.comments],
      });
    }
    const user = doc(this.db, 'users', uid);
    const userInfo = await getDoc(user);
    if (userInfo.exists()) {
      const data = userInfo.data();
      if (data.likes.some((item: UserLikesInfo) => item.room === roomId)) {
        data.likes = data.likes.map((item: UserLikesInfo) => {
          const newItem = item;
          if (item.room === roomId) {
            newItem.comments = [...item.comments, commentId];
            return newItem;
          }
          return item;
        });
      } else {
        data.likes.push({
          room: roomId,
          comments: [commentId],
        });
      }
      result = data;
      await updateDoc(user, {
        likes: [...data.likes],
      });
    }
    return result?.likes;
  }

  async removeLike(roomId: string, commentId: number, uid: string) {
    let result;
    const ref = doc(this.db, 'details', roomId);
    const comments = await getDoc(ref);
    if (comments.exists()) {
      const data = comments.data();
      data.comments[commentId].likes -= 1;
      await updateDoc(ref, {
        comments: [...data.comments],
      });
    }
    const user = doc(this.db, 'users', uid);
    const userInfo = await getDoc(user);
    if (userInfo.exists()) {
      const data = userInfo.data();
      data.likes = data.likes.map((item: UserLikesInfo) => {
        const newItem = item;
        if (item.room === roomId) {
          newItem.comments = item.comments.filter((id) => id !== commentId);
          return newItem;
        }
        return item;
      });
      result = data;
      await updateDoc(user, {
        likes: [...data.likes],
      });
    }
    return result?.likes;
  }
}

export default ApiUsers;
