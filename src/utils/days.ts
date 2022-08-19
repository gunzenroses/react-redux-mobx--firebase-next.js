function getPeriodBetweenDates(newDate: FreeDays): number {
  if (typeof newDate.to === 'string' && typeof newDate.from === 'string') {
    const difference =
      new Date(newDate.to).getTime() - new Date(newDate.from).getTime();
    return difference / (1000 * 3600 * 24);
  }
  if (typeof newDate.to !== 'string' || typeof newDate.from !== 'string') {
    return 0;
  }
  throw new Error('wrong length of date');
}

export { getPeriodBetweenDates };
