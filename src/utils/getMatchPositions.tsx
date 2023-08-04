function getMatchPositions(
  text: string,
  matches: string[]
): Map<string, number[]> {
  const matchPositions = new Map();

  matches.forEach((match) => {
    const startIndex = text.indexOf(match);
    matchPositions.set(match, [startIndex, startIndex + match.length]);
  });

  return matchPositions;
}

export default getMatchPositions;
