import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiRoomDetails from '../../firebase/Api/ApiRoomDetails';

const getRoomDetails = createAsyncThunk(
  'roomDetails/getRoomDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      return await new ApiRoomDetails().getInfo(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const getComments = createAsyncThunk(
  'roomDetails/getComments',
  async (id: string, { rejectWithValue }) => {
    try {
      return await new ApiRoomDetails().getInfo(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { getRoomDetails, getComments };
