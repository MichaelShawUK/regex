import strNewLineToBr from "../utils/strNewLineToBr";
import outputsMatch from "../utils/outputsMatch";
import { ReplaceSectionProps } from "../types";

const ReplaceSection = (props: ReplaceSectionProps) => {
  const isCorrect = outputsMatch(props.desiredOutput, props.currentOutput);

  return (
    <div className="replace-section">
      <input
        type="text"
        placeholder="Replace with..."
        className="monospace"
        onChange={props.onReplaceInput}
      ></input>
      <div className="output-section">
        <div>
          <h3>Desired Output</h3>
          <p className="monospace">{strNewLineToBr(props.desiredOutput)}</p>
        </div>
        <div>
          <h3>Current Output</h3>
          <p
            className="monospace"
            style={{ color: isCorrect ? "green" : "red" }}
          >
            {strNewLineToBr(props.currentOutput)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReplaceSection;
