import { makeAutoObservable, runInAction } from 'mobx';

import ApiRoomInfo from '../../firebase/Api/ApiRoomInfo';

const defaultState: RoomInfoData = {
  info: null,
  isFetching: true,
  isRejected: false,
};

class RoomInfoStore {
  roomInfo: RoomInfoData;

  constructor(initialState: RoomInfoData) {
    makeAutoObservable(this);
    this.roomInfo = initialState;
  }

  async getRoomInfo(id: string) {
    try {
      const newRoomInfo = (await new ApiRoomInfo().getInfo(id)) as RoomInfo;
      runInAction(() => {
        this.roomInfo.info = newRoomInfo;
      });
    } catch (error: any) {
      console.error(error.message);
      runInAction(() => {
        this.roomInfo.isRejected = true;
        this.roomInfo.isFetching = false;
      });
    }
  }
}

const roomInfoStore = new RoomInfoStore(defaultState);
export { roomInfoStore, RoomInfoStore };