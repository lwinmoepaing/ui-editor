// Lexical Editor Hooks
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

// Types
import { $getRoot } from "lexical";

interface IOnChangeProps {
  plainText: string;
  editorText: string;
}

const OnChangePlugin = ({
  onChange,
}: {
  onChange?: (data: IOnChangeProps) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const rawPlainText = root.getTextContent();
        const plainText = rawPlainText.replace(/\n/g, " ");

        // Editor State to String
        const editorStateJSON = editorState.toJSON();
        const editorText = JSON.stringify(editorStateJSON);

        // When OnChange Sendback to the Parent
        if (onChange) {
          onChange({
            plainText,
            editorText,
          });
        }
      });
    });
  }, [editor, onChange]);
  return null;
};
export default OnChangePlugin;
