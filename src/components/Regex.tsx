import { useState } from "react";

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
          switch (match[0].length) {
            case 0:
              output.push(match.input.slice(lastIndex, match.index));
              output.push(<span className="selected" key={match.index}></span>);
              lastIndex = match.index;
              break;

            default:
              output.push(match.input.slice(lastIndex, match.index));
              output.push(
                <span className="selected" key={match.index}>
                  {match[0]}
                </span>
              );

              lastIndex = match.index + match[0].length;
          }
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
