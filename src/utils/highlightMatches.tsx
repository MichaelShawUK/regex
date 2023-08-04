export default function highlightMatches(
  text: string,
  matches: string[]
): (JSX.Element | string)[] {
  const matchIndexes = new Map();

  for (const match of matches) {
    const startIndex = text.search("SW@P");
    matchIndexes.set(match, [startIndex, startIndex + match.length]);
    text = text.replace("SW@P", match);
  }

  const jsx: (string | JSX.Element)[] = [];
  const positions = [...matchIndexes.values()];
  let currentPosition = 0;

  for (const position of positions) {
    if (position[0] > currentPosition) {
      jsx.push(text.slice(currentPosition, position[0]));
      currentPosition = position[0];
    }
    if (currentPosition === position[0]) {
      jsx.push(<span className="match">{text.slice(...position)}</span>);
      currentPosition = position[1];
    }
  }

  const lastPosition = [...positions.slice(-1)][0][1];
  jsx.push(text.slice(lastPosition));

  console.log(jsx);
  // jsx.forEach((child) => {
  //   if (typeof child === "string") insertLineBreaks(child);
  // });

  const jsxU = jsx.map((ele) => {
    if (typeof ele === "string") return insertLineBreaks(ele);
    else return ele;
  });

  // console.log(jsxU);
  // return jsx;
  console.log(jsxU.flat());
  return jsxU.flat();
}

function insertLineBreaks(str: string): (JSX.Element | string)[] {
  let lastIndex = 0;
  // console.log(str);
  console.log([...str.matchAll(/\n/g)]);
  const output = [];
  for (const newLine of [...str.matchAll(/\n/g)]) {
    const line = newLine.input?.slice(lastIndex, newLine.index);
    if (line) output.push(line.trim());
    output.push(<br></br>);
    if (newLine.index) lastIndex = newLine.index + 1;
    // console.log(Boolean(line));
  }
  const tail = str.slice(lastIndex);
  if (tail) output.push(tail.trim());
  // output.push(tail);
  // console.log(output);
  return output;
}
