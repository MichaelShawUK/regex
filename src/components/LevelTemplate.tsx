import LevelText from "./LevelText";
import dedent from "dedent";
import highlightMatches from "../utils/highlightMatches";
import insertMatches from "../utils/insertMatches";
import getMatchPositions from "../utils/getMatchPositions";
import insertSpanTags from "../utils/insertSpanTags";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const matches = [
  "07123456789",
  "07123 456789",
  "+447123456789",
  "+44 7123 456789",
];

const text = dedent`07123 45678
                    abcSW@P
                    0712345678
                    1.23SW@P
                    071234567890777777777777777777777788888888888SW@P55555
                    07123 45678
                    0712345678C
                    +44712345678
                    SW@P
                    asdf
                    abc def z
                    
                    ghi
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
    } catch {
      setJsx(initialJsx);
    }
  }

  return (
    <div className="level-template">
      <input type="text" onChange={(e) => handleRegex(e)}></input>
      <LevelText key={uuidv4()}>{jsx}</LevelText>
    </div>
  );
};

export default LevelTemplate;
