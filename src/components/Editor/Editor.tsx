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
import BannerPlugin from "./EditorPlugins/BannerPlugin/BannerPlugin";
import CustomFocusPlugin from "./EditorPlugins/CustomFocusPlugin/CustomFocusPlugin";
import MeowPartyEmojiPlugin from "./EditorPlugins/MeowPartyEmojiPlugin/MeowPartyEmojiPlugin";
import OnChangePlugin from "./EditorPlugins/OnChangePlugin/OnChangePlugin";
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
      <LexicalComposer initialConfig={editorConfig}>
        {/* Start: From Lexical */}
        <div className="richtext-editor">
          <RichTextPlugin
            contentEditable={<ContentEditable autoFocus={true} />}
            placeholder={
                <EditorPlaceHolder>{placeHolder}</EditorPlaceHolder>

            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />
        </div>

        {/* Start: Custom Components And Plugins */}
        <>
          <BannerPlugin />
          <MeowPartyEmojiPlugin />
          <EditorActions />
          <EditorSideActions />
          <CustomFocusPlugin />
          <OnChangePlugin onChange={onChange} />
        </>
      </LexicalComposer>
    </div>
  );
}
