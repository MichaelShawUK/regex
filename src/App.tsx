import "./css/index.css";
import LevelTemplate from "./components/LevelTemplate";
import { useState } from "react";
import levelData from "./data/levelData";

function App() {
  const [level, setLevel] = useState(0);

  return (
    <>
      <LevelTemplate levelData={levelData[level]} />
      {level > 0 && (
        <button
          onClick={() => {
            setLevel((l) => Math.max(--l, 0));
          }}
        >
          Previous Level
        </button>
      )}
      {level < levelData.length - 1 && (
        <button
          onClick={() => {
            setLevel((l) => Math.min(++l, levelData.length - 1));
          }}
        >
          Next Level
        </button>
      )}
    </>
  );
}

export default App;
