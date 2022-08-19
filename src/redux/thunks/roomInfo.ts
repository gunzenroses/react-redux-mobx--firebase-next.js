import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiRoomInfo from '../../firebase/Api/ApiRoomInfo';

const getRoomInfo = createAsyncThunk(
  'roomInfo/getRoomInfo',
  async (id: string, { rejectWithValue }) => {
    try {
      return await new ApiRoomInfo().getInfo(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { getRoomInfo };
