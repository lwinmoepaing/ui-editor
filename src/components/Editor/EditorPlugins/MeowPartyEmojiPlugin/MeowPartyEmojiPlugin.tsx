/* eslint-disable react-refresh/only-export-components */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $applyNodeReplacement,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  Spread,
  TextNode,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import emojis from "./MeowEmojis";

export type SerializedMeowPartyEmojiNode = Spread<
  {
    className: string;
  },
  SerializedTextNode
>;

const PLUGIN_TYPE = "meowPartyEmoji";

export const $createMeowPartyEmojiNode = (
  className: string,
  text: string
): MeowPartyEmojiNode => {
  const node = new MeowPartyEmojiNode(className, text).setMode("token");
  return $applyNodeReplacement(node);
};

export class MeowPartyEmojiNode extends TextNode {
  __className: string;

  constructor(className: string, text: string, key?: NodeKey) {
    super(text, key);
    this.__className = className;
  }

  static getType(): string {
    return PLUGIN_TYPE;
  }

  static clone(node: MeowPartyEmojiNode): MeowPartyEmojiNode {
    return new MeowPartyEmojiNode(node.__className, node.__text, node.__key);
  }

  // Creating Dom Node for Our Meow Component
  createDOM(config: EditorConfig): HTMLElement {
    if (this.__className.includes("emoji-gif")) {
      const inner = super.createDOM(config);
      inner.className = "emoji-inner";

      const [, gif] = this.__className.split(":");
      const emoji = document.createElement("img");
      emoji.src = gif ? gif : "/meow_party.gif";
      emoji.className = config.theme.meowEmoji;

      const dom = document.createElement("span");
      dom.className = this.__className;
      dom.appendChild(inner);
      dom.appendChild(emoji);
      return dom;
    }

    const inner = super.createDOM(config);
    inner.className = "emoji-inner";

    const dom = document.createElement("span");
    dom.className = this.__className;
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);
    return false;
  }

  static importJSON(
    serializedNode: SerializedMeowPartyEmojiNode
  ): MeowPartyEmojiNode {
    const node = $createMeowPartyEmojiNode(
      serializedNode.className,
      serializedNode.text
    );
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedMeowPartyEmojiNode {
    return {
      ...super.exportJSON(),
      className: this.getClassName(),
      type: PLUGIN_TYPE,
      version: 1,
    };
  }

  getClassName(): string {
    const self = this.getLatest();
    return self.__className;
  }
}

export const $isMeowPartyEmojiNode = (node: LexicalNode): boolean => {
  return node instanceof MeowPartyEmojiNode;
};

export const INSERT_MEOWEMOJI_COMMAND = createCommand(`insert_${PLUGIN_TYPE}`);

function findAndTransformEmoji(node: TextNode): null | TextNode {
  const text = node.getTextContent();

  for (let i = 0; i < text.length; i++) {
    const emojiData = emojis.get(text[i]) || emojis.get(text.slice(i, i + 2));

    if (emojiData !== undefined) {
      const [emojiStyle, emojiText] = emojiData;
      let targetNode;

      if (i === 0) {
        [targetNode] = node.splitText(i + 2);
      } else {
        [, targetNode] = node.splitText(i, i + 2);
      }

      const emojiNode = $createMeowPartyEmojiNode(emojiStyle, emojiText);
      targetNode.replace(emojiNode);
      return emojiNode;
    }
  }

  return null;
}

const MeowPartyEmojiPlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([MeowPartyEmojiNode])) {
      throw new Error(
        "MeowPartyEmojiPlugin: MeowPartyEmojiNode is not registered on editor."
      );
    }
    editor.registerNodeTransform(TextNode, findAndTransformEmoji);
  }, [editor]);

  return null;
};

export default MeowPartyEmojiPlugin;
