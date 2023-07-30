import dedent from "dedent";
import highlightMatches from "../utils/highlightMatches";

const matches = [
  "07123456789",
  "07123 456789",
  "+447123456789",
  "+44 7123 456789",
];

const text = dedent`07123 45678
                    SW@P
                    SW@P
                    SW@P
                    0712345678
                    071234567890
                    07123 45678
                    +44712345678
                    SW@P
                    123456`;

const jsx = highlightMatches(text, matches);

const LevelText = () => {
  return (
    <div>
      <p>{jsx}</p>
    </div>
  );
};

export default LevelText;
