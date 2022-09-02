import { createContext } from 'react';

import { searchFiltersStore } from './stores/searchFiltersStore';
import { roomDetailsStore } from './stores/roomDetailsStore';
import { userStore } from './stores/userStore';
import { bookingStore } from './stores/bookingStore';
import { roomsStore } from './stores/roomsStore';
import { roomInfoStore } from './stores/roomInfoStore';

const rootStoreContext = createContext({
  filterStore: searchFiltersStore,
  bookingStore,
  roomsStore,
  roomInfoStore,
  roomDetailsStore,
  userStore,
});


export { rootStoreContext };
