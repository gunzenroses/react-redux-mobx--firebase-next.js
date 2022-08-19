import { doc, getDoc, getFirestore } from 'firebase/firestore';

import { fireApp } from '../firebase';

class ApiRoomDetails {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  async getInfo(id: string) {
    const roomInfo = doc(this.db, 'details', id);
    const docSnap = await getDoc(roomInfo);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error('no such room');
  }
}

export default ApiRoomDetails;
