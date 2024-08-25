function repeat<T>(count: number, mapper: (index: number) => T) {
  return [...Array(count)].map((_, index) => mapper(index));
}

export default repeat;
