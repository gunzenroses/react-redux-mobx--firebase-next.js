type PaginationControl = {
  rooms: BookingData[] | Room[];
  roomsCounter: number;
  currentPage: number;
};

const paginationControl = ({
  rooms,
  roomsCounter,
  currentPage,
}: PaginationControl): BookingData[] | Room[] => {
  const isNotRooms = rooms === null || rooms.length === 0;
  if (isNotRooms) return rooms;

  const start = (currentPage - 1) * roomsCounter;
  const isBiggerThenArray = start + roomsCounter > rooms.length;
  const end = isBiggerThenArray ? rooms.length : start + roomsCounter;

  return rooms.slice(start, end);
};

export { paginationControl };
