import insertLineBreaks from "./insertLineBreaks";

export default function highlightMatches(
  text: string,
  matchPositions: number[][]
): (string | JSX.Element)[] {
  const jsx: (string | JSX.Element)[] = [];
  let currentIndex = 0;

  matchPositions.forEach((match) => {
    const head = text.slice(currentIndex, match[0]);
    if (head) jsx.push(head);
    jsx.push(<span className="match">{text.slice(...match)}</span>);
    currentIndex = match[1];
  });

  const tail = text.slice(currentIndex);
  if (tail) jsx.push(tail);

  const formatJsx = jsx.map((ele) =>
    typeof ele === "string" ? insertLineBreaks(ele) : ele
  );

  return formatJsx.flat();
}
