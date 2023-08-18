const allMatchesFound = (
  text: string,
  matches: string[],
  regex: RegExp
): boolean => {
  const found = [...text.matchAll(regex)].map((find) => find[0]);
  if (matches.length === found.length) {
    for (let i = 0; i < matches.length; i++) {
      if (matches[i] !== found[i]) return false;
    }
    return true;
  }
  return false;
};

export default allMatchesFound;
