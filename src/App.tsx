import "./css/index.css";
import LevelTemplate from "./components/LevelTemplate";
import { useState } from "react";
import levelData from "./data/levelData";

function App() {
  const [level, setLevel] = useState(0);

  const isPrevLevel = level > 0;
  const isNextLevel = level < levelData.length - 1;

  function prevClickHandler() {
    setLevel((l) => Math.max(--l, 0));
  }

  function nextClickHandler() {
    setLevel((l) => Math.min(++l, levelData.length - 1));
  }

  return (
    <>
      <LevelTemplate levelData={levelData[level]} />
      {isPrevLevel && (
        <button onClick={prevClickHandler}>Previous Level</button>
      )}
      {isNextLevel && <button onClick={nextClickHandler}>Next Level</button>}
    </>
  );
}

export default App;
