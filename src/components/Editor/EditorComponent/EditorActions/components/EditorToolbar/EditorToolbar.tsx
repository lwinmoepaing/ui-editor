import { stylex } from "@stylexjs/stylex";
import { editorToolbarStyles as style } from "../../../../EditorStyles/editor.styles";
import { TCustomEditorActionType } from "../../hook/useEditorAction";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiAlignLeft,
  FiAlignRight,
  FiAlignCenter,
} from "react-icons/fi";
import { FaListOl, FaHighlighter } from "react-icons/fa";
const EditorToolbar = ({
  checkActiveButton,
  onClickAction,
}: {
  checkActiveButton: (str: TCustomEditorActionType) => boolean;
  onClickAction: (str: TCustomEditorActionType) => void;
}) => {
  return (
    <div {...stylex.props(style.container)}>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("h1") && style.activeButton
        )}
        onClick={() => onClickAction("h1")}
      >
        H1
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("h2") && style.activeButton
        )}
        onClick={() => onClickAction("h2")}
      >
        H2
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("bold") && style.activeButton
        )}
        onClick={() => onClickAction("bold")}
      >
        <FiBold />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("italic") && style.activeButton
        )}
        onClick={() => onClickAction("italic")}
      >
        <FiItalic />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("underline") && style.activeButton
        )}
        onClick={() => onClickAction("underline")}
      >
        <FiUnderline />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("ol") && style.activeButton
        )}
        onClick={() => onClickAction("ol")}
      >
        <FaListOl />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("ul") && style.activeButton
        )}
        onClick={() => onClickAction("ul")}
      >
        <FiList />
      </span>

      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("highlight") && style.activeButton
        )}
        onClick={() => onClickAction("highlight")}
      >
        <FaHighlighter />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("left") && style.activeButton
        )}
        onClick={() => onClickAction("left")}
      >
        <FiAlignLeft />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("right") && style.activeButton
        )}
        onClick={() => onClickAction("right")}
      >
        <FiAlignRight />
      </span>
      <span
        {...stylex.props(
          style.actionButton,
          checkActiveButton("center") && style.activeButton
        )}
        onClick={() => onClickAction("center")}
      >
        <FiAlignCenter />
      </span>
    </div>
  );
};
export default EditorToolbar;
