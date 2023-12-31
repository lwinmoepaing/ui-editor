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
  FiLink,
} from "react-icons/fi";
import { FaListOl, FaHighlighter } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

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
    <motion.div
      {...stylex.props(style.container)}
    >
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
        H1
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
        H2
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
        <FaListOl />
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
        <FaHighlighter />
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
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("left") && style.activeButton
        )}
        onClick={() => onClickAction("left")}
      >
        <FiAlignLeft />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("center") && style.activeButton
        )}
        onClick={() => onClickAction("center")}
      >
        <FiAlignCenter />
      </motion.span>
      <motion.span
        initial="initial"
        animate="visible"
        variants={opacityAnimation}
        {...stylex.props(
          style.actionButton,
          checkActiveButton("right") && style.activeButton
        )}
        onClick={() => onClickAction("right")}
      >
        <FiAlignRight />
      </motion.span>
    </motion.div>
  );
};
export default EditorToolbar;
