"use client";

import { useEditorStore } from "@/stores/editor";
import { CopyButton, Button } from "@mantine/core";
import { compressToEncodedURIComponent } from "lz-string";
import { LuCheck } from "react-icons/lu";

export function ClipboardCopyButton() {
  const definition = useEditorStore((state) => state.definition);
  const schema = useEditorStore((state) => state.schema);

  const host = globalThis?.document?.location.origin;

  return (
    <CopyButton
      value={`${host}/flows-ide?d=${compressToEncodedURIComponent(
        JSON.stringify(definition),
      )}&s=${compressToEncodedURIComponent(JSON.stringify(schema))}`}
    >
      {({ copied, copy }) => (
        <Button
          leftSection={copied ? <LuCheck /> : undefined}
          color={copied ? "teal" : "blue"}
          onClick={copy}
          size="xs"
        >
          {copied ? "Shareable URL Copied to Clipboard" : "Share"}
        </Button>
      )}
    </CopyButton>
  );
}
