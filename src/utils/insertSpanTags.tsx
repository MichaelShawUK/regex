import addLineBreaks from "./addLinesBreaks";
import isWithin from "./isWithin";

export default function insertSpanTags(
  text: string,
  regexPos: Map<number[], string>,
  matchPos: Map<number[], string>
) {
  let currentIndex = 0;
  const jsx: (string | JSX.Element)[] = [];
  const matches = [...matchPos.entries()];
  const selection = [...regexPos.entries()];
  const lastRegex = selection[selection.length - 1];
  let nextMatch = matches.shift();
  let nextRegex = selection.shift();

  let eolAnchor: JSX.Element | null = null;

  if (lastRegex[0][0] === text.length && lastRegex[0][1] === text.length) {
    eolAnchor = <span className="highlight selected"></span>;
  }

  while (currentIndex < text.length) {
    if (typeof nextMatch === "undefined" && typeof nextRegex === "undefined") {
      jsx.push(text.slice(currentIndex));
      return jsx;
    }

    if (typeof nextMatch === "undefined") {
      nextMatch = [[text.length, text.length], ""];
    }

    if (typeof nextRegex === "undefined") {
      nextRegex = [[text.length, text.length], ""];
    }

    if (currentIndex === nextRegex[0][0] && currentIndex === nextRegex[0][1]) {
      jsx.push(<span className="highlight selected"></span>);
    }

    if (currentIndex >= nextMatch[0][1]) nextMatch = matches.shift();
    if (currentIndex >= nextRegex[0][1]) nextRegex = selection.shift();

    if (typeof nextMatch === "undefined") {
      nextMatch = [[text.length, text.length], ""];
    }

    if (typeof nextRegex === "undefined") {
      nextRegex = [[text.length, text.length], ""];
    }

    const head = text.slice(
      currentIndex,
      Math.min(nextMatch[0][0], nextRegex[0][0])
    );

    if (head) {
      jsx.push(head);
      currentIndex += head.length;
    } else if (
      isWithin(currentIndex, nextMatch[0]) &&
      isWithin(currentIndex, nextRegex[0])
    ) {
      const selectedText = text.slice(
        currentIndex,
        Math.min(nextMatch[0][1], nextRegex[0][1])
      );
      jsx.push(<span className="highlight selected">{selectedText}</span>);
      currentIndex += selectedText.length;
    } else if (isWithin(currentIndex, nextMatch[0])) {
      const matchText = text.slice(
        currentIndex,
        Math.min(nextRegex[0][0], nextMatch[0][1])
      );
      jsx.push(<span className="highlight match">{matchText}</span>);
      currentIndex += matchText.length;
    } else if (isWithin(currentIndex, nextRegex[0])) {
      const invalidText = text.slice(
        currentIndex,
        Math.min(nextRegex[0][1], nextMatch[0][0])
      );
      jsx.push(<span className="highlight invalid">{invalidText}</span>);
      currentIndex += invalidText.length;
    }
  }

  if (eolAnchor) jsx.push(eolAnchor);

  const formatJsx = addLineBreaks(jsx);
  return formatJsx;
}
