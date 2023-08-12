import LevelText from "./LevelText";
import insertSpanTags from "../utils/insertSpanTags";
import { useState, useEffect, useRef } from "react";
import { LevelTemplateProps } from "../types";

const LevelTemplate = ({ levelData }: LevelTemplateProps) => {
  const [highlightedText, setHighlightedText] = useState(levelData.initialJsx);
  const regexInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHighlightedText(levelData.initialJsx);
    if (regexInputRef.current) regexInputRef.current.value = "";
  }, [levelData]);

  function regexInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (!input) {
      setHighlightedText(levelData.initialJsx);
      return;
    }

    try {
      const regex = new RegExp(input, "g");
      const matches = [...levelData.text.matchAll(regex)];
      const regexPositions = new Map<number[], string>();

      matches.forEach((match) => {
        if (typeof match.index !== "number") return;
        regexPositions.set(
          [match.index, match.index + match[0].length],
          match[0]
        );
      });

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
        ref={regexInputRef}
      ></input>
      <LevelText>{highlightedText}</LevelText>
    </div>
  );
};

export default LevelTemplate;
