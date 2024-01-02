/* eslint-disable react-refresh/only-export-components */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $insertNodes,
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

const PLUGIN_TYPE = "meowPartyEmoji";

export class MeowPartyEmojiNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return PLUGIN_TYPE;
  }

  static clone(node: MeowPartyEmojiNode): MeowPartyEmojiNode {
    return new MeowPartyEmojiNode(node.__key);
  }

  // Creating Dom Node for Our Meow Component
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const image = document.createElement("img");
    span.className = config.theme.meowEmoji;
    image.src = "/meow_party.gif";
    span.appendChild(image);
    return span;
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
      type: PLUGIN_TYPE,
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

export const INSERT_MEOWEMOJI_COMMAND = createCommand(`insert_${PLUGIN_TYPE}`);

const MeowPartyEmojiPlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNodes([MeowPartyEmojiNode])) {
    throw new Error(
      "MeowPartyEmojiPlugin: MeowPartyEmojiNode is not registered on editor."
    );
  }

  editor.registerCommand(
    INSERT_MEOWEMOJI_COMMAND,
    () => {
      const imageNode = $createMeowPartyEmojiNode();
      $insertNodes([imageNode]);
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  return null;
};

export default MeowPartyEmojiPlugin;
