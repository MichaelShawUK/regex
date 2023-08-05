function getMatchPositions(
  text: string,
  matches: string[]
): Map<number[], string> {
  const matchPositions = new Map();

  matches.forEach((match) => {
    const startIndex = text.indexOf(match);
    matchPositions.set([startIndex, startIndex + match.length], match);
  });

  console.log(matchPositions);
  return matchPositions;
}

export default getMatchPositions;
