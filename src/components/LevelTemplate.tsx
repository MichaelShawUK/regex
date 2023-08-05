import LevelText from "./LevelText";
import dedent from "dedent";
import highlightMatches from "../utils/highlightMatches";
import insertMatches from "../utils/insertMatches";
import getMatchPositions from "../utils/getMatchPositions";
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
const matchPositions = [...getMatchPositions(outputText, matches).keys()];
const initialJsx = highlightMatches(outputText, matchPositions);

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
      console.log(matches);
      const regexPositions = new Map();
      matches.forEach((match) => {
        console.log(match);
        if (typeof match.index !== "number") return;
        console.log("GOOOOOOOOOOO");
        regexPositions.set(
          [match.index, match.index + match[0].length],
          match[0]
        );
      });
      console.log(regexPositions);
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
