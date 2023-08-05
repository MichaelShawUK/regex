function getMatchPositions(
  text: string,
  matches: string[]
): Map<number[], string> {
  const matchPositions = new Map<number[], string>();

  matches.forEach((match) => {
    const startIndex = text.indexOf(match);
    matchPositions.set([startIndex, startIndex + match.length], match);
  });

  return matchPositions;
}

export default getMatchPositions;
