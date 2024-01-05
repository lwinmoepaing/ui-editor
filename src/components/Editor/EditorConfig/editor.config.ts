import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import editorTheme from "../EditorStyles/editor.theme";

// Custom Nodes
import { BannerNode } from "../EditorPlugins/BannerPlugin/BannerPlugin";
import { MeowPartyEmojiNode } from "../EditorPlugins/MeowPartyEmojiPlugin/MeowPartyEmojiPlugin";
import { ImageNode } from "../EditorPlugins/ImagePlugin/ImageNode";

const editorConfig: InitialConfigType = {
  theme: editorTheme,
  namespace: "StrategistEditor",
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,

    // -- My CustomNodes
    ImageNode,
    BannerNode,
    MeowPartyEmojiNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export default editorConfig;
