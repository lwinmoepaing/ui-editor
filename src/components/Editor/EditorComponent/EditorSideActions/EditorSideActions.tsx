import { computePosition, offset, shift } from "@floating-ui/dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { stylex } from "@stylexjs/stylex";
import {
  $getRoot,
  $getSelection,
  KEY_ENTER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { editorSideActionStyle } from "../../EditorStyles/editor.styles";
import useEditorHydrate from "../../EditorUtils/useEditorHydrate";
import { createPortal } from "react-dom";

interface FloatingMenuCords {
  x: number;
  y: number;
}

const EditorSideActions = () => {
  const hasHydrate = useEditorHydrate();
  const [editor] = useLexicalComposerContext();
  const plusIconRef = useRef<HTMLDivElement | null>(null);
  const [floatingMenuCords, setFloatingMenuCords] = useState<
    FloatingMenuCords | undefined
  >(undefined);

  // const [isShowFloatingComponentMenu, setIsShowRightContent] =
  //   useState<boolean>(false);

  const handleToggleFloatingComponentMenu = useCallback(() => {
    // setIsShowRightContent((prev) => !prev);
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
          // setIsShowRightContent(false);
          handleLeftSideIcon();
          return false;
        },
        1
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        () => {
          // setIsShowRightContent(false);
          handleLeftSideIcon();
          return false;
        },
        1
      )
    );
  }, [editor, handleLeftSideIcon]);

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
          {...stylex.props(editorSideActionStyle.sideButton)}
        >
          <FiPlus />
        </button>

      </div>
    ),
    document.body
  );
};

export default EditorSideActions;
