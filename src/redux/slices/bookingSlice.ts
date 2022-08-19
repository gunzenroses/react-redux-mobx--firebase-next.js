import { createSlice } from '@reduxjs/toolkit';

import {
  addBookingInfo,
  getBookingInfo,
  removeBookingInfo,
} from 'redux/thunks/booking';

const initialState: {
  data: BookingData[];
  status: BookingStatus;
} = {
  data: [],
  status: 'idle',
};

const bookingSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBookingStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookingInfo.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'fulfilled';
      })
      .addCase(addBookingInfo.rejected, () => {
        console.error('Ошибка добавления бронирования');
      })
      .addCase(removeBookingInfo.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.toString() !== action.payload.toString()
        );
      })
      .addCase(removeBookingInfo.rejected, () => {
        console.error('Ошибка удаления бронировани');
      })
      .addCase(getBookingInfo.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getBookingInfo.rejected, () => {
        console.error('Ошибка получения забронированных номеров');
      });
  },
});

export const { setBookingStatus } = bookingSlice.actions;

export default bookingSlice.reducer;
