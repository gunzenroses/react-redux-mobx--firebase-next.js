import {
  collection,
  getDocs,
  getFirestore,
  query,
  Firestore,
  where,
} from 'firebase/firestore';

import { checkIsRoomSuitable } from "utils/checkIsRoomSuitable";

import { fireApp } from '../firebase';

class ApiRooms {
  private readonly db: Firestore;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  getRooms = async (filters: Filters) => {
    const roomCollection = collection(this.db, 'rooms');
    const q = query(
      roomCollection,
      where('price', '>=', Number(filters.price.from)),
      where('price', '<=', Number(filters.price.to)),
    );

    const querySnapshot = await getDocs(q);
    const rooms: Room[] = [];

    querySnapshot.forEach((room) => {
      const roomData = room.data() as Room;
      const filteredRoomData = ApiRooms.filterRooms(roomData, filters);
      if (filteredRoomData !== null) rooms.push(roomData);
    });
    return rooms;
  };

  private static filterRooms = (
    room: Room,
    filters: Filters
  ): Room | null => {
    let result: Room | null = room;

    const filterInappropriateNumber = (key: keyof Filters, subKey: keyof InnerFilters) => {
      const isNotActualFilter = filters[key][subKey] === false
        || filters[key][subKey] === 0
        || filters[key][subKey] === null
        || filters[key][subKey] === undefined
        || key === 'price';

      if (isNotActualFilter) return;

      if (checkIsRoomSuitable({
        room,
        filters,
        key,
        subKey
      })) result = null;
    };

    Object.keys(filters).forEach((key) => {
      Object.keys(filters[key as keyof Filters]).forEach((subKey) => {
        filterInappropriateNumber(
          key as keyof Filters,
          subKey as keyof InnerFilters
        );
      });
    });

    return result;
  };
}

export default ApiRooms;
