function insertLineBreaks(str: string): (JSX.Element | string)[] {
  let currentIndex = 0;
  const output = [];

  for (const newLine of [...str.matchAll(/\n/g)]) {
    const line = newLine.input?.slice(currentIndex, newLine.index);
    if (line) output.push(line.trim());
    output.push(<br></br>);
    if (newLine.index) currentIndex = newLine.index + 1;
  }

  const tail = str.slice(currentIndex);
  if (tail) output.push(tail.trim());
  return output;
}

export default insertLineBreaks;
