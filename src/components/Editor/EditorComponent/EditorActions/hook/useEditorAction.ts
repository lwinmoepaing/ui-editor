import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
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
  getElementBySelection,
} from "../../../EditorUtils/editorUtils";

const LowPriority = 1;

const useEditorAction = () => {
  const [editor] = useLexicalComposerContext();
  // const [modal, showModal] = useModal();
  const [
    ,
    // blockType
    setBlockType,
  ] = useState("paragraph");
  const [
    ,
    // selectedElementKey
    setSelectedElementKey,
  ] = useState<HTMLElement | null>(null);
  // const [isRTL, setIsRTL] = useState(false);
  // const [isLink, setIsLink] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState<
    (TextFormatType | ElementFormatType)[]
  >([]);

  const onClickAction = useCallback(
    (type: TextFormatType | ElementFormatType) => {
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
    },
    [editor]
  );

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    //
    let allSelectedEvents = [...selectedEventTypes];

    // inner function
    const pushInEventTypesState = (
      selectionFormat: boolean,
      event: TextFormatType | ElementFormatType
    ) => {
      if (selectionFormat) {
        if (selectedEventTypes.includes(event)) return;
        else allSelectedEvents.push(event);
      } else {
        allSelectedEvents = allSelectedEvents.filter((ev) => ev !== event);
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
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      pushInEventTypesState(selection.hasFormat("highlight"), "highlight");
      pushInEventTypesState(selection.hasFormat("bold"), "bold");
      pushInEventTypesState(selection.hasFormat("italic"), "italic");
      pushInEventTypesState(selection.hasFormat("underline"), "underline");
      pushInEventTypesState(
        selection.hasFormat("strikethrough"),
        "strikethrough"
      );
      pushInEventTypesState(selection.hasFormat("code"), "code");

      // setIsRTL($isParentElementRTL(selection));

      // Update links
      // const node = getSelectedNode(selection);
      // const parent = node.getParent();
      // if ($isLinkNode(parent) || $isLinkNode(node)) {
      //   if (!allSelectedEvents.includes(eventTypes.formatInsertLink))
      //     allSelectedEvents.push(eventTypes.formatInsertLink);
      //   setIsLink(true);
      // } else {
      //   if (allSelectedEvents.includes(eventTypes.formatInsertLink)) {
      //     allSelectedEvents = allSelectedEvents.filter(
      //       (ev) => ev !== eventTypes.formatCode
      //     );
      //   }
      //   setIsLink(false);
      // }

      setSelectedEventTypes(allSelectedEvents);
    }

    // console.log("allSelectedEvents", allSelectedEvents);
  }, [editor, selectedEventTypes]);

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

  // function getSelectedNode(selection) {
  //   const anchor = selection.anchor;
  //   const focus = selection.focus;
  //   const anchorNode = selection.anchor.getNode();
  //   const focusNode = selection.focus.getNode();
  //   if (anchorNode === focusNode) {
  //     return anchorNode;
  //   }
  //   const isBackward = selection.isBackward();
  //   if (isBackward) {
  //     return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  //   } else {
  //     return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  //   }
  // }

  const checkActiveButton = useCallback(
    (str: TextFormatType | ElementFormatType) => {
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
