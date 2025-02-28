import { LuChevronDown } from "react-icons/lu";
import {
  Button,
  Text,
  MenuList,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
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
      <Menu placement="bottom-end">
        <MenuButton
          colorScheme="gray"
          size="xs"
          as={Button}
          rightIcon={<Icon as={LuChevronDown} />}
        >
          {user?.preferred_username}
        </MenuButton>
        <MenuList>
          <Box px={2} textAlign="right">
            <Text>{user?.name}</Text>
            <Text fontSize="sm">{user?.organization}</Text>
          </Box>
          <MenuDivider />
          <MenuItem
            onClick={async () => {
              await auth.authorization?.revoke();
              router.push("/");
            }}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
