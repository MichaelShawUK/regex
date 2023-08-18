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
        style={{ backgroundColor: isCorrect ? "#87c787" : "white" }}
      ></input>
      <div className="output-section">
        <div>
          <h3>Desired Output</h3>
          <p className="monospace">{strNewLineToBr(props.desiredOutput)}</p>
        </div>
        <div>
          <h3>Current Output</h3>
          <p
            className="monospace current-output"
            style={{ color: isCorrect ? "#87c787" : "#ce9090" }}
          >
            {strNewLineToBr(props.currentOutput)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReplaceSection;
