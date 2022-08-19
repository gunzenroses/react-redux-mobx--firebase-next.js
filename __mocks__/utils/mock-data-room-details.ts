const roomInfo = {
  id: 0,
  imgSrc: [],
  number: 826,
  price: 6070,
  rating: 4,
  reviewsAmount: 49,
  type: '',
  freeDays: {
    from: '2022-10-06T06:23:24.855Z',
    to: '2022-11-15T01:32:35.005Z',
  },
  rules: {
    allowSmoke: true,
    allowPets: false,
    allowGuests: true,
  },
  accessibility: {
    wideCorridor: false,
    assistant: false,
  },
  additionalFacilities: {
    breakfast: true,
    writingDesk: false,
    feedingChair: true,
    crib: true,
    tv: false,
    shampoo: false,
  },
  guests: {
    adults: 2,
    kids: 3,
    baby: 5,
  },
  roomAmenities: {
    bedrooms: 2,
    beds: 1,
    bathrooms: 1,
  },
};
const user = {
  getSpecOffers: false,
  birthday: '{"seconds":942256800,"nanoseconds":0}',
  email: 'zxc@zxc.zxc',
  likes: [
    { comments: [2, 1], room: '109' },
    { comments: [1, 0], room: '128' },
  ],
  name: 'test',
  gender: 'female',
  rooms: [
    {
      guests: { kids: 0, baby: 2, adults: 2 },
      reviewsAmount: 73,
      rules: { allowSmoke: false, allowGuests: true, allowPets: false },
      accessibility: { assistant: false, wideCorridor: true },
      additionalFacilities: {
        feedingChair: false,
        writingDesk: true,
        tv: false,
        shampoo: false,
        crib: true,
        breakfast: true,
      },
      totalCost: 13646,
      type: 'Люкс',
      freeDays: {
        to: '2022-10-23T14:54:43.508Z',
        from: '2022-12-29T02:36:09.034Z',
      },
      date: {
        from: 'Thu Jul 14 2022 00:00:00 GMT+0700 (Новосибирск, стандартное время)',
        to: 'Sun Jul 17 2022 00:00:00 GMT+0700 (Новосибирск, стандартное время)',
      },
      imgSrc: [
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-128.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-128.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-128.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-128.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      ],
      number: 670,
      price: 5175,
      roomAmenities: { bedrooms: 3, beds: 2, bathrooms: 1 },
      rating: 3,
      id: 128,
    },
    {
      number: 802,
      additionalFacilities: {
        shampoo: true,
        writingDesk: true,
        breakfast: true,
        feedingChair: false,
        tv: true,
        crib: false,
      },
      guests: { adults: 1, baby: 0, kids: 0 },
      imgSrc: [
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-87.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-87.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-87.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
        'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-87.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e',
      ],
      date: {
        to: 'Sat Jul 30 2022 00:00:00 GMT+0700 (Новосибирск, стандартное время)',
        from: 'Mon Jul 18 2022 00:00:00 GMT+0700 (Новосибирск, стандартное время)',
      },
      type: '',
      accessibility: { assistant: true, wideCorridor: true },
      roomAmenities: { beds: 1, bedrooms: 3, bathrooms: 3 },
      price: 5382,
      freeDays: {
        from: '2022-07-28T04:20:11.990Z',
        to: '2022-09-14T17:45:10.994Z',
      },
      id: 87,
      rules: { allowSmoke: true, allowGuests: false, allowPets: false },
      reviewsAmount: 93,
      rating: 1,
      totalCost: 62705,
    },
  ],
  surname: 'testov',
  id: 'a9ZGpBVqvYMHbJXWmu7CxOCyk4e2',
  isAuth: true,
};
const roomDetails = {
  id: '109',
  comments: [
    {
      text: 'Я забронировал проживание в этом отеле и был приятно удивлен полученным опытом. Персонал дружелюбный, номера чистые, он находится в прекрасном месте для моих нужд - этот отель почти идеально подходит для моих путешествий.',
      isPressed: true,
      likes: 15,
      name: 'Екатерина Филатова',
      img: 'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/comments%2FЕкатерина.jpg?alt=media&token=292b4734-11d8-4d59-a57f-2df6bfa56291',
      time: 1656519475863,
    },
    {
      text: 'Я много путешествую по работе и всегда останавливаюсь в этом отеле. У них лучший сервис и номера вокруг. Для тех, кто ищет отличный отель, я бы порекомендовал отель.',
      time: 1656519475863,
      img: 'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/comments%2FВероника.jpg?alt=media&token=292b4734-11d8-4d59-a57f-2df6bfa56291',
      name: 'Вероника Смирнова',
      likes: 39,
      isPressed: false,
    },
    {
      likes: 32,
      img: 'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/comments%2FВероника.jpg?alt=media&token=292b4734-11d8-4d59-a57f-2df6bfa56291',
      text: 'Это единственный отель, который никогда меня не подводил — всегда отличные отзывы, приемлемая цена и лучшее обслуживание клиентов. Номера всегда чистые и ухоженные, что для меня огромный плюс. Единственное, что я хотел бы улучшить, это их местоположение.',
      isPressed: false,
      time: 1656519475863,
      name: 'Вероника Никитина',
    },
  ],
  impressions: { crap: 55, great: 182, good: 73, ok: 181 },
  rules: ['Нельзя с питомцами', 'Залог - 50%'],
  info: [
    {
      title: 'Комфорт',
      text: 'Шумопоглощающие стены',
      img: 'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/roomInfo%2Finsert-emoticon.png?alt=media&token=fea01d06-e5d3-4baa-8b07-d530e9038844',
    },
    {
      text: 'Номер оснащён камином',
      img: 'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/roomInfo%2Finsert-emoticon.png?alt=media&token=fea01d06-e5d3-4baa-8b07-d530e9038844',
      title: 'Удобство',
    },
    {
      title: 'Комфорт',
      img: 'https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/roomInfo%2Finsert-emoticon.png?alt=media&token=fea01d06-e5d3-4baa-8b07-d530e9038844',
      text: 'Номер оснащён камином',
    },
  ],
  isFetching: false,
  isRejected: false,
};
const freeDays = { from: null, to: null };
const guests = { kids: 0, adults: 0, baby: 0 };

export { roomInfo, user, roomDetails, freeDays, guests };
