import { useState } from "react";

function highlightText(key: number, text = ""): JSX.Element {
  return (
    <span className="selected" key={key}>
      {text}
    </span>
  );
}

const Regex = () => {
  const originalStr = "07542 456179";
  const [text, setText] = useState<(JSX.Element | string)[]>([originalStr]);

  function handleRegex(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (!input) {
      setText([originalStr]);
      return;
    }

    try {
      const regex = new RegExp(input, "g");
      const matches = [...originalStr.matchAll(regex)];
      const output: (JSX.Element | string)[] = [];
      let lastIndex = 0;

      matches.forEach((match) => {
        if (match.input && typeof match.index !== "undefined") {
          output.push(match.input.slice(lastIndex, match.index));

          if (match[0].length === 0) {
            output.push(highlightText(match.index));
          } else {
            output.push(highlightText(match.index, match[0]));
          }

          lastIndex = match.index + match[0].length;
        }
      });

      output.push(originalStr.slice(lastIndex));
      setText(output);
    } catch {
      setText([originalStr]);
    }
  }

  return (
    <>
      <h1>Regex</h1>
      <input type="text" onChange={(e) => handleRegex(e)}></input>
      <p>{text}</p>
    </>
  );
};

export default Regex;
