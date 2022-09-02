import { action, makeAutoObservable, observable, runInAction } from "mobx"

import ApiRoomDetails from "../../firebase/Api/ApiRoomDetails";

const initialState: RoomDetailsType = {
  id: '',
  comments: [],
  impressions: {},
  rules: [],
  info: [],
  isFetching: true,
  isRejected: false,
};

class RoomDetailsStore {
  roomDetailsState: RoomDetailsType;

  constructor(roomDetailsState: RoomDetailsType) {
    makeAutoObservable(this, {
      roomDetailsState: observable,
      getRoomDetails: action.bound,
    });
    this.roomDetailsState = roomDetailsState;
  }

  setRoomDetails(roomDetails: RoomDetailsType) {
    this.roomDetailsState = {
      ...this.roomDetailsState,
      ...roomDetails,
      isFetching: false,
      isRejected: false,
    };
  }

  setComments(newComments: CommentType[]) {
    runInAction(() => {
      this.roomDetailsState.comments = newComments;
    });
  }

  async getRoomDetails(id: string) {
    try {
      const roomDetails = (await new ApiRoomDetails().getInfo(
        id
      )) as RoomDetailsType;
      this.setRoomDetails(roomDetails);
    } catch (error: any) {
      console.error(error.message);
      runInAction(() => {
        this.roomDetailsState.isFetching = false;
        this.roomDetailsState.isRejected = true;
      });
    }
  }

  async createComment({ id, newComment }: CreateComment) {
    try {
      await new ApiRoomDetails().createComment(id, newComment)
        .then(() => {
          this.getRoomDetails(id);
        });
    } catch (error: any) {
      console.error(error.message);
      runInAction(() => {
        this.roomDetailsState.isFetching = false;
        this.roomDetailsState.isRejected = true;
      });
    }
  }
}

const roomDetailsStore = new RoomDetailsStore(initialState);

export { roomDetailsStore, RoomDetailsStore };
