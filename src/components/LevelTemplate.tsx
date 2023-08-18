import LevelText from "./LevelText";
import strNewLineToBr from "../utils/strNewLineToBr";
import { useState } from "react";
import { LevelTemplateProps } from "../types";
import getHighlightedText from "../utils/getHighlightedText";

const LevelTemplate = ({ templateData }: LevelTemplateProps) => {
  const [userInput, setUserInput] = useState({
    regex: new RegExp(/^$/, "g"),
    replacement: "",
  });

  function replacementInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput((prev) => ({ ...prev, replacement: event.target.value }));
  }

  function regexInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    try {
      if (!input) throw "No input";
      const regex = new RegExp(input, "g");
      setUserInput((prev) => ({ ...prev, regex }));
    } catch {
      setUserInput((prev) => ({ ...prev, regex: new RegExp(/^$/, "g") }));
    }
  }

  const highlightedText = getHighlightedText(
    templateData.text,
    templateData.matchPositions,
    userInput.regex
  );

  const currentOutput = templateData.text.replace(
    userInput.regex,
    userInput.replacement
  );

  const isReplaceLevel = typeof templateData.reference === "string";
  const isCorrect = templateData.reference === currentOutput;

  return (
    <div className="level-template">
      <div className="instructions">{templateData.instructions}</div>
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
            onChange={replacementInputHandler}
          ></input>
          <div className="output-section">
            <div>
              <h3>Desired Output</h3>
              <p className="monospace">
                {strNewLineToBr(templateData.reference)}
              </p>
            </div>
            <div>
              <h3>Current Output</h3>
              <p
                className="monospace"
                style={{ color: isCorrect ? "green" : "red" }}
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
