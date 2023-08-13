import LevelText from "./LevelText";
import ReplaceSection from "./ReplaceSection";
import insertSpanTags from "../utils/insertSpanTags";
import getRegexPositions from "../utils/getRegexPositions";
import { useState } from "react";
import { LevelTemplateProps } from "../types";

const LevelTemplate = ({ levelData }: LevelTemplateProps) => {
  const [highlightedText, setHighlightedText] = useState(levelData.initialJsx);
  const isReplaceLevel = levelData.type === "replace";
  const [enteredRegex, setEnteredRegex] = useState(new RegExp("", "g"));

  function regexInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    if (!input) {
      setHighlightedText(levelData.initialJsx);
      return;
    }

    try {
      const regex = new RegExp(input, "g");
      const regexPositions = getRegexPositions(levelData.text, regex);
      setEnteredRegex(regex);

      setHighlightedText(
        insertSpanTags(levelData.text, regexPositions, levelData.matchPositions)
      );
    } catch {
      setHighlightedText(levelData.initialJsx);
    }
  }

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
        <ReplaceSection
          reference={levelData.reference}
          text={levelData.text}
          enteredRegex={enteredRegex}
        />
      )}
    </div>
  );
};

export default LevelTemplate;
