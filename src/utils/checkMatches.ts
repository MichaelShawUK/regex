export default function checkMatches(text: string, matches: string[]) {
  const placeholders = text.match(/SW@P/g)?.length;
  const matchCount = matches.length;
  if (placeholders !== matchCount) {
    throw new Error(
      `Expected ${placeholders} strings to match but received ${matchCount}.`
    );
  }
}
