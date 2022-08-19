import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { writeRooms } from 'redux/thunks/rooms';

import { RootState } from '../store';

type CurrentRooms = {
  current: Room[] | null;
};

const initialState: CurrentRooms = {
  current: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      return { current: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(writeRooms.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

export const { setRooms } = roomsSlice.actions;
export const selectRooms = (state: RootState) => state.rooms.current;

export default roomsSlice.reducer;
