import LevelText from "./LevelText";
import dedent from "dedent";
import highlightMatches from "../utils/highlightMatches";
import insertMatches from "../utils/insertMatches";
import getMatchPositions from "../utils/getMatchPositions";
import isWithin from "../utils/isWithin";
import { useState } from "react";

const matches = [
  "07123456789",
  "07123 456789",
  "+447123456789",
  "+44 7123 456789",
];

const text = dedent`07123 45678
                    abcSW@Pabc
                    0712345678
                    1.23SW@P4567
                    071234567890
                    07123 45678
                    +44712345678
                    SW@P|SW@P
                    asdf
                    abc def z
                    `;

const outputText = insertMatches(text, matches);
const matchPositions = getMatchPositions(outputText, matches);
const matchIndexes = [...matchPositions.keys()];
const initialJsx = highlightMatches(outputText, matchIndexes);

const LevelTemplate = () => {
  const [jsx, setJsx] = useState(initialJsx);

  function handleRegex(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (!input) {
      setJsx(initialJsx);
      return;
    }

    try {
      const regex = new RegExp(input, "g");
      const matches = [...outputText.matchAll(regex)];
      const regexPositions = new Map<number[], string>();
      matches.forEach((match) => {
        if (typeof match.index !== "number") return;
        regexPositions.set(
          [match.index, match.index + match[0].length],
          match[0]
        );
      });

      setJsx(insertSpanTags(outputText, regexPositions, matchPositions));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="level-template">
      <input type="text" onChange={(e) => handleRegex(e)}></input>
      <LevelText>{jsx}</LevelText>
    </div>
  );
};

export default LevelTemplate;

function insertSpanTags(
  text: string,
  regexPos: Map<number[], string>,
  matchPos: Map<number[], string>
) {
  let currentIndex = 0;
  const jsx: (string | JSX.Element)[] = [];
  const matches = [...matchPos.entries()];
  const selection = [...regexPos.entries()];
  let nextMatch = matches.shift();
  let nextRegex = selection.shift();

  while (currentIndex < text.length) {
    console.log("\n\n***START***\n\n");

    // if (typeof nextMatch === "undefined" || typeof nextRegex === "undefined")
    //   return jsx;

    if (typeof nextMatch === "undefined") {
      nextMatch = [[text.length, text.length], ""];
    }

    if (typeof nextRegex === "undefined") {
      nextRegex = [[text.length, text.length], ""];
    }

    if (currentIndex >= nextMatch[0][1]) nextMatch = matches.shift();
    if (currentIndex >= nextRegex[0][1]) nextRegex = selection.shift();

    // if (typeof nextMatch === "undefined" || typeof nextRegex === "undefined")
    //   return jsx;

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
      jsx.push(<span className="selected">{selectedText}</span>);
      currentIndex += selectedText.length;
    } else if (isWithin(currentIndex, nextMatch[0])) {
      const matchText = text.slice(
        currentIndex,
        Math.min(nextRegex[0][0], nextMatch[0][1])
      );
      jsx.push(<span className="match">{matchText}</span>);
      currentIndex += matchText.length;
    } else if (isWithin(currentIndex, nextRegex[0])) {
      const invalidText = text.slice(
        currentIndex,
        Math.min(nextRegex[0][1], nextMatch[0][0])
      );
      jsx.push(<span className="invalid">{invalidText}</span>);
      currentIndex += invalidText.length;
    }

    // if (matches.length === 0 || selection.length === 0) {
    //   currentIndex = text.length;
    // }
  }

  return jsx;
}
