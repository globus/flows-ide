"use client";

import { useEditorStore } from "@/stores/editor";
import { Button } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import { compressToEncodedURIComponent } from "lz-string";
import { LuCheck } from "react-icons/lu";

export function ClipboardCopyButton() {
  const editorStore = useEditorStore();
  const clipboard = useClipboard("", 2000);
  return (
    globalThis.document && (
      <Button
        size="xs"
        colorScheme={!clipboard.hasCopied ? "blue" : "green"}
        onClick={() =>
          clipboard.onCopy(
            `${globalThis.document.location.origin}/flows-ide?d=${compressToEncodedURIComponent(
              JSON.stringify(editorStore.definition),
            )}&s=${compressToEncodedURIComponent(JSON.stringify(editorStore.schema))}`,
          )
        }
      >
        {clipboard.hasCopied
          ? "Copied to clipboard!"
          : "Copy link to share this Flow"}
        {clipboard.hasCopied ? <LuCheck /> : null}
      </Button>
    )
  );
}
