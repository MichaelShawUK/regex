export default function StrNewLineToBr(str: string): (string | JSX.Element)[] {
  const jsx: (string | JSX.Element)[] = [];
  const newLines = [...str.matchAll(/\n/g)];

  if (newLines.length === 0) {
    jsx.push(str);
    return jsx;
  }

  let currentIndex = 0;

  newLines.forEach((newLine) => {
    const head = newLine.input?.slice(currentIndex, newLine.index);
    if (head) jsx.push(head);
    jsx.push(<br></br>);
    if (typeof newLine.index === "number") currentIndex = newLine.index + 1;
  });

  const tail = str.slice(currentIndex);
  if (tail) jsx.push(tail);

  return jsx;
}
