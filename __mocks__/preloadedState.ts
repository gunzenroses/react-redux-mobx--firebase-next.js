const currentRooms = [
  {
    accessibility: { wideCorridor: true, assistant: false },
    additionalFacilities: {
      breakfast: true,
      crib: false,
      feedingChair: false,
      shampoo: false,
      tv: false,
      writingDesk: false,
    },
    freeDays: {
      from: '2022-10-11T06:17:02.467Z',
      to: '2022-10-18T00:20:15.895Z',
    },
    guests: { kids: 2, baby: 0, adults: 4 },
    id: 10,
    imgSrc: [
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
    ],
    number: 111,
    price: 11423,
    rating: 5,
    reviewsAmount: 99,
    roomAmenities: { bedrooms: 2, beds: 4, bathrooms: 0 },
    rules: { allowSmoke: false, allowGuests: true, allowPets: true },
    type: 'Люкс',
  },
  {
    accessibility: { wideCorridor: true, assistant: false },
    additionalFacilities: {
      breakfast: true,
      crib: false,
      feedingChair: false,
      shampoo: false,
      tv: false,
      writingDesk: false,
    },
    freeDays: {
      from: '2022-10-11T06:17:02.467Z',
      to: '2022-10-18T00:20:15.895Z',
    },
    guests: { kids: 2, baby: 0, adults: 4 },
    id: 20,
    imgSrc: [
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      'https://firebasestorage.googleapis.com/v0/b/toxin-…=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
    ],
    number: 222,
    price: 11423,
    rating: 5,
    reviewsAmount: 99,
    roomAmenities: { bedrooms: 2, beds: 4, bathrooms: 0 },
    rules: { allowSmoke: true, allowGuests: true, allowPets: false },
    type: 'Люкс',
  },
];

const filters = {
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

const user = {
  id: '',
  name: '',
  surname: '',
  email: '',
  birthday: '',
  gender: '',
  getSpecOffers: false,
  likes: [],
};
  
const booking = {
  data: [
    {
      date: { from: '21.08.2022', to: '31.08.2022' },
      guests: { adults: 2, baby: 2, kids: 2 },
      totalCost: 2000,
      imgSrc: [''],
      number: 123,
      price: 20000,
      rating: 3,
      reviewsAmount: 10,
      type: '',
    },
  ],
  status: 'fulfilled',
};

export const preloadedState = {
  rooms: { current: currentRooms },
  searchFilters: filters,
  user,
  booking
};
