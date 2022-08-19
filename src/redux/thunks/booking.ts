import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiBooking from '../../firebase/Api/ApiBooking';

const getBookingInfo = createAsyncThunk(
  'users/getBookingInfo',
  async (id: string, { rejectWithValue }) => {
    try {
      return await new ApiBooking().getBookingInfo(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const addBookingInfo = createAsyncThunk(
  'users/addBooking',
  async (
    { id, data }: { id: string; data: BookingData },
    { rejectWithValue }
  ) => {
    try {
      return await new ApiBooking().addBookingInfo(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const removeBookingInfo = createAsyncThunk(
  'users/removeBooking',
  async (
    { id, data }: { id: string; data: BookingData },
    { rejectWithValue }
  ) => {
    try {
      return await new ApiBooking().removeBookingInfo(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { getBookingInfo, addBookingInfo, removeBookingInfo };
