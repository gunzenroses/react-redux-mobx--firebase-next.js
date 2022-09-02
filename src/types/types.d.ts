declare module '*.scss';

type UserLikesInfo = {
  comments: number[];
  room: string;
};

type UserStateType = {
  email: string;
  id: string;
  name: string;
  birthday: string;
  gender: string;
  getSpecOffers: boolean;
  surname: string;
  likes: UserLikesInfo[];
};

type userInfo = {
  email: string;
  id: string;
  name: string;
  surname: string;
};

type CommentType = {
  img?: string;
  isPressed: boolean;
  likes: number;
  name: string;
  text: string;
  time: number;
};

type Info = {
  img: string;
  text: string;
  title: string;
};

type RoomDetailsType = {
  id: string;
  comments: CommentType[];
  impressions: Record<string, number>;
  rules: string[];
  info: Info[];
  isFetching: boolean;
  isRejected: boolean;
};

type Accessibility = {
  wideCorridor: boolean;
  assistant: boolean;
};

type AdditionalFacilities = {
  breakfast: boolean;
  crib: boolean;
  feedingChair: boolean;
  shampoo: boolean;
  tv: boolean;
  writingDesk: boolean;
};

type FreeDays = {
  to: string | null;
  from: string | null;
};

type Guests = {
  adults: number;
  kids: number;
  baby: number;
};

type Price = {
  from: number;
  to: number;
};

type RoomAmenities = {
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

type Rules = {
  allowGuests: boolean;
  allowPets: boolean;
  allowSmoke: boolean;
};

type Filters = {
  accessibility: Accessibility;
  additionalFacilities: AdditionalFacilities;
  freeDays: FreeDays;
  guests: Guests;
  price: Price;
  roomAmenities: RoomAmenities;
  rules: Rules;
};

type InnerFilters =
  | Accessibility
  | AdditionalFacilities
  | FreeDays
  | Guests
  | Price
  | RoomAmenities
  | Rules;

type Room = Omit<Filters, 'price'> & {
  id: number;
  imgSrc: string[];
  number: number;
  type: string;
  rating: number;
  price: number;
  reviewsAmount: number;
};

type RoomInfo = {
  accessibility: { wideCorridor: boolean; assistant: boolean };
  additionalFacilities: {
    writingDesk: boolean;
    feedingChair: boolean;
    shampoo: boolean;
    crib: boolean;
    tv: boolean;
  };
  guests: { kids: number; baby: number; adults: number };
  id: number;
  imgSrc: string[];
  number: number;
  price: number;
  rating: number;
  reviewsAmount: number;
  roomAmenities: { bedrooms: number; beds: number; bathrooms: number };
  rules: { allowSmoke: boolean; allowGuests: boolean; allowPets: boolean };
  type: string;
};

type BookingData = {
  number: number;
  type: string;
  price: number;
  date: FreeDays;
  guests: Guests;
  imgSrc: string[];
  totalCost: number;
  rating: number;
  reviewsAmount: number;
};

type BookingStatus = 'rejected' | 'fetching' | 'fulfilled' | 'idle';

type Bookings = {
  bookings: BookingData[];
  bookingStatus: BookingStatus;
};

type Content = {
  [K: string]: number;
};

type RegistrationData = {
  name: string;
  surname: string;
  birthday: string;
  getSpecOffers: string;
  gender: string;
};

type PersonalFormData = {
  key: keyof UserStateType | 'password';
  value: string;
};

type RoomCardData = {
  roomId?: number;
  imgSrc?: string[];
  type?: string;
  number?: number;
  price?: number;
  costRange?: string;
  reviewsAmount?: number;
  rating?: number;
};

type RoomInfoData = {
  info: RoomInfo | null;
  isFetching: boolean;
  isRejected: boolean;
};

type SetLikeProps = {
  roomId: string;
  commentId: number;
  uid: string;
};

type CreateComment = {
  id: string;
  newComment: CommentType;
};
