import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

import ApiUsers from '../../firebase/Api/ApiUsers';

type createUserData = {
  user: User;
  data: RegistrationData;
};

type UpdateUserData = {
  user: string;
  personalData: PersonalFormData;
};
type SetLikeProps = {
  roomId: string;
  commentId: number;
  uid: string;
};
const getUser = createAsyncThunk(
  'user/getUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await new ApiUsers().getUser(userId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const createUser = createAsyncThunk(
  'user/createUser',
  async ({ user, data }: createUserData, { rejectWithValue }) => {
    try {
      return await new ApiUsers().createUser(user, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ user, personalData }: UpdateUserData, { rejectWithValue }) => {
    try {
      return await new ApiUsers().updateUser(user, personalData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const setLike = createAsyncThunk(
  'user/setLike',
  async ({ roomId, commentId, uid }: SetLikeProps, { rejectWithValue }) => {
    try {
      return await new ApiUsers().setLike(roomId, commentId, uid);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const removeLike = createAsyncThunk(
  'user/removeLike',
  async ({ roomId, commentId, uid }: SetLikeProps, { rejectWithValue }) => {
    try {
      return await new ApiUsers().removeLike(roomId, commentId, uid);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { getUser, createUser, setLike, removeLike, updateUser };
