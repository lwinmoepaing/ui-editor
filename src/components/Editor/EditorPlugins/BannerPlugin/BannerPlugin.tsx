/* eslint-disable react-refresh/only-export-components */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  createCommand,
} from "lexical";

export class BannerNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  // Creating Dom Node for Our Banner Component
  createDom(config: EditorConfig): HTMLElement {
    const ele = document.createElement("div");
    ele.className = config.theme.banner;
    return ele;
  }

  // Updating Dom
  // updateDOM(
  //   _prevNode: unknown,
  //   _dom: HTMLElement,
  //   _config: EditorConfig
  // ): boolean {
  //   return true;
  // }
}

export const $createBannerNode = (): BannerNode => {
  return new BannerNode();
};

export const $isBannerNode = (node: LexicalNode): boolean => {
  return node instanceof BannerNode;
};

export const INSERT_BANNER_COMMAND = createCommand("insertBanner");

const BannerPlugin = (): JSX.Element => {
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
        // 
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return <></>;
};

export default BannerPlugin;
