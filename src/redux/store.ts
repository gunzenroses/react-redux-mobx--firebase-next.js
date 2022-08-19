import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { Action, combineReducers } from 'redux';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';

import userReducer from './slices/userSlice';
import roomsReducer from './slices/roomsSlice';
import roomDetailsReducer from './slices/roomDetailsSlice';
import searchFiltersReducer from './slices/searchFiltersSlice';
import bookingReducer from './slices/bookingSlice';
import roomInfoReducer from './slices/roomInfoSlice';

const combinedReducer = combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  roomDetails: roomDetailsReducer,
  searchFilters: searchFiltersReducer,
  booking: bookingReducer,
  roomInfo: roomInfoReducer,
});

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            'user',
            'rooms',
            'roomDetails',
            'searchFilters',
            'booking',
            'roomInfo',
          ],
        })
      ),
  })
);

export { combinedReducer };
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export type AppDispatch = RootStore['dispatch'];

export const wrapper = createWrapper<RootStore>(makeStore);
