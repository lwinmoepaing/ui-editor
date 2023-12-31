import { $isAtNodeEnd } from "@lexical/selection";
import { LexicalEditor, RangeSelection } from "lexical";
import {
  ElementFormatType,
  ElementNode,
} from "lexical/nodes/LexicalElementNode";
import { TextFormatType } from "lexical/nodes/LexicalTextNode";
import { TCustomEditorActionType } from "../EditorComponent/EditorActions/hook/useEditorAction";
import { HeadingTagType } from "@lexical/rich-text";

export const headingTags: HeadingTagType[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

export const formatTypeList: TextFormatType[] = [
  "bold",
  "underline",
  "strikethrough",
  "italic",
  "highlight",
  "code",
  "subscript",
  "superscript",
];

export const eleFormatTypeList: ElementFormatType[] = [
  "left",
  "start",
  "center",
  "right",
  "end",
  "justify",
];

export const checkIsFormatType = (type: TCustomEditorActionType): boolean => {
  return formatTypeList.includes(type as TextFormatType);
};

export const checkIsElementFormatType = (
  type: TCustomEditorActionType
): boolean => {
  return eleFormatTypeList.includes(type as ElementFormatType);
};

export const checkIsHeaderType = (type: TCustomEditorActionType): boolean => {
  return headingTags.includes(type as HeadingTagType);
};

export const getElementBySelection = (
  selection: RangeSelection,
  editor: LexicalEditor
) => {
  const anchorNode: ElementNode = selection.anchor.getNode();
  const element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : anchorNode.getTopLevelElementOrThrow();
  const elementKey = element.getKey();
  const elementDOM = editor.getElementByKey(elementKey);
  return {
    anchorNode,
    element,
    elementKey,
    elementDOM,
  };
};

export const getSelectedNodeBySelection = function (selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }

  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  }

  return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
};
