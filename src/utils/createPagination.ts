function createPagination(page: number, size: number) {
  let start = [1];
  let middle = [0];
  let end = [size];
  if (page < 3) {
    start = [1, 2, 3];
  } else if (page < 5) {
    start = Array.from({ length: page + 1 }, (x, i) => i + 1);
  } else if (page > size - 2) {
    end = Array.from({ length: 3 }, (x, i) => i + (size - 2));
  } else if (page > size - 4) {
    end = Array.from({ length: size - page + 2 }, (x, i) => i + (page - 1));
  } else {
    const intro = Array.from({ length: 3 }, (x, i) => i + (page - 1));
    middle = [0].concat(intro, 0);
  }
  if (size < 7) {
    return Array.from({ length: size }, (x, i) => i + 1);
  }
  return start.concat(middle, end);
}

export { createPagination };
