import { stylex } from "@stylexjs/stylex";
import { Variants, motion } from "framer-motion";
import { FiBold, FiItalic, FiLink, FiList, FiUnderline } from "react-icons/fi";
import { LuHeading1, LuHeading2, LuListOrdered, LuHighlighter } from "react-icons/lu";
import { editorToolbarStyles as style } from "../../../../EditorStyles/editor.styles";
import { TCustomEditorActionType } from "../../hook/useEditorAction";

const opacityAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
    },
  },
} as const;

const EditorToolbar = ({
  checkActiveButton,
  onClickAction,
}: {
  checkActiveButton: (str: TCustomEditorActionType) => boolean;
  onClickAction: (str: TCustomEditorActionType) => void;
}) => {
  return (
    <motion.div {...stylex.props(style.container)}>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("h1") && style.activeButton
        )}
        onClick={() => onClickAction("h1")}
      >
        <LuHeading1 />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("h2") && style.activeButton
        )}
        onClick={() => onClickAction("h2")}
      >
        <LuHeading2 />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("bold") && style.activeButton
        )}
        onClick={() => onClickAction("bold")}
      >
        <FiBold />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("italic") && style.activeButton
        )}
        onClick={() => onClickAction("italic")}
      >
        <FiItalic />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("underline") && style.activeButton
        )}
        onClick={() => onClickAction("underline")}
      >
        <FiUnderline />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("ol") && style.activeButton
        )}
        onClick={() => onClickAction("ol")}
      >
        <LuListOrdered />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("ul") && style.activeButton
        )}
        onClick={() => onClickAction("ul")}
      >
        <FiList />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("highlight") && style.activeButton
        )}
        onClick={() => onClickAction("highlight")}
      >
        <LuHighlighter />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("link") && style.activeButton
        )}
        onClick={() => onClickAction("link")}
      >
        <FiLink />
      </motion.span>
    </motion.div>
  );
};
export default EditorToolbar;
