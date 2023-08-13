import strNewLineToBr from "../utils/strNewLineToBr";
import { ReplaceSectionProps } from "../types";
import { useState } from "react";

const ReplaceSection = (props: ReplaceSectionProps) => {
  const [replaceValue, setReplaceValue] = useState("");

  function replaceInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setReplaceValue(event.target.value);
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
          <p className="monospace">
            {strNewLineToBr(
              props.text.replace(props.enteredRegex, replaceValue)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReplaceSection;
