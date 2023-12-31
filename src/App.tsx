import Editor from "./components/Editor/Editor";
import "./global.css";
import "./editor.css";
function App() {
  return (
    <>
      <Editor onChange={() => {}} placeHolder="Enter Text for Lexical Editor" />
    </>
  );
}

export default App;
