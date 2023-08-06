export default function addLineBreaks(
  jsx: (string | JSX.Element)[]
): (string | JSX.Element)[] {
  const formatJsx: (string | JSX.Element)[] = [];

  jsx.forEach((element, index) => {
    console.log(element);
    if (typeof element === "string") {
      const newLines = [...element.matchAll(/\n/g)];
      if (newLines.length === 0) {
        formatJsx.push(element);
        return;
      }

      let currentIndex = 0;

      newLines.forEach((newLine) => {
        if (typeof newLine.index === "number") {
          formatJsx.push(element.slice(currentIndex, newLine.index));
          formatJsx.push(<br></br>);
          currentIndex = newLine.index + 1;
        }
      });
      const tail = element.slice(currentIndex);
      if (tail) formatJsx.push(tail);
    } else {
      const className = element.props.className;
      const text = element.props.children;

      const newLines = [...text.matchAll(/\n/g)];
      if (newLines.length === 0) {
        formatJsx.push(element);
        return;
      }

      let currentIndex = 0;

      newLines.forEach((newLine) => {
        if (typeof newLine.index === "number") {
          formatJsx.push(
            <span className={className}>
              [{text.slice(currentIndex, newLine.index)}, <br></br>]
            </span>
          );
          currentIndex = newLine.index + 1;
        }
      });
      const tail = text.slice(currentIndex);
      if (tail) formatJsx.push(<span className={className}>{tail}</span>);
    }
  });

  console.log(formatJsx);

  return formatJsx;
}
