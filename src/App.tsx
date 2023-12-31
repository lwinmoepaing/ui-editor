import Editor from "./components/Editor/Editor";
import "./global.css";
import "./components/Editor/EditorStyles/editor.global.css";
function App() {
  return (
    <div className="app-container">
      <Editor onChange={() => {}} placeHolder="Enter Text for Lexical Editor" />
    </div>
  );
}

export default App;
