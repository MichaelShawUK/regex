function insertMatches(text: string, matches: string[]): string {
  matches.forEach((match) => {
    text = text.replace("SW@P", match);
  });

  return text;
}

export default insertMatches;
