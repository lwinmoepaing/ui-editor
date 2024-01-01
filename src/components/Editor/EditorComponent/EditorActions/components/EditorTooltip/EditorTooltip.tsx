import { computePosition, flip, offset, shift } from "@floating-ui/dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { stylex } from "@stylexjs/stylex";
import { motion } from "framer-motion";
import { $getSelection } from "lexical";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { editorTooltipStyles as styles } from "../../../../EditorStyles/editor.styles";
import { $isRangeSelected } from "../../../../EditorUtils/isRangeSelected";
import { TCustomEditorActionType } from "../../hook/useEditorAction";
import { useEditorPointInteractions } from "../../hook/useEditorPointInteractions";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
import useEditorHydrate from "../../../../EditorUtils/useEditorHydrate";

interface IEditorTooltipProps {
  isLink: boolean;
  checkActiveButton: (str: TCustomEditorActionType) => boolean;
  onClickAction: (str: TCustomEditorActionType) => void;
}

export type FloatingMenuPosition = { x: number; y: number } | undefined;

const EditorTooltip = ({
  isLink,
  checkActiveButton,
  onClickAction,
}: IEditorTooltipProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasHydrate = useEditorHydrate();
  const { isPointerDown, isKeyDown } = useEditorPointInteractions();
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState<boolean>(isLink);
  const [pos, setPos] = useState<FloatingMenuPosition>(undefined);

  useEffect(() => {
    editor.update(() => {
      const isComposing = editor.isComposing();
      const rootElement = editor.getRootElement();
      const isActiveRoot = rootElement === document.activeElement;
      if (isComposing || !isActiveRoot || isPointerDown || isKeyDown) return;
      const selection = $getSelection();
      const setOpen = $isRangeSelected(selection);
      setIsOpen(setOpen);
    });
  }, [editor, isKeyDown, isLink, isOpen, isPointerDown]);

  useEffect(() => {
    const nativeSel = window.getSelection();
    const isCollapsed = nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed;
    if (!isOpen || !ref.current || !nativeSel || isCollapsed) {
      setPos(undefined);
      return;
    }

    const domRange = nativeSel.getRangeAt(0);

    computePosition(domRange, ref.current, {
      middleware: [flip(), shift(), offset(10)],
      placement: "top",
    })
      .then((pos) => {
        const isSameContainer =
          domRange.endContainer === domRange.startContainer;
        const calculateX = isSameContainer
          ? pos.x
          : domRange.startOffset * 5 + 110;

        setPos({
          x: calculateX,
          y: pos.y,
        });
      })
      .catch(() => {
        setPos(undefined);
      });
  }, [isOpen, ref]);

  const positionStyle = useMemo<CSSProperties>(() => {
    return {
      position: "absolute",
      top: pos ? pos.y : 0,
      left: pos ? pos.x : 0,
      visibility: pos ? "visible" : "hidden",
      opacity: pos ? 1 : 0,
    };
  }, [pos]);

  if (!hasHydrate) return null;

  return createPortal(
    isOpen && (
      <motion.div
        ref={ref}
        style={positionStyle}
        {...stylex.props(styles.topTooltip)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, staggerChildren: 0.5 }}
      >
        <EditorToolbar
          onClickAction={onClickAction}
          checkActiveButton={checkActiveButton}
        />
      </motion.div>
    ),
    document.body
  );
};
export default EditorTooltip;
