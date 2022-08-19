import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiComments from '../../firebase/Api/ApiComments';

type CreateComment = {
  id: string;
  newComment: CommentType;
};

const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ id, newComment }: CreateComment, { rejectWithValue }) => {
    try {
      return await new ApiComments().createComment(id, newComment);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { createComment };
