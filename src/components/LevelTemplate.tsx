import LevelText from "./LevelText";
import highlightMatches from "../utils/highlightMatches";
import insertMatches from "../utils/insertMatches";
import getMatchPositions from "../utils/getMatchPositions";
import insertSpanTags from "../utils/insertSpanTags";
import strNewLineToBr from "../utils/strNewLineToBr";
import { useState, useEffect, useRef } from "react";
import { LevelData } from "../types";

const LevelTemplate = ({ data }: { data: LevelData }) => {
  const outputText = insertMatches(data.text, data.matches);
  const matchPositions = getMatchPositions(outputText, data.matches);
  const matchIndexes = [...matchPositions.keys()];
  const initialJsx = highlightMatches(outputText, matchIndexes);

  const [jsx, setJsx] = useState(initialJsx);
  // const [regex, setRegex] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setJsx(initialJsx);
    if (ref.current) ref.current.value = "";
  }, [data]);

  // useEffect(() => {
  //   if (ref.current) setRegex(ref.current.value);
  // }, [jsx]);

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

      console.log(outputText.replace(regex, "1"));
    } catch {
      setJsx(initialJsx);
    }
  }

  return (
    <div className="level-template">
      <div className="instructions">{data.instructions}</div>
      <input type="text" onChange={(e) => handleRegex(e)} ref={ref}></input>
      {data.type === "replace" && (
        <input type="text" placeholder="Replace with..."></input>
      )}
      <LevelText>{jsx}</LevelText>
      {data.type === "replace" && <p>{strNewLineToBr(data.reference)} </p>}
    </div>
  );
};

export default LevelTemplate;
