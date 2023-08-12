import LevelText from "./LevelText";
import insertSpanTags from "../utils/insertSpanTags";
import getRegexPositions from "../utils/getRegexPositions";
import { useState } from "react";
import { LevelTemplateProps } from "../types";

const LevelTemplate = ({ levelData }: LevelTemplateProps) => {
  const [highlightedText, setHighlightedText] = useState(levelData.initialJsx);

  function regexInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    if (!input) {
      setHighlightedText(levelData.initialJsx);
      return;
    }

    try {
      const regex = new RegExp(input, "g");
      const regexPositions = getRegexPositions(levelData.text, regex);

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
      <input type="text" onChange={(e) => regexInputHandler(e)}></input>
      <LevelText>{highlightedText}</LevelText>
    </div>
  );
};

export default LevelTemplate;
