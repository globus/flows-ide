import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, ScrollArea } from "@mantine/core";
import { DocumentationBrowser } from "./DocumentationBrowser";

export default function DocumentationDrawer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title="Documentation"
        size="xl"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <DocumentationBrowser />
      </Drawer>

      <Button onClick={open} size="xs">
        Documentation
      </Button>
    </>
  );
}
