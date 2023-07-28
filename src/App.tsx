import Regex from "./components/Regex";
import "./css/index.css";

function App() {
  const text = "07542 456179";
  return (
    <>
      <Regex initialText={text} />
    </>
  );
}

export default App;
