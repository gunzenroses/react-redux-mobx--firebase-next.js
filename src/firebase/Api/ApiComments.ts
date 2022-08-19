import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

import { fireApp } from '../firebase';

class ApiComments {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  async createComment(id: string, newComment: CommentType) {
    const ref = doc(this.db, 'details', id);
    const comments = await getDoc(ref);
    if (comments.exists()) {
      const data = comments.data();
      await updateDoc(ref, {
        comments: [...data.comments, newComment],
      });
    }
  }
}

export default ApiComments;
