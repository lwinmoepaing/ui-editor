import Editor from "./components/Editor/Editor";
import "./global.css";
import "./components/Editor/EditorStyles/editor.global.css";
function App() {
  return (
    <>
      <Editor onChange={() => {}} placeHolder="Enter Text for Lexical Editor" />
    </>
  );
}

export default App;
