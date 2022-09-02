const timeOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const toLocalTimeOptions = (date: Date | string): string => {
  if (typeof date === 'string') return new Date(date).toLocaleString([], timeOptions);
  return date.toLocaleString([], timeOptions)
}

export {timeOptions, toLocalTimeOptions};