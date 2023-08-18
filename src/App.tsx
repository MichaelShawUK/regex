import "./css/index.css";
import LevelTemplate from "./components/LevelTemplate";
import { useState } from "react";
import templateData from "./data/templateData";

function App() {
  const [level, setLevel] = useState(0);

  const isPrevLevel = level > 0;
  const isNextLevel = level < templateData.length - 1;

  function prevClickHandler() {
    setLevel((l) => Math.max(--l, 0));
  }

  function nextClickHandler() {
    setLevel((l) => Math.min(++l, templateData.length - 1));
  }

  return (
    <>
      <LevelTemplate key={level} templateData={templateData[level]} />
      {isPrevLevel && (
        <button onClick={prevClickHandler}>Previous Level</button>
      )}
      {isNextLevel && <button onClick={nextClickHandler}>Next Level</button>}
    </>
  );
}

export default App;
