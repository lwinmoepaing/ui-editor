/* eslint-disable react-refresh/only-export-components */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  RangeSelection,
  SerializedElementNode,
  createCommand,
} from "lexical";

type SerializedMeowPartyEmojiNode = SerializedElementNode;

export class MeowPartyEmojiNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return "banner";
  }

  static clone(node: MeowPartyEmojiNode): MeowPartyEmojiNode {
    return new MeowPartyEmojiNode(node.__key);
  }

  // Creating Dom Node for Our Banner Component
  createDOM(config: EditorConfig): HTMLElement {
    const ele = document.createElement("p");
    ele.className = config.theme.banner;
    return ele;
  }

  updateDOM(): boolean {
    return false;
  }

  static importJSON(): MeowPartyEmojiNode {
    return $createMeowPartyEmojiNode();
  }

  exportJSON(): SerializedMeowPartyEmojiNode {
    return {
      ...super.exportJSON(),
      type: "banner",
      version: 1,
    };
  }

  insertNewAfter(
    _selection: RangeSelection,
    restoreSelection?: boolean | undefined
  ): LexicalNode | null {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
}

export const $createMeowPartyEmojiNode = (): MeowPartyEmojiNode => {
  return new MeowPartyEmojiNode();
};

export const $isMeowPartyEmojiNode = (node: LexicalNode): boolean => {
  return node instanceof MeowPartyEmojiNode;
};

export const INSERT_BANNER_COMMAND = createCommand("insertMe");

const MeowPartyEmojiPlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNodes([MeowPartyEmojiNode])) {
    throw new Error(
      "MeowPartyEmojiPlugin: MeowPartyEmojiNode is not registered on editor."
    );
  }

  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      const isRangeSelection = $isRangeSelection(selection);
      if (isRangeSelection) {
        $setBlocksType(selection, $createMeowPartyEmojiNode);
      }
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  return null;
};

export default MeowPartyEmojiPlugin;
