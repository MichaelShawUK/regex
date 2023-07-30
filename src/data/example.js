import dedent from "dedent";

const matches = [
  "07123456789",
  "07123 456789",
  "+447123456789",
  "+44 7123 456789",
];

const text = dedent`SW@P
                    SW@P
                    SW@P
                    0712345678
                    SW@P
                    071234567890
                    07123 45678
                    +44712345678`;

let output = text;

const matchIndexes = new Map();

for (const match of matches) {
  const startIndex = output.search("SW@P");
  matchIndexes.set(match, [startIndex, startIndex + match.length]);
  output = output.replace("SW@P", match);
}

console.log(text.replace(/SW@P/g, matches[0]));
console.log(text.length);
console.log(output);
console.log(matchIndexes);
console.log("****");
console.log(output.slice(...matchIndexes.get(matches[3])));
