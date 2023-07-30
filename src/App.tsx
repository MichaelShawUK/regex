import Regex from "./components/Regex";
import LevelText from "./components/LevelText";
import "./css/index.css";

function App() {
  const text = "07542 456179";
  return (
    <>
      <Regex initialText={text} />
      <LevelText />
    </>
  );
}

export default App;
