"use client";

import { useEditorStore } from "@/stores/editor";
import { COMPRESSION_METHODS, encode } from "@/utils/compression";
import { Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { LuCheck, LuShare } from "react-icons/lu";

export function ShareButton() {
  const clipboard = useClipboard();
  const definition = useEditorStore((state) => state.definition);
  const schema = useEditorStore((state) => state.schema);

  const host = globalThis?.document?.location.origin;

  useEffect(() => {
    if (clipboard.copied) {
      notifications.show({
        id: "clipboard-copy",
        message: "Shareable URL copied to clipboard.",
        color: "green",
        position: "top-center",
      });
    }
  }, [clipboard.copied]);

  return (
    <Button
      onClick={async () => {
        const d = await encode(definition, COMPRESSION_METHODS.GZIP);
        const s = await encode(schema, COMPRESSION_METHODS.GZIP);
        const value = `${host}/flows-ide?d=${d}&s=${s}&format=gzip`;
        clipboard.copy(value);
      }}
      size="xs"
      rightSection={clipboard.copied ? <LuCheck /> : <LuShare />}
    >
      Share
    </Button>
  );
}
