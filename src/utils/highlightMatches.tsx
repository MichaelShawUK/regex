import addLineBreaks from "./addLinesBreaks";
import { v4 as uuidv4 } from "uuid";

export default function highlightMatches(
  text: string,
  matchPositions: number[][]
): (string | JSX.Element)[] {
  const jsx: (string | JSX.Element)[] = [];
  let currentIndex = 0;

  matchPositions.forEach((match) => {
    const head = text.slice(currentIndex, match[0]);
    if (head) jsx.push(head);
    jsx.push(
      <span className="highlight match" key={uuidv4()}>
        {text.slice(...match)}
      </span>
    );
    currentIndex = match[1];
  });

  const tail = text.slice(currentIndex);
  if (tail) jsx.push(tail);

  const formatJsx = addLineBreaks(jsx);

  return formatJsx.flat();
}
