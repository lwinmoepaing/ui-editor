import { stylex } from "@stylexjs/stylex";
import { editorToolbarStyles as style } from "../../../../EditorStyles/editor.styles";
import { ElementFormatType, TextFormatType } from "lexical";

const EditorToolbar = ({
  checkActiveButton,
  onClickAction,
}: {
  checkActiveButton: (str: TextFormatType | ElementFormatType) => boolean;
  onClickAction: (str: TextFormatType | ElementFormatType) => void;
}) => {
  return (
    <div {...stylex.props(style.container)}>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("bold") && style.activeButton
        )}
        onClick={() => onClickAction("bold")}
      >
        Bold
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("italic") && style.activeButton
        )}
        onClick={() => onClickAction("italic")}
      >
        Italic
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("underline") && style.activeButton
        )}
        onClick={() => onClickAction("underline")}
      >
        Underline
      </span>

      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("highlight") && style.activeButton
        )}
        onClick={() => onClickAction("highlight")}
      >
        Highlight
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("left") && style.activeButton
        )}
        onClick={() => onClickAction("left")}
      >
        Left
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("right") && style.activeButton
        )}
        onClick={() => onClickAction("right")}
      >
        Right
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("center") && style.activeButton
        )}
        onClick={() => onClickAction("center")}
      >
        Center
      </span>
    </div>
  );
};
export default EditorToolbar;
