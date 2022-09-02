import { makeAutoObservable } from 'mobx';

import Api from '../../firebase/Api/ApiRooms';

const initialState: Room[] = [];

class RoomStore {
  rooms: Room[];

  constructor(rooms: Room[]) {
    makeAutoObservable(this);
    this.rooms = rooms;
  }

  setRooms = (rooms: Room[]) => {
    this.rooms = rooms;
  };

  getRooms = async (filters: Filters) => {
    try {
      const rooms = await new Api().getRooms(filters);
      this.setRooms(rooms);
    } catch (error) {
      console.error(error);
    }
  };
}

const roomsStore = new RoomStore(initialState);

export { roomsStore };
