import { LexicalEditor, RangeSelection } from "lexical";
import {
  ElementFormatType,
  ElementNode,
} from "lexical/nodes/LexicalElementNode";
import { TextFormatType } from "lexical/nodes/LexicalTextNode";

export const checkIsFormatType = (
  type: TextFormatType | ElementFormatType
): boolean => {
  const formatTypeList: TextFormatType[] = [
    "bold",
    "underline",
    "strikethrough",
    "italic",
    "highlight",
    "code",
    "subscript",
    "superscript",
  ];

  return formatTypeList.includes(type as TextFormatType);
};

export const checkIsElementFormatType = (
  type: TextFormatType | ElementFormatType
): boolean => {
  const eleFormatTypeList: ElementFormatType[] = [
    "left",
    "start",
    "center",
    "right",
    "end",
    "justify",
  ];

  return eleFormatTypeList.includes(type as ElementFormatType);
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
