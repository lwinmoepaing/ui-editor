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

type SerializedBannerNode = SerializedElementNode;

export class BannerNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return "banner";
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
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

  static importJSON(): BannerNode {
    return $createBannerNode();
  }

  exportJSON(): SerializedBannerNode {
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

export const $createBannerNode = (): BannerNode => {
  return new BannerNode();
};

export const $isBannerNode = (node: LexicalNode): boolean => {
  return node instanceof BannerNode;
};

export const INSERT_BANNER_COMMAND = createCommand("insertBanner");

const BannerPlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNodes([BannerNode])) {
    throw new Error("BannerPlugin: BannerNode is not registered on editor.");
  }

  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      const isRangeSelection = $isRangeSelection(selection);
      if (isRangeSelection) {
        $setBlocksType(selection, $createBannerNode);
      }
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  return null;
};

export default BannerPlugin;
