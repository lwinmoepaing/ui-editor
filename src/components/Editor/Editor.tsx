import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import * as stylex from "@stylexjs/stylex";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

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
import EditorSideActions from "./EditorComponent/EditorSideActions/EditorSideActions";

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
    <div {...stylex.props(editorStyles.container)}>
      <div className="richtext-editor">
        <LexicalComposer initialConfig={editorConfig}>
          {/* Start: From Lexical */}
          <RichTextPlugin
            contentEditable={<ContentEditable autoFocus={true} />}
            placeholder={<EditorPlaceHolder>{placeHolder}</EditorPlaceHolder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />

          {/* Start: Custom Components And Plugins */}
          <>
            <EditorActions />
            <EditorSideActions />
            <CustomFocusPlugin />
            <OnChangePlugin onChange={onChange} />
          </>
        </LexicalComposer>
      </div>
    </div>
  );
}
