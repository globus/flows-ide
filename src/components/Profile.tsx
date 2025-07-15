import { Button, Text, Menu, Stack } from "@mantine/core";
import { LuChevronDown } from "react-icons/lu";
import { useGlobusAuth } from "@globus/react-auth-context";
import router from "next/router";

import { useEditorStore } from "@/stores/editor";

export default function Profile() {
  const auth = useGlobusAuth();
  const user = auth.authorization?.user;
  const editorStore = useEditorStore();

  if (!auth.isAuthenticated || !user) {
    return (
      <Button
        size="xs"
        onClick={async () => {
          editorStore.preserve();
          await auth.authorization?.login();
        }}
      >
        Sign In
      </Button>
    );
  }

  return (
    <>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button size="xs" rightSection={<LuChevronDown />}>
            {user?.preferred_username}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Stack align="flex-end" px="md" gap="xs">
            <Text size="sm">{user?.name}</Text>
            <Text size="xs">{user?.organization}</Text>
          </Stack>
          <Menu.Divider />
          <Menu.Item
            onClick={async () => {
              await auth.authorization?.revoke();
              router.push("/");
            }}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
