import LevelText from "./LevelText";
import highlightMatches from "../utils/highlightMatches";
import insertMatches from "../utils/insertMatches";
import getMatchPositions from "../utils/getMatchPositions";
import insertSpanTags from "../utils/insertSpanTags";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { LevelData } from "../types";

const LevelTemplate = ({ data }: { data: LevelData }) => {
  const outputText = insertMatches(data.text, data.matches);
  const matchPositions = getMatchPositions(outputText, data.matches);
  const matchIndexes = [...matchPositions.keys()];
  const initialJsx = highlightMatches(outputText, matchIndexes);

  const [jsx, setJsx] = useState(initialJsx);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setJsx(initialJsx);
    if (ref.current) ref.current.value = "";
  }, [data]);

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
      <div className="instructions">{data.instructions}</div>
      <input type="text" onChange={(e) => handleRegex(e)} ref={ref}></input>
      <LevelText key={uuidv4()}>{jsx}</LevelText>
    </div>
  );
};

export default LevelTemplate;
