import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as stylex from "@stylexjs/stylex";
import React, { PropsWithChildren } from "react";
import { placeHolderStyle as style } from "../../EditorStyles/editor.styles";

const EditorPlaceHolder: React.FC<PropsWithChildren> = ({ children }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <div {...stylex.props(style.container)}>
      <p {...stylex.props(style.placeHolder)} onClick={() => editor.focus()}>
        {children ? children : "Place Holder"}
      </p>
    </div>
  );
};
export default EditorPlaceHolder;
