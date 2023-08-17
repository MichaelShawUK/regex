import LevelText from "./LevelText";
import ReplaceSection from "./ReplaceSection";
import insertSpanTags from "../utils/insertSpanTags";
import strNewLineToBr from "../utils/strNewLineToBr";
import getRegexPositions from "../utils/getRegexPositions";
// import isCorrect from "../utils/isCorrect";
import { useState } from "react";
import { LevelTemplateProps } from "../types";

const LevelTemplate = ({ levelData }: LevelTemplateProps) => {
  // const [highlightedText, setHighlightedText] = useState(levelData.initialJsx);
  // const [enteredRegex, setEnteredRegex] = useState(new RegExp("", "g"));

  const [userInput, setUserInput] = useState({
    regex: new RegExp("", "g"),
    replacement: "",
  });

  // const [currentOutput, setCurrentOutput] = useState(levelData.text);

  function replaceInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput((prev) => {
      return { ...prev, replacement: event.target.value };
    });
  }

  const isReplaceLevel = typeof levelData.reference === "string";
  // const isCorrectRegex = isCorrect(
  //   levelData.text,
  //   levelData.matches,
  //   enteredRegex
  // );

  function regexInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    if (!input) {
      // setHighlightedText(levelData.initialJsx);
      // setEnteredRegex(new RegExp("", "g"));
      setUserInput((prev) => {
        return { ...prev, regex: new RegExp("", "g") };
      });
      return;
    }

    try {
      // const regex = new RegExp(input, "g");
      // const regexPositions = getRegexPositions(levelData.text, regex);
      // setEnteredRegex(regex);
      // setHighlightedText(
      //   insertSpanTags(levelData.text, regexPositions, levelData.matchPositions)
      // );
      const regex = new RegExp(input, "g");
      setUserInput((prev) => {
        return { ...prev, regex: regex };
      });
    } catch {
      // setHighlightedText(levelData.initialJsx);
      // setEnteredRegex(new RegExp("", "g"));
      setUserInput((prev) => {
        return { ...prev, regex: new RegExp("", "g") };
      });
    }
  }

  console.log(userInput.regex);

  const regexPositions = getRegexPositions(levelData.text, userInput.regex);
  const highlightedText = insertSpanTags(
    levelData.text,
    regexPositions,
    levelData.matchPositions
  );

  const currentOutput = levelData.text.replace(
    userInput.regex,
    userInput.replacement
  );

  return (
    <div className="level-template">
      <div className="instructions">{levelData.instructions}</div>
      <input
        type="text"
        onChange={(e) => regexInputHandler(e)}
        className="monospace"
      ></input>
      <LevelText>{highlightedText}</LevelText>
      {isReplaceLevel && (
        <div className="replace-section">
          <input
            type="text"
            placeholder="Replace with..."
            className="monospace"
            onChange={replaceInputHandler}
          ></input>
          <div className="output-section">
            <div>
              <h3>Desired Output</h3>
              <p className="monospace">{strNewLineToBr(levelData.reference)}</p>
            </div>
            <div>
              <h3>Current Output</h3>
              <p
                className="monospace"
                // style={{ color: isCorrect ? "green" : "red" }}
              >
                {strNewLineToBr(currentOutput)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelTemplate;
