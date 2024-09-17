import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Code,
  Spacer,
  Button,
  Image,
  Text,
  MenuList,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { useGlobusAuth } from "@globus/react-auth-context";
import router from "next/router";

export default function Profile() {
  const auth = useGlobusAuth();
  const user = auth.authorization?.user;
  return auth.isAuthenticated && user ? (
    <Menu placement="bottom-end">
      <MenuButton
        colorScheme="gray"
        size="xs"
        as={Button}
        rightIcon={<ChevronDownIcon />}
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
  ) : (
    <Button size="xs" onClick={async () => await auth.authorization?.login()}>
      Sign In
    </Button>
  );
}
