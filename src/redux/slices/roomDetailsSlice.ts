import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';

import { getComments, getRoomDetails } from '../thunks/roomDetails';

const initialState: RoomDetailsType = {
  id: '',
  comments: [],
  impressions: {},
  rules: [],
  info: [],
  isFetching: true,
  isRejected: false,
};

const roomDetailsSlice = createSlice({
  name: 'roomDetails',
  initialState,
  reducers: {
    setRoomDetails(state, action) {
      state.id = action.payload.id;
      state.comments = action.payload.comments;
      state.impressions = action.payload.impressions;
      state.rules = action.payload.rules;
      state.info = action.payload.info;
    },
    setComments(state, action) {
      state.comments = action.payload.comments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.comments = action.payload.comments;
        state.impressions = action.payload.impressions;
        state.rules = action.payload.rules;
        state.info = action.payload.info;
        state.isFetching = false;
        state.isRejected = false;
      })
      .addCase(getRoomDetails.pending, (state) => {
        state.isFetching = true;
        state.isRejected = false;
      })
      .addCase(getRoomDetails.rejected, (state) => {
        state.isFetching = false;
        state.isRejected = true;
        console.error('Ошибка получения данных о комнате');
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
      });
  },
});

export const { setRoomDetails, setComments } = roomDetailsSlice.actions;
export const selectRoomDetails = (state: RootState) => state.roomDetails;
export default roomDetailsSlice.reducer;
