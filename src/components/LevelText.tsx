import dedent from "dedent";

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
                    SW@P`;

let output = text;

const matchIndexes = new Map();

for (const match of matches) {
  const startIndex = output.search("SW@P");
  matchIndexes.set(match, [startIndex, startIndex + match.length]);
  output = output.replace("SW@P", match);
}

console.log(output);
console.log(matchIndexes);

const jsx: (string | JSX.Element)[] = [];
const positions = [...matchIndexes.values()];
let currentPosition = 0;
for (const position of positions) {
  if (position[0] > currentPosition) {
    jsx.push(output.slice(currentPosition, position[0]));
    currentPosition = position[0];
  }
  if (currentPosition === position[0]) {
    jsx.push(<span className="match">{output.slice(...position)}</span>);
    currentPosition = position[1];
  }
}

const lastPosition = [...positions.slice(-1)][0][1];
console.log(lastPosition);

jsx.push(output.slice(lastPosition));

// const jsxUpdated = jsx.map((ele) => {
//   if (typeof ele === "string") {
//     console.log(str);
//   }
// });

console.log(jsx);

const LevelText = () => {
  return (
    <div>
      <p>{jsx}</p>
    </div>
  );
};

export default LevelText;
