import strNewLineToBr from "../utils/strNewLineToBr";
import { ReplaceSectionProps } from "../types";
import { useState } from "react";

const ReplaceSection = (props: ReplaceSectionProps) => {
  const [currentOutput, setCurrentOutput] = useState(props.text);

  function outputsMatch(desiredOutput: string, currentOutput: string): boolean {
    if (desiredOutput === currentOutput) return true;
    return false;
  }

  const isCorrect =
    outputsMatch(props.reference, currentOutput) && props.isCorrectRegex;

  function replaceInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (props.enteredRegex.toString() === "/(?:)/g") {
      setCurrentOutput(props.text);
    } else {
      setCurrentOutput(
        props.text.replace(props.enteredRegex, event.target.value)
      );
    }
  }

  return (
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
          <p className="monospace">{strNewLineToBr(props.reference)}</p>
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
  );
};

export default ReplaceSection;
