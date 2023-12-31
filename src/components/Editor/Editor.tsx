import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import * as stylex from "@stylexjs/stylex";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Lexical Error Boundaries
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

// Lexical Types
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import EditorPlaceHolder from "./EditorComponent/EditorPlaceHolder/EditorPlaceHolder";
import EditorToolbar from "./EditorComponent/EditorToolbar/EditorToolbar";
import CustomFocusPlugin from "./EditorPlugins/CustomFocusPlugin/CustomFocusPlugin";
import OnChangePlugin from "./EditorPlugins/OnChangePlugin/OnChangePlugin";
import editorTheme from "./EditorStyles/editorTheme";
import { editorStyles } from "./EditorStyles/editor.styles";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

interface IOnChangeProps {
  plainText: string;
  editorText: string;
}

interface IEditorProps {
  placeHolder?: string;
  onChange: (props: IOnChangeProps) => void;
}

export default function Editor({ placeHolder, onChange }: IEditorProps) {
  const initialConfig: InitialConfigType = {
    theme: editorTheme,
    namespace: "StrategistEditor",
    onError: (error: Error) => {
      console.error(error);
    },
  };

  return (
    <>
      <div {...stylex.props(editorStyles.container)}>
        <div className="richtext-editor">
          <LexicalComposer initialConfig={initialConfig}>
            <EditorToolbar />
            <RichTextPlugin
              contentEditable={<ContentEditable autoFocus={true} />}
              placeholder={<EditorPlaceHolder>{placeHolder}</EditorPlaceHolder>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <CustomFocusPlugin />
            <OnChangePlugin onChange={onChange} />
          </LexicalComposer>
        </div>
      </div>
    </>
  );
}
