type CheckIsRoomSuitable = {
  room: Room;
  filters: Filters;
  key: keyof Filters;
  subKey: keyof InnerFilters;
};

const checkIsRoomSuitable = ({
  room,
  filters,
  key,
  subKey,
}: CheckIsRoomSuitable): boolean => {
  const isUnsuitableBooleanFilter =
    typeof filters[key][subKey] === 'boolean' &&
    room[key][subKey] !== filters[key][subKey];
  const isUnsuitableNumberFilter =
    typeof filters[key][subKey] === 'number' &&
    room[key][subKey] < filters[key][subKey];
  const isUnsuitableDateFilter =
    key === 'freeDays' &&
    ((subKey === 'from' &&
      new Date(room[key][subKey]) > new Date(filters[key][subKey])) ||
      (subKey === 'to' &&
        new Date(room[key][subKey]) < new Date(filters[key][subKey])));

  return (
    isUnsuitableBooleanFilter ||
    isUnsuitableNumberFilter ||
    isUnsuitableDateFilter
  );
};

export { checkIsRoomSuitable };
