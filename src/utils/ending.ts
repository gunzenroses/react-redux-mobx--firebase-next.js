const ending = (value: number, words: string[]) => {
  const hundredthPart = Math.abs(value) % 100;
  const decimalPart = value % 10;
  if (hundredthPart > 10 && hundredthPart < 20) {
    return words[2];
  }
  if (decimalPart > 1 && decimalPart < 5) {
    return words[1];
  }
  if (decimalPart === 1) {
    return words[0];
  }
  return words[2];
};

export { ending };
