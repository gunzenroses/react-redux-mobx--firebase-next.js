module "*.png";
module "*.svg";

type UserLikesInfo = {
  comments: number[];
  room: string;
};

type UserType = {
  email: string;
  id: string;
  name: string;
  birthday: string;
  gender: string;
  getSpecOffers: boolean;
  surname: string;
  likes: UserLikesInfo[];
};

type CommentType = {
  likes: number;
  text: string;
  time: number;
  name: string;
  isPressed: boolean;
  img?: string;
  isAuth?: boolean;
  id?: number;
  onSetLike?: (id: number) => void;
  onRemoveLike?: (id: number) => void;
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

type RoomCardType = {
  id?: number;
  imgSrc: string[];
  number: number;
  type: string;
  rating: number;
  price: number;
  costRange?: string;
  reviewsAmount: number;
};

type Room = Omit<Filters, 'price'> & RoomCardType;

type BookingStatus = 'rejected' | 'fetching' | 'fulfilled' | 'idle';

type BookingData = RoomCardType & {
  date: FreeDays;
  guests: Guests;
  totalCost: number;
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
  key: keyof UserType | 'password';
  value: string;
};
