import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import * as stylex from "@stylexjs/stylex";

// Lexical Editor Plugin
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// Lexical Error Boundaries
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

// Editor Styles
import editorConfig from "./EditorConfig/editor.config";
import { editorStyles } from "./EditorStyles/editor.styles";

// Custom Plugin and Components
import EditorActions from "./EditorComponent/EditorActions/EditorActions";
import EditorPlaceHolder from "./EditorComponent/EditorPlaceHolder/EditorPlaceHolder";
import EditorSideActions from "./EditorComponent/EditorSideActions/EditorSideActions";
import CustomFocusPlugin from "./EditorPlugins/CustomFocusPlugin/CustomFocusPlugin";
import OnChangePlugin from "./EditorPlugins/OnChangePlugin/OnChangePlugin";
import BannerPlugin from "./EditorPlugins/BannerPlugin/BannerPlugin";
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
          {/* Start: Custom Components And Plugins */}
          <>
            <BannerPlugin />
            <EditorActions />
            <EditorSideActions />
            <CustomFocusPlugin />
            <OnChangePlugin onChange={onChange} />
          </>

          {/* Start: From Lexical */}
          <RichTextPlugin
            contentEditable={<ContentEditable autoFocus={true} />}
            placeholder={<EditorPlaceHolder>{placeHolder}</EditorPlaceHolder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />
        </LexicalComposer>
      </div>
    </div>
  );
}
