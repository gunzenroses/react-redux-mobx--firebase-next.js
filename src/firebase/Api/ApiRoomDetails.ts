import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';

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

  async createComment(id: string, newComment: CommentType) {
    const roomInfo = doc(this.db, 'details', id);
    const docSnap = await getDoc(roomInfo);
    if (docSnap.exists()) {
      const data = docSnap.data();
      await updateDoc(roomInfo, {
        comments: [...data.comments, newComment],
      });
    }
  }
}

export default ApiRoomDetails;
