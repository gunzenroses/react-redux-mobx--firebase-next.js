const defaultRoom = {
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
  number: 156,
  price: 11423,
  rating: 5,
  reviewsAmount: 99,
  roomAmenities: { bedrooms: 2, beds: 4, bathrooms: 0 },
  rules: { allowSmoke: false, allowGuests: true, allowPets: false },
  type: 'Люкс',
};

const testFilters: Filters = {
  accessibility: { wideCorridor: false, assistant: false },
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

const cancellationPolicy =
  'Бесплатная отмена в течение 48 ч. После этого при отмене не позднее чем за 5 дн. до прибытия вы получите полный возврат за вычетом сбора за услуги.';

export { defaultRoom, testFilters, cancellationPolicy };
