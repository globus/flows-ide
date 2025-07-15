"use client";

import { useEditorStore } from "@/stores/editor";
import { Button, useClipboard } from "@chakra-ui/react";
import { compressToEncodedURIComponent } from "lz-string";
import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";

export function ClipboardCopyButton() {
  const definition = useEditorStore((state) => state.definition);
  const schema = useEditorStore((state) => state.schema);
  const { onCopy, hasCopied, setValue } = useClipboard("");

  useEffect(() => {
    setValue(
      `${globalThis.document.location.origin}/flows-ide?d=${compressToEncodedURIComponent(
        JSON.stringify(definition),
      )}&s=${compressToEncodedURIComponent(JSON.stringify(schema))}`,
    );
  }, [definition, schema, setValue]);

  return (
    <Button
      size="xs"
      colorScheme={!hasCopied ? "blue" : "green"}
      onClick={onCopy}
      leftIcon={hasCopied ? <LuCheck /> : undefined}
    >
      {hasCopied ? "Shareable URL Copied to Clipboard" : "Share"}
    </Button>
  );
}
