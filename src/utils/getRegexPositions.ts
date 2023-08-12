const getRegexPositions = (
  text: string,
  regex: RegExp
): Map<number[], string> => {
  const matches = [...text.matchAll(regex)];
  const regexPositions = new Map<number[], string>();

  matches.forEach((match) => {
    if (typeof match.index !== "number") return;
    regexPositions.set([match.index, match.index + match[0].length], match[0]);
  });

  return regexPositions;
};

export default getRegexPositions;
