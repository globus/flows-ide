import { Box, Text, Button, Title, Stack, Group } from "@mantine/core";
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
    <Group>
      <Box h="100%" bg={"brand.8"} w={"50px"}>
        <Stack>
          <Button
            onClick={() => {
              setMinimized(!minimized && activeSection === "explorer");
              setActiveSection("explorer");
            }}
            color="blue"
            w="100%"
          >
            <LuFolderTree />
          </Button>
          <Button
            onClick={() => {
              setMinimized(!minimized && activeSection === "published_flows");
              setActiveSection("published_flows");
            }}
            color="blue"
            w="100%"
          >
            <LuBookOpenCheck />
          </Button>
        </Stack>
      </Box>
      <Box
        h="100%"
        bg={"gray.100"}
        w="230px"
        display={minimized ? "none" : "block"}
      >
        <Box>
          <Title
            p={2}
            fs={"sm"}
            borderBottom={1}
            borderBottomStyle={"solid"}
            borderBottomColor={"gray"}
          >
            {activeSection === "explorer" ? "Explorer" : "Published Flows"}
          </Title>

          {activeSection === "published_flows" && (
            <Box fs="sm">
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
    </Group>
  );
}
