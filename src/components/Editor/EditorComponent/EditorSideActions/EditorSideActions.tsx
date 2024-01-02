import { computePosition, offset, shift } from "@floating-ui/dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { stylex } from "@stylexjs/stylex";
import { motion } from "framer-motion";
import {
  $getRoot,
  $getSelection,
  KEY_ENTER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiCode, FiImage, FiPlus, FiYoutube } from "react-icons/fi";
import { INSERT_MEOWEMOJI_COMMAND } from "../../EditorPlugins/MeowPartyEmojiPlugin/MeowPartyEmojiPlugin";
import { editorSideActionStyle as styles } from "../../EditorStyles/editor.styles";
import useEditorHydrate from "../../EditorUtils/useEditorHydrate";

interface FloatingMenuCords {
  x: number;
  y: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItem = {
  hidden: { opacity: 0.4, scale: 0.3 },
  show: { opacity: 1, scale: 1 },
};

const EditorSideActions = () => {
  const hasHydrate = useEditorHydrate();
  const [editor] = useLexicalComposerContext();
  const plusIconRef = useRef<HTMLDivElement | null>(null);
  const [floatingMenuCords, setFloatingMenuCords] = useState<
    FloatingMenuCords | undefined
  >(undefined);

  const [showRightSideIcons, setShowRightSideIcons] = useState<boolean>(false);

  const handleToggleFloatingComponentMenu = useCallback(() => {
    setShowRightSideIcons((prev) => !prev);
  }, []);

  const handleLeftSideIcon = useCallback(() => {
    const selection = $getSelection();
    const topLevelNodeKeys = editor
      .getEditorState()
      .read(() => $getRoot().getChildrenKeys());
    const currentNodeKey = selection?.getNodes()[0].__key;
    const currentNodeIndex = topLevelNodeKeys.indexOf(currentNodeKey as string);

    const currentNode = editor.getElementByKey(
      topLevelNodeKeys[currentNodeIndex]
    );

    if (!currentNode) {
      setFloatingMenuCords(undefined);
      return;
    }

    if (typeof currentNode === "number") {
      setFloatingMenuCords(undefined);
      return;
    }

    if (!plusIconRef.current) {
      setFloatingMenuCords(undefined);
      return;
    }

    computePosition(currentNode, plusIconRef.current as HTMLElement, {
      middleware: [shift(), offset(10)],
      placement: "left",
    })
      .then(({ x, y }) => {
        setFloatingMenuCords({ x, y });
      })
      .catch(() => {
        setFloatingMenuCords(undefined);
      });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          handleLeftSideIcon();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          setShowRightSideIcons(false);
          handleLeftSideIcon();
          return false;
        },
        1
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        () => {
          setShowRightSideIcons(false);
          handleLeftSideIcon();
          return false;
        },
        1
      )
    );
  }, [editor, handleLeftSideIcon, setShowRightSideIcons]);

  if (!hasHydrate) return null;

  return createPortal(
    hasHydrate && (
      <div
        ref={plusIconRef}
        style={{
          position: "absolute",
          left: floatingMenuCords?.x,
          top: floatingMenuCords?.y,
          opacity: !floatingMenuCords ? 0 : 1,
          visibility: !floatingMenuCords ? "hidden" : "visible",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFloatingComponentMenu();
          }}
          type="button"
          {...stylex.props(
            styles.sideButton,
            showRightSideIcons && styles.activedSideButton
          )}
        >
          <FiPlus />
        </button>

        {showRightSideIcons ? (
          <motion.div
            {...stylex.props(styles.activedRightContainer)}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="button"
              {...stylex.props(styles.actionButton)}
              variants={listItem}
            >
              <FiImage {...stylex.props(styles.actionButtonIcon)} />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="button"
              {...stylex.props(styles.actionButton)}
              variants={listItem}
            >
              <FiCode {...stylex.props(styles.actionButtonIcon)} />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="button"
              {...stylex.props(styles.actionButton)}
              variants={listItem}
            >
              <FiYoutube {...stylex.props(styles.actionButtonIcon)} />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                editor.dispatchCommand(INSERT_MEOWEMOJI_COMMAND, undefined);
              }}
              type="button"
              {...stylex.props(styles.actionButton)}
              variants={listItem}
            >
              <img
                src="/meow_party.gif"
                {...stylex.props(styles.actionButtonImg)}
              />
            </motion.button>
          </motion.div>
        ) : null}
      </div>
    ),
    document.body
  );
};

export default EditorSideActions;
