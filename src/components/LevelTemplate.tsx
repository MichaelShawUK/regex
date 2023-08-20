import LevelText from "./LevelText";
import Instructions from "./Instructions";
import ReplaceSection from "./ReplaceSection";
import { useState } from "react";
import { LevelTemplateProps } from "../types";
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
      const regex = new RegExp(input, "gm");
      setUserInput((prev) => ({ ...prev, regex }));
    } catch {
      setUserInput((prev) => ({ ...prev, regex: new RegExp(/^$/, "g") }));
    }
  }

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
      <Instructions data={templateData.instructions} />
      <input
        type="text"
        onChange={(e) => regexInputHandler(e)}
        className="monospace"
        style={{ backgroundColor: isCorrect ? "#87c787" : "white" }}
      ></input>
      <LevelText
        text={templateData.text}
        regex={userInput.regex}
        matchPositions={templateData.matchPositions}
      />
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
