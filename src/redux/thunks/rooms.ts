import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiRooms from '../../firebase/Api/ApiRooms';

const writeRooms = createAsyncThunk(
  'rooms/writeRooms',
  async (filters: Filters, { rejectWithValue }) => {
    try {
      return await new ApiRooms().getRooms(filters);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { writeRooms };
