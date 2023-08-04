import insertLineBreaks from "./insertLineBreaks";

export default function highlightMatches(
  text: string,
  matches: string[]
): (JSX.Element | string)[] {
  const matchIndexes = new Map();

  for (const match of matches) {
    const startIndex = text.search("SW@P");
    matchIndexes.set(match, [startIndex, startIndex + match.length]);
    text = text.replace("SW@P", match);
  }

  const jsx: (string | JSX.Element)[] = [];
  const positions = [...matchIndexes.values()];
  let currentPosition = 0;

  for (const position of positions) {
    if (position[0] > currentPosition) {
      jsx.push(text.slice(currentPosition, position[0]));
      currentPosition = position[0];
    }
    if (currentPosition === position[0]) {
      jsx.push(<span className="match">{text.slice(...position)}</span>);
      currentPosition = position[1];
    }
  }

  const lastPosition = [...positions.slice(-1)][0][1];
  jsx.push(text.slice(lastPosition));

  const formatJSX = jsx.map((ele) =>
    typeof ele === "string" ? insertLineBreaks(ele) : ele
  );

  return formatJSX.flat();
}
