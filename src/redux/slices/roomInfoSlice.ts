import { createSlice } from '@reduxjs/toolkit';

import { getRoomInfo } from 'redux/thunks/roomInfo';
import { defaultRoom } from 'utils/constants';

type CurrentRoom = {
  data: Room;
  status: string;
};

const initialState: CurrentRoom = {
  data: defaultRoom,
  status: '',
};

const roomInfoSlice = createSlice({
  name: 'roomInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomInfo.fulfilled, (state, action) => {
        state.data = action.payload as Room;
      })
      .addCase(getRoomInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoomInfo.rejected, () => {
        console.error('Ошибка получения данных room-form');
      });
  },
});

export default roomInfoSlice.reducer;
