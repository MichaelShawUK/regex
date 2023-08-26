function getMatchPositions(
  text: string,
  matches: string[]
): Map<number[], string> {
  const matchPositions = new Map<number[], string>();
  let position = 0;

  matches.forEach((match) => {
    const startIndex = text.indexOf(match, position);
    position = startIndex + 1;
    matchPositions.set([startIndex, startIndex + match.length], match);
  });

  return matchPositions;
}

export default getMatchPositions;
