import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState: Filters = {
  accessibility: {
    wideCorridor: false,
    assistant: false,
  },
  additionalFacilities: {
    breakfast: false,
    crib: false,
    feedingChair: false,
    shampoo: false,
    tv: false,
    writingDesk: false,
  },
  freeDays: {
    from: null,
    to: null,
  },
  guests: { kids: 0, adults: 0, baby: 0 },
  price: { from: 5000, to: 10000 },
  roomAmenities: { bedrooms: 0, beds: 0, bathrooms: 0 },
  rules: { allowGuests: false, allowSmoke: false, allowPets: false },
};

const searchFiltersSlice = createSlice({
  name: 'searchFilters',
  initialState,
  reducers: {
    setSearchFilters(state, action) {
      state.accessibility = action.payload.accessibility;
      state.additionalFacilities = action.payload.additionalFacilities;
      state.freeDays = action.payload.freeDays;
      state.guests = action.payload.guests;
      state.price = action.payload.price;
      state.roomAmenities = action.payload.roomAmenities;
      state.rules = action.payload.rules;
    },
    updateAccessibility(state, action) {
      return {
        ...state,
        accessibility: {
          ...state.accessibility,
          ...action.payload,
        },
      };
    },
    updateAdditionalFacilities(state, action) {
      return {
        ...state,
        additionalFacilities: {
          ...state.additionalFacilities,
          ...action.payload,
        },
      };
    },
    updateFreeDays(state, action) {
      return {
        ...state,
        freeDays: action.payload,
      };
    },
    updateGuests(state, action) {
      return {
        ...state,
        guests: action.payload,
      };
    },
    updatePrice(state, action) {
      return {
        ...state,
        price: action.payload,
      };
    },
    updateRoomAmenities(state, action) {
      return {
        ...state,
        roomAmenities: {
          ...state.roomAmenities,
          ...action.payload,
        },
      };
    },
    updateRules(state, action) {
      return {
        ...state,
        rules: {
          ...state.rules,
          ...action.payload,
        },
      };
    },
  },
});

export const {
  setSearchFilters,
  updateAccessibility,
  updateAdditionalFacilities,
  updateFreeDays,
  updateGuests,
  updatePrice,
  updateRoomAmenities,
  updateRules,
} = searchFiltersSlice.actions;

export const getGuests = (state: RootState) => state.searchFilters.guests;
export const getDates = (state: RootState) => state.searchFilters.freeDays;
export const selectSearchFilters = (state: RootState) => state.searchFilters;
export default searchFiltersSlice.reducer;
