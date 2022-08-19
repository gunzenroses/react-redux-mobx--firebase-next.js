import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from 'redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = () => {
  const { email, name, id, surname, birthday, gender, getSpecOffers, likes } =
    useAppSelector((state) => state.user);

  return {
    isAuth: !!email,
    email,
    name,
    id,
    surname,
    birthday,
    gender,
    getSpecOffers,
    likes,
  };
};
export const useRoomDetails = () => {
  const roomDetails = useAppSelector((state) => state.roomDetails);
  return roomDetails;
};
export const useBookingInfo = () => {
  const data = useAppSelector((state) => state.booking.data);
  return data;
};
export const useBookingStatus = () => {
  const status = useAppSelector((state) => state.booking.status);
  return status;
};
export const useRoomInfo = () => {
  const data = useAppSelector((state) => state.roomInfo.data);
  return data;
};
