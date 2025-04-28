import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Button,
  Flex,
  Spacer,
  Icon,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useGlobusAuth } from "@globus/react-auth-context";
import { flows } from "@globus/sdk";
import { useEffect, useState } from "react";

import { FlowDefinition } from "@/pages";
import { useEditorStore } from "@/stores/editor";
import { LuBookOpenCheck, LuFolderTree } from "react-icons/lu";

export default function Panel() {
  const auth = useGlobusAuth();
  const editorStore = useEditorStore();
  const [activeSection, setActiveSection] = useState<
    "explorer" | "published_flows"
  >("explorer");
  const [minimized, setMinimized] = useState(false);
  const [userFlows, setFlows] = useState([]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setFlows([]);
      return;
    }
    async function fetchFlows() {
      const res = await (
        await flows.flows.getAll({}, { manager: auth.authorization })
      ).json();

      setFlows(res?.flows || []);
    }

    fetchFlows();
  }, [auth.authorization, auth.isAuthenticated]);

  return (
    <HStack spacing={0}>
      <Box h="100%" bg={"brand.800"} w={"50px"}>
        <VStack spacing={0}>
          <Button
            onClick={() => {
              setMinimized(!minimized && activeSection === "explorer");
              setActiveSection("explorer");
            }}
            colorScheme="blue"
            rounded={0}
            w="100%"
          >
            <Icon as={LuFolderTree} />
          </Button>
          <Button
            onClick={() => {
              setMinimized(!minimized && activeSection === "published_flows");
              setActiveSection("published_flows");
            }}
            colorScheme="blue"
            rounded={0}
            w="100%"
          >
            <Icon as={LuBookOpenCheck} />
          </Button>
        </VStack>
      </Box>
      <Box
        h="100%"
        bg={"gray.100"}
        w="230px"
        display={minimized ? "none" : "block"}
      >
        <Box>
          <Heading
            p={2}
            fontSize={"sm"}
            borderBottom={1}
            borderBottomStyle={"solid"}
            borderBottomColor={"gray"}
          >
            {activeSection === "explorer" ? "Explorer" : "Published Flows"}
          </Heading>

          {activeSection === "published_flows" && (
            <Box fontSize="sm">
              {!auth.isAuthenticated && (
                <Text p={4} color={"gray.500"}>
                  You must be signed in to view your flows published on Globus.
                </Text>
              )}

              {userFlows.map(
                (flow: {
                  id: string;
                  definition: FlowDefinition;
                  title: string;
                }) => (
                  <Box
                    key={flow.id}
                    onClick={() => {
                      editorStore.replace(flow.definition);
                    }}
                    p={2}
                    _hover={{
                      bg: "gray.600",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    {flow.title}
                  </Box>
                ),
              )}
            </Box>
          )}
        </Box>
      </Box>
    </HStack>
  );
}
