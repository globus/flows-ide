"use client";

import { useEditorStore } from "@/stores/editor";
import { CopyButton, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { compressToEncodedURIComponent } from "lz-string";
import { LuCheck, LuShare } from "react-icons/lu";

export function ShareButton() {
  const definition = useEditorStore((state) => state.definition);
  const schema = useEditorStore((state) => state.schema);

  const host = globalThis?.document?.location.origin;

  return (
    <CopyButton
      value={`${host}/flows-ide?d=${compressToEncodedURIComponent(
        JSON.stringify(definition),
      )}&s=${compressToEncodedURIComponent(JSON.stringify(schema))}`}
    >
      {({ copied, copy }) => {
        if (copied) {
          notifications.show({
            id: "clipboard-copy",
            message: "Shareable URL copied to clipboard.",
            color: "green",
            position: "top-center",
          });
        }
        return (
          <Button
            onClick={copy}
            size="xs"
            rightSection={copied ? <LuCheck /> : <LuShare />}
          >
            Share
          </Button>
        );
      }}
    </CopyButton>
  );
}
