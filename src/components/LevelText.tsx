import dedent from "dedent";
import highlightMatches from "../utils/highlightMatches";

const matches = [
  "07123456789",
  "07123 456789",
  "+447123456789",
  "+44 7123 456789",
];

const text = dedent`07123 45678
                    abcSW@Pabc
                    0712345678
                    1.23SW@P4567
                    071234567890
                    07123 45678
                    +44712345678
                    SW@P|SW@P
                    asdf
                    abc def z
                    `;

const jsx = highlightMatches(text, matches);

const LevelText = () => {
  return (
    <div>
      <p>{jsx}</p>
    </div>
  );
};

export default LevelText;
