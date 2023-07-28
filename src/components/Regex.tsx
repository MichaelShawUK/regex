import { useState } from "react";
import { RegexProps } from "../types";

function highlightText(key: number, text = ""): JSX.Element {
  return (
    <span className="selected" key={key}>
      {text}
    </span>
  );
}

const Regex = ({ initialText }: RegexProps) => {
  const [text, setText] = useState<(JSX.Element | string)[]>([initialText]);

  function handleRegex(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (!input) {
      setText([initialText]);
      return;
    }

    try {
      const regex = new RegExp(input, "g");
      const matches = [...initialText.matchAll(regex)];
      const output: (JSX.Element | string)[] = [];
      let lastIndex = 0;

      matches.forEach((match) => {
        if (match.input && typeof match.index === "number") {
          output.push(match.input.slice(lastIndex, match.index));
          output.push(highlightText(match.index, match[0]));
          lastIndex = match.index + match[0].length;
        }
      });

      output.push(initialText.slice(lastIndex));
      setText(output);
    } catch {
      setText([initialText]);
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
