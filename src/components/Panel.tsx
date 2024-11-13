import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import { useGlobusAuth } from "@globus/react-auth-context";
import { flows } from "@globus/sdk";
import { useEffect, useState } from "react";

import { FlowDefinition } from "@/pages";
import { useEditorStore } from "@/stores/editor";

import { FileSystemBrowser } from "./FileSystem/Browser";

export default function Panel() {
  const auth = useGlobusAuth();
  const [userFlows, setFlows] = useState([]);
  const editorStore = useEditorStore();

  useEffect(() => {
    /**
     * @todo Update to pass `manager` to SDK method.
     * @see https://github.com/globus/globus-sdk-javascript/pull/304
     */
    const token =
      auth.authorization?.tokens?.getByResourceServer("flows.globus.org");

    if (!token) {
      setFlows([]);
      return;
    }

    async function fetchFlows() {
      const res = await (
        await flows.flows.getAll({
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
          },
        })
      ).json();

      setFlows(res?.flows || []);
    }

    fetchFlows();
  }, [auth.authorization, auth.isAuthenticated]);

  return (
    <Box h="100%" bg={"gray.100"} w={"280px"}>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton px={2}>
            <Box flex="1" textAlign="left">
              <Text fontWeight={"bold"} fontSize={"xs"}>
                File System
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel m={0} p={0}>
            <FileSystemBrowser />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton px={2}>
            <Box flex="1" textAlign="left">
              <Text fontWeight={"bold"} fontSize={"xs"}>
                Your Published Flows
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel m={0} p={0}>
            <Box fontSize="sm">
              {userFlows.map(
                (flow: {
                  id: string;
                  definition: FlowDefinition;
                  title: string;
                }) => (
                  <Box
                    key={flow.id}
                    onClick={() => {
                      editorStore.replaceDefinitionFromString(
                        JSON.stringify(flow.definition),
                      );
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
