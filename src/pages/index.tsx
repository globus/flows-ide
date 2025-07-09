import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Heading,
  Text,
  Box,
  Flex,
  Spacer,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  ListItem,
  List,
  Code,
  Image,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Editor, { MODES, SupportedModes } from "../components/Editor";
import Diagram from "../components/Diagram/Diagram";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { DocumentationBrowser } from "@/components/DocumentationBrowser/DocumentationBrowser";
import packageJson from "../../package.json" assert { type: "json" };

import { useEditorStore } from "@/stores/editor";

import Profile from "@/components/Profile";

import { GLOBUS_FLOWS_VALIDATION } from "@/components/Validate";
import Panel from "@/components/Panel";

export type FlowDefinition = {
  States: {
    [key: string]: {
      Type: "Action" | "Choice" | "Fail" | "Pass" | "ExpressionEval" | string;
      Next?: string;
      End?: boolean;
      Comment?: string;
      Catch?: {
        Next?: string;
      }[];
      Choices?: {
        Next?: string;
      }[];
      [key: string]: any;
    };
  };
  StartAt: string;
  Comment?: string;
};

const HEADER = {
  HEIGHT: "50px",
};

const LAYOUT = {
  HEADER,
  TAB_PANEL: {
    /**
     * The tab panel height accounts for the header and the `<TabList>` height.
     */
    HEIGHT: `calc(100vh - (${HEADER.HEIGHT} + 42px))`,
  },
};

/**
 * Feature flag to enable/disable the "Panel" component.
 */
const ENABLE_PANEL = false;

export default function Home() {
  const router = useRouter();

  const editorStore = useEditorStore();
  const definition = editorStore.definition;

  const bootstrapped = useRef(false);

  const [invalidMarkers, setValidity] = useState<any[]>([]);

  const [mode, setMode] = useState<SupportedModes>(MODES.DEFINITION);

  const isDefinitionMode = mode === MODES.DEFINITION;

  const editorContents = isDefinitionMode
    ? editorStore.definition
    : editorStore.schmea;

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    /**
     * If we're returning from an OAuth2 redirect, there might be a definition
     * stored in the storage that we should make sure to use.
     */
    editorStore.restore();
    /**
     * Attempt to bootstrap from the initial "d" query parameter.
     */
    const queryParameterDef = new URLSearchParams(
      document?.location?.search || {},
    ).get("d");
    if (queryParameterDef) {
      editorStore.replaceDefinitionFromString(
        decompressFromEncodedURIComponent(queryParameterDef),
      );
    }
  }, [editorStore]);

  useEffect(() => {
    if (isDefinitionMode && definition) {
      const v = compressToEncodedURIComponent(JSON.stringify(definition));
      router.push(`/?d=${v}`);
    }
  }, [isDefinitionMode, definition, router]);

  function handleEditorValidate(markers: any[]) {
    const errors = markers.filter(
      (marker) =>
        marker.severity === 8 &&
        /**
         * We don't block diagram rendering for validation errors from the
         * Globus Flows Validation source – only JSON parsing errors.
         */
        marker.source !== GLOBUS_FLOWS_VALIDATION.SOURCE,
    );
    setValidity(errors);
  }

  return (
    <>
      <Head>
        <title>Globus : Flows IDE</title>
        <meta name="description" content="visualize and create flows" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Box height={LAYOUT.HEADER.HEIGHT}>
          <Flex bgColor={"brand.800"} px={2} align={"center"}>
            <Heading as="h1" color={"white"}>
              <Flex align={"center"}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/globus-logo.svg`}
                  alt="Globus Flows IDE"
                  boxSize={LAYOUT.HEADER.HEIGHT}
                  objectFit="contain"
                  p={1}
                />
              </Flex>
            </Heading>
            <Text color="white">
              <Code mx={1} colorScheme={"red"} variant={"solid"}>
                v{packageJson.version}-beta
              </Code>
              visualize and create flows
            </Text>
            <Spacer />
            <HStack>
              <Profile />
            </HStack>
          </Flex>
        </Box>

        <Flex h={`calc(100vh - ${LAYOUT.HEADER.HEIGHT})`} w={"100vw"}>
          {ENABLE_PANEL && <Panel />}
          <Box h="100%" w="50vw">
            <Tabs
              fontFamily="monospace"
              backgroundColor="rgb(30, 30, 30)"
              colorScheme="yellow"
              onChange={(index) => {
                setMode(index === 0 ? MODES.DEFINITION : MODES.INPUT_SCHEMA);
              }}
            >
              <TabList color="white">
                <Tab>Definiton</Tab>
                <Tab>Input Schema</Tab>
              </TabList>
            </Tabs>
            <Editor
              defaultValue={
                editorContents ? JSON.stringify(editorContents, null, 2) : ""
              }
              value={
                editorContents ? JSON.stringify(editorContents, null, 2) : ""
              }
              onChange={(value) => {
                if (isDefinitionMode) {
                  editorStore.replaceDefinitionFromString(value);
                } else {
                  editorStore.replaceSchemaFromString(value);
                }
              }}
              onValidate={handleEditorValidate}
              theme="vs-dark"
              settings={{ enableExperimentalValidation: true, mode }}
              path={
                mode === MODES.DEFINITION
                  ? "definition.json"
                  : "input-schema.json"
              }
            />
          </Box>
          <Box h="100%" w="100%" maxW="50vw">
            <Tabs>
              <TabList>
                <Tab>Definiton Diagram</Tab>
                {/* <Tab>Input Schema UI</Tab> */}
                <Tab>Documentation</Tab>
              </TabList>
              <TabPanels>
                <TabPanel h={LAYOUT.TAB_PANEL.HEIGHT}>
                  {invalidMarkers.length > 0 && (
                    <Box m={-4} position={"fixed"} zIndex={1} w="100%">
                      <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>Invalid JSON</AlertTitle>
                        <Box>
                          <AlertDescription>
                            Diagram will be disabled until errors are addressed.
                          </AlertDescription>
                        </Box>
                      </Alert>
                      <Box>
                        <List>
                          {invalidMarkers.map((marker, i) => (
                            <ListItem key={i}>
                              <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>
                                  {marker.message} at line{" "}
                                  {marker.startLineNumber}
                                </AlertTitle>
                              </Alert>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  )}
                  <Diagram />
                </TabPanel>
                {/* <TabPanel></TabPanel> */}
                <TabPanel
                  h={LAYOUT.TAB_PANEL.HEIGHT}
                  maxH={LAYOUT.TAB_PANEL.HEIGHT}
                  overflow="scroll"
                >
                  <DocumentationBrowser />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </main>
    </>
  );
}
