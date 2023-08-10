import "./css/index.css";
import LevelTemplate from "./components/LevelTemplate";
import { useState } from "react";
import data from "./data/data";

function App() {
  const [level, setLevel] = useState(0);
  console.log(level);

  return (
    <>
      <LevelTemplate data={data[level]} />
      {level > 0 && (
        <button
          onClick={() => {
            setLevel((l) => Math.max(--l, 0));
          }}
        >
          Previous Level
        </button>
      )}
      {level < data.length - 1 && (
        <button
          onClick={() => {
            setLevel((l) => Math.min(++l, data.length - 1));
          }}
        >
          Next Level
        </button>
      )}
    </>
  );
}

export default App;
