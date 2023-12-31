import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { ElementFormatType } from "lexical/nodes/LexicalElementNode";
import { TextFormatType } from "lexical/nodes/LexicalTextNode";
import { useCallback, useEffect, useState } from "react";
import {
  checkIsElementFormatType,
  checkIsFormatType,
  checkIsHeaderType,
  getElementBySelection,
  getSelectedNodeBySelection,
  headingTags,
  formatTypeList,
} from "../../../EditorUtils/editorUtils";

const LowPriority = 1;

export type TCustomEditorActionType =
  | TextFormatType
  | ElementFormatType
  | HeadingTagType
  | "link";

const useEditorAction = () => {
  const [editor] = useLexicalComposerContext();
  // const [modal, showModal] = useModal();
  const [blockType, setBlockType] = useState("paragraph");
  const [
    ,
    // selectedElementKey
    setSelectedElementKey,
  ] = useState<HTMLElement | null>(null);
  // const [isRTL, setIsRTL] = useState(false);
  const [
    ,
    // isLink
    setIsLink,
  ] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState<
    TCustomEditorActionType[]
  >([]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    let allSelectedEvents = [...selectedEventTypes];

    // inner function
    const pushInEventTypesState = (
      selectionFormat: boolean,
      event: TCustomEditorActionType
    ) => {
      if (selectionFormat) {
        if (selectedEventTypes.includes(event)) return;
        else allSelectedEvents.push(event);
      } else {
        allSelectedEvents = allSelectedEvents.filter((ev) => ev !== event);
      }
    };

    const pushInEventHeaderTypesState = (
      selectionFormat: boolean,
      event: TCustomEditorActionType
    ) => {
      const removeHeaders = allSelectedEvents.filter(
        (ev) => !headingTags.includes(ev as HeadingTagType)
      );
      allSelectedEvents = removeHeaders;
      if (selectionFormat) {
        allSelectedEvents.push(event);
      }
    };

    // range selection ( e.g like to bold only the particular area of the text)
    if ($isRangeSelection(selection)) {
      const { anchorNode, element, elementKey, elementDOM } =
        getElementBySelection(selection, editor);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const isHeading = $isHeadingNode(element);
          const type = isHeading ? element.getTag() : element.getType();
          setBlockType(type);
          pushInEventHeaderTypesState(isHeading, type);
        }
      }

      formatTypeList.forEach((data) => {
        pushInEventTypesState(selection.hasFormat(data), data);
      });

      // setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNodeBySelection(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        if (!allSelectedEvents.includes("link")) allSelectedEvents.push("link");
        setIsLink(true);
      } else {
        if (allSelectedEvents.includes("link")) {
          allSelectedEvents = allSelectedEvents.filter((ev) => ev !== "link");
        }
        setIsLink(false);
      }

      setSelectedEventTypes(allSelectedEvents);
    }

    // console.log("allSelectedEvents", allSelectedEvents);
  }, [editor, selectedEventTypes]);

  const formatLargeHeading = useCallback(
    (type: HeadingTagType) => {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (blockType !== type) {
            $setBlocksType(selection, () => $createHeadingNode(type));
          } else {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        }
      });
    },
    [blockType, editor]
  );

  const onClickAction = useCallback(
    (type: TCustomEditorActionType) => {
      if (checkIsFormatType(type)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, type as TextFormatType);
        return;
      }

      if (checkIsElementFormatType(type)) {
        editor.dispatchCommand(
          FORMAT_ELEMENT_COMMAND,
          type as ElementFormatType
        );
        return;
      }

      if (checkIsHeaderType(type)) {
        formatLargeHeading(type as HeadingTagType);
      }
    },
    [editor, formatLargeHeading]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          // console.log("registerUpdateListener");
          updateToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const checkActiveButton = useCallback(
    (str: TCustomEditorActionType) => {
      return selectedEventTypes.includes(str);
    },
    [selectedEventTypes]
  );

  return {
    selectedEventTypes,
    onClickAction,
    checkActiveButton,
  };
};
export default useEditorAction;
