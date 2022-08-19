import {
  updateDoc,
  doc,
  getDoc,
  getFirestore,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { fireApp } from '../firebase';

class ApiBooking {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  async getBookingInfo(id: string) {
    const user = doc(this.db, 'users', id);
    const docSnap = await getDoc(user);
    if (docSnap.exists() && docSnap.data().rooms) {
      return docSnap.data().rooms;
    }
    throw new Error('no such room');
  }

  async addBookingInfo(id: string, data: BookingData) {
    const user = doc(this.db, 'users', id);
    await updateDoc(user, {
      rooms: arrayUnion(data),
    });
    return data;
  }

  async removeBookingInfo(id: string, data: BookingData) {
    const user = doc(this.db, 'users', id);
    await updateDoc(user, {
      rooms: arrayRemove(data),
    });
    return data;
  }
}

export default ApiBooking;
