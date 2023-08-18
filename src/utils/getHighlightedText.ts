import getRegexPositions from "./getRegexPositions";
import insertSpanTags from "./insertSpanTags";

function getHighlightedText(
  text: string,
  matchPositions: Map<number[], string>,
  regex: RegExp
): (string | JSX.Element)[] {
  const regexPositions = getRegexPositions(text, regex);
  const highlightedText = insertSpanTags(text, regexPositions, matchPositions);

  return highlightedText;
}

export default getHighlightedText;
