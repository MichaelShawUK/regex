import LevelText from "./LevelText";
import ReplaceSection from "./ReplaceSection";
import { useState } from "react";
import { LevelTemplateProps } from "../types";
import getHighlightedText from "../utils/getHighlightedText";
import allMatchesFound from "../utils/allMatchesFound";

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

  const isCorrect = allMatchesFound(
    templateData.text,
    templateData.matches,
    userInput.regex
  );
  const isReplaceLevel = typeof templateData.reference === "string";

  return (
    <div className="level-template">
      <div className="instructions">{templateData.instructions}</div>
      <input
        type="text"
        onChange={(e) => regexInputHandler(e)}
        className="monospace"
        style={{ backgroundColor: isCorrect ? "#87c787" : "white" }}
      ></input>
      <LevelText>{highlightedText}</LevelText>
      {isReplaceLevel && (
        <ReplaceSection
          desiredOutput={templateData.reference}
          currentOutput={currentOutput}
          onReplaceInput={replacementInputHandler}
        />
      )}
    </div>
  );
};

export default LevelTemplate;
