import { LevelTextProps } from "../types";
import getHighlightedText from "../utils/getHighlightedText";

const LevelText = ({ text, matchPositions, regex }: LevelTextProps) => {
  const highlightedText = getHighlightedText(text, matchPositions, regex);

  return (
    <div className="level-text">
      <pre className="monospace">{highlightedText}</pre>
    </div>
  );
};

export default LevelText;
