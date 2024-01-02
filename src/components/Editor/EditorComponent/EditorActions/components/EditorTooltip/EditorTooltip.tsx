import { computePosition, flip, offset, shift } from "@floating-ui/dom";
import { $isLinkNode, LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { stylex } from "@stylexjs/stylex";
import { motion } from "framer-motion";
import { $getSelection, $isRangeSelection } from "lexical";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { editorTooltipStyles as styles } from "../../../../EditorStyles/editor.styles";
import { getSelectedNodeBySelection } from "../../../../EditorUtils/editorUtils";
import { $isRangeSelected } from "../../../../EditorUtils/isRangeSelected";
import useEditorHydrate from "../../../../EditorUtils/useEditorHydrate";
import { TCustomEditorActionType } from "../../hook/useEditorAction";
import { useEditorPointInteractions } from "../../hook/useEditorPointInteractions";
import EditorToolbar from "../EditorToolbar/EditorToolbar";

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
  const { isPointerDown, isKeyDown, isDoubleClick } =
    useEditorPointInteractions();
  const hasHydrate = useEditorHydrate();

  const [editor] = useLexicalComposerContext();

  const ref = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(isLink);
  const [pos, setPos] = useState<FloatingMenuPosition>(undefined);
  const [linkPos, setLinkPos] = useState<FloatingMenuPosition>(undefined);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [linkNode, setLinkNode] = useState<LinkNode | null>();

  useEffect(() => {
    editor.update(() => {
      const isComposing = editor.isComposing();
      const rootElement = editor.getRootElement();
      const isActiveRoot = rootElement === document.activeElement;
      if (isComposing || !isActiveRoot || isPointerDown || isKeyDown) return;
      const selection = $getSelection();
      const setOpen = $isRangeSelected(selection);
      if ($isRangeSelection(selection)) {
        const node = getSelectedNodeBySelection(selection);
        const parent = node.getParent() as LinkNode;
        if ($isLinkNode(parent)) {
          setLinkUrl(parent.getURL());
          setLinkNode(parent);
        } else if ($isLinkNode(node)) {
          setLinkUrl(node.getURL());
          setLinkNode(node);
        } else {
          setLinkUrl("");
          setLinkNode(null);
        }
      }
      setIsOpen(setOpen);
    });
  }, [editor, isKeyDown, isLink, isOpen, isPointerDown, isDoubleClick]);

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

    if (!linkRef.current) return;
    computePosition(domRange, linkRef.current, {
      middleware: [flip(), shift(), offset(5)],
      placement: "bottom",
    })
      .then((pos) => {
        const isSameContainer =
          domRange.endContainer === domRange.startContainer;
        const calculateX = isSameContainer
          ? pos.x
          : domRange.startOffset * 5 + 110;

        setLinkPos({
          x: calculateX,
          y: pos.y,
        });
      })
      .catch(() => {
        setLinkPos(undefined);
      });
  }, [isOpen, ref]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value?.trim();
    setLinkUrl(value);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (linkNode) {
        editor.update(() => {
          linkNode.setURL(linkUrl);
        });
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [editor, linkNode, linkUrl]);

  const positionStyle = useMemo<CSSProperties>(() => {
    return {
      position: "absolute",
      top: pos ? pos.y : 0,
      left: pos ? pos.x : 0,
      visibility: pos ? "visible" : "hidden",
      opacity: pos ? 1 : 0,
    };
  }, [pos]);

  const linkPositionStyle = useMemo<CSSProperties>(() => {
    return {
      position: "absolute",
      top: linkPos ? linkPos.y : 0,
      left: linkPos ? linkPos.x : 0,
      visibility: linkPos ? "visible" : "hidden",
      opacity: linkPos ? 1 : 0,
    };
  }, [linkPos]);

  if (!hasHydrate) return null;

  return createPortal(
    isOpen && (
      <>
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

        <motion.div
          ref={linkRef}
          style={linkPositionStyle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          {...stylex.props(
            styles.bottomTooltip,
            isLink && styles.bottomTooltipActive
          )}
        >
          <div
            {...stylex.props(
              !isLink && styles.bottomTooltip,
              styles.linkInputWrapper
            )}
          >
            <input
              {...stylex.props(
                !isLink && styles.bottomTooltip,
                styles.linkInput
              )}
              value={linkUrl}
              ref={inputRef}
              onChange={handleChange}
            />
          </div>
        </motion.div>
      </>
    ),
    document.body
  );
};
export default EditorTooltip;
