function isWithin(num: number, range: number[]): boolean {
  return num >= range[0] && num < range[1];
}

export default isWithin;
