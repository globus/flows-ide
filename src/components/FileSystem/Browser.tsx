import React, { useState } from "react";
import { Box, Button, ButtonGroup, Center, Text } from "@chakra-ui/react";
import { MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useFileSystem } from "@/stores/file-system";
import { useEditorStore } from "@/stores/editor";

function File({ entry }) {
  const editorStore = useEditorStore();
  return (
    <Box
      onClick={async () => {
        if (editorStore.activeEditorHasModifications()) {
          const result = window.confirm(
            "Are you sure you want to open a new file? Your changes will be lost.",
          );
          if (!result) {
            return;
          }
        }

        const file = await entry.handle.getFile();
        const contents = await file.text();
        editorStore.replaceActiveEditorFromString(contents);
      }}
      p={2}
      _hover={{
        bg: "gray.600",
        cursor: "pointer",
        color: "white",
      }}
    >
      <Text ml={entry.path?.split("/").length}>{entry.handle.name}</Text>
    </Box>
  );
}

function Directory({ entry }) {
  const fileSystem = useFileSystem();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      onClick={async () => {
        const entries = entry.handle.values();
        for await (const e of entries) {
          if (e.name.startsWith(".")) {
            continue;
          }
          await fileSystem.addEntry({
            handle: e,
            path: `${entry.handle.name}/`,
          });
        }
      }}
      p={2}
      _hover={{
        bg: "gray.600",
        cursor: "pointer",
        color: "white",
      }}
    >
      {isOpen ? <PlusSquareIcon mr={2} /> : <MinusIcon mr={2} />}
      {entry.handle.name}
    </Box>
  );
}

export function FileSystemBrowser() {
  const fileSystem = useFileSystem();
  return (
    <>
      <Center>
        <ButtonGroup m={1}>
          <Button
            size="xs"
            variant={"outline"}
            colorScheme="blue"
            onClick={async () => {
              const handle = await window.showDirectoryPicker({});
              await fileSystem.addEntry({
                handle,
              });
            }}
          >
            Open Directory
          </Button>
          <Button
            size="xs"
            variant={"outline"}
            colorScheme="blue"
            onClick={async () => {
              const [handle] = await window.showOpenFilePicker();
              const perms = await handle.queryPermission({
                mode: "readwrite",
              });
              if (perms === "denied") {
                await handle.requestPermission({
                  mode: "readwrite",
                });
              }
              await fileSystem.addEntry({
                handle,
              });
            }}
          >
            Open File
          </Button>
        </ButtonGroup>
      </Center>
      <Box fontSize="sm">
        {fileSystem.entries.map((e, i) => (
          <Box key={i}>
            {e.handle.kind === "file" ? (
              <File entry={e} />
            ) : (
              <Directory entry={e} />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
}
