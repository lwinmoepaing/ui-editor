import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import * as stylex from "@stylexjs/stylex";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Lexical Error Boundaries
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

// Custom Plugin and Components
import EditorPlaceHolder from "./EditorComponent/EditorPlaceHolder/EditorPlaceHolder";
import CustomFocusPlugin from "./EditorPlugins/CustomFocusPlugin/CustomFocusPlugin";
import OnChangePlugin from "./EditorPlugins/OnChangePlugin/OnChangePlugin";
import EditorActions from "./EditorComponent/EditorActions/EditorActions";

// Editor Styles
import { editorStyles } from "./EditorStyles/editor.styles";
import editorConfig from "./EditorConfig/editor.config";

interface IOnChangeProps {
  plainText: string;
  editorText: string;
}

interface IEditorProps {
  placeHolder?: string;
  onChange: (props: IOnChangeProps) => void;
}

export default function Editor({ placeHolder, onChange }: IEditorProps) {
  return (
    <>
      <div {...stylex.props(editorStyles.container)}>
        <div className="richtext-editor">
          <LexicalComposer initialConfig={editorConfig}>
            <EditorActions />
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
