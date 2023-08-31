import "./css/index.css";
import LevelTemplate from "./components/LevelTemplate";
import LevelButtons from "./components/LevelButtons";
import { useState } from "react";
import templateData from "./data/templateData";

function App() {
  const [level, setLevel] = useState(0);
  const MAX_LEVEL = templateData.length - 1;

  function prevLevelHandler() {
    setLevel((l) => Math.max(--l, 0));
  }

  function nextLevelHandler() {
    setLevel((l) => Math.min(++l, MAX_LEVEL));
  }

  return (
    <>
      <LevelTemplate key={level} templateData={templateData[level]} />
      <LevelButtons
        level={level}
        maxLevel={MAX_LEVEL}
        onPrevLevel={prevLevelHandler}
        onNextLevel={nextLevelHandler}
      />
    </>
  );
}

export default App;
