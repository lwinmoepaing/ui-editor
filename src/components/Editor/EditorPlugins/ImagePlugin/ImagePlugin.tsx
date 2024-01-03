/* eslint-disable react-refresh/only-export-components */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_LOW,
  createCommand,
} from "lexical";
import { $createImageNode, ImageNode, ImagePayload } from "./ImageNode";
import { useEffect } from "react";
import { $wrapNodeInElement } from "@lexical/utils";

export const INSERT_IMAGE_COMMAND = createCommand("insertImage");

export type InsertImagePayload = Readonly<ImagePayload>;

const ImagePlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagePlugin: ImageNode is not registered on editor.");
    }

    editor.registerCommand<InsertImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodes([imageNode]);
        if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
          $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
        }
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
};

export default ImagePlugin;
