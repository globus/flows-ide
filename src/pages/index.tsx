import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Flex,
  Title,
  Text,
  Code,
  Group,
  Tabs,
  Stack,
  Image,
  AppShell,
  SimpleGrid,
  Center,
  ScrollArea,
  Paper,
} from "@mantine/core";
import Editor from "../components/Editor";
import Diagram from "../components/Diagram/Diagram";
import { decompressFromEncodedURIComponent } from "lz-string";
import { DocumentationBrowser } from "@/components/DocumentationBrowser/DocumentationBrowser";
import packageJson from "../../package.json" assert { type: "json" };

import { useEditorStore } from "@/stores/editor";

import Profile from "@/components/Profile";

import { GLOBUS_FLOWS_VALIDATION } from "@/components/Validate";
import Panel from "@/components/Panel";
import { FlowsStartForm } from "@globus/react-components";
import { ShareButton } from "@/components/ShareButton";
import DocumentationDrawer from "@/components/DocumentationBrowser/Drawer";
import { LuCircleAlert, LuInfo, LuOctagonAlert } from "react-icons/lu";

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

/**
 * Feature flag to enable/disable the "Panel" component.
 */
const ENABLE_PANEL = false;

const APP_SHELL_HEIGHT =
  "calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))";
const APP_SHELL_MAIN_INNER_HEIGHT = `calc(${APP_SHELL_HEIGHT} - 36px)`;

export default function Home() {
  const router = useRouter();

  const editorStore = useEditorStore();
  const schema = editorStore.schema;

  const bootstrapped = useRef(false);

  const [invalidMarkers, setValidity] = useState<any[]>([]);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    /**
     * If we're returning from an OAuth2 redirect, there might be a definition
     * stored in the storage that we should make sure to use.
     */
    editorStore.restore();
    /**
     * Attempt to bootstrap from the initial "d" and "s" query parameters.
     */
    const queryParams = new URLSearchParams(document?.location?.search || {});
    const queryParameterDef = queryParams.get("d");
    const queryParameterSchema = queryParams.get("s");
    if (queryParameterDef) {
      editorStore.replaceDefinitionFromString(
        decompressFromEncodedURIComponent(queryParameterDef),
      );
    }
    if (queryParameterSchema) {
      editorStore.replaceSchemaFromString(
        decompressFromEncodedURIComponent(queryParameterSchema),
      );
    }
    /**
     * Remove the query parameters so that we don't keep bootstrapping
     */
    if (queryParameterDef || queryParameterSchema) {
      const newQueryParams = new URLSearchParams(
        document?.location?.search || {},
      );
      newQueryParams.delete("d");
      newQueryParams.delete("s");
      const qpString = newQueryParams.toString();
      const newUrl = `${document.location.origin}${document.location.pathname}${qpString ? `?${qpString}` : ""}`;
      router.replace(newUrl);
    }
  }, [editorStore, router]);

  useEffect(() => {
    editorStore.preserve();
  }, [
    editorStore.definition,
    editorStore.schema,
    editorStore.preserve,
    editorStore,
  ]);

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
      <AppShell header={{ height: 50 }}>
        <AppShell.Header bg="brand.9">
          <Flex justify="space-between" align="center" h="100%" px="sm">
            <Group align="center">
              <Title component="h1" c={"white"}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/globus-logo.svg`}
                  alt="Globus Flows IDE"
                  h={25}
                />
              </Title>
              <Text c="white">
                <Code color="red" mr="sm">
                  v{packageJson.version}-beta
                </Code>
                visualize and create flows
              </Text>
            </Group>
            <Group>
              <DocumentationDrawer />
              <ShareButton />
              <Profile />
            </Group>
          </Flex>
        </AppShell.Header>
        <AppShell.Main>
          {ENABLE_PANEL && <Panel />}
          <SimpleGrid cols={2} spacing={0} h={APP_SHELL_HEIGHT}>
            <Tabs defaultValue="definition" color="orange">
              <Tabs.List>
                <Tabs.Tab value="definition">Definition</Tabs.Tab>
                <Tabs.Tab value="input-schema">Input Schema</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="definition">
                <Editor
                  defaultValue={
                    editorStore.definition
                      ? JSON.stringify(editorStore.definition, null, 2)
                      : ""
                  }
                  value={
                    editorStore.definition
                      ? JSON.stringify(editorStore.definition, null, 2)
                      : ""
                  }
                  onChange={(value) => {
                    editorStore.replaceDefinitionFromString(value);
                  }}
                  onValidate={handleEditorValidate}
                  theme="vs-dark"
                  settings={{
                    enableExperimentalValidation: true,
                    mode: "DEFINITION",
                  }}
                  path={"definition.json"}
                  height={APP_SHELL_MAIN_INNER_HEIGHT}
                />
              </Tabs.Panel>
              <Tabs.Panel value="input-schema">
                <Editor
                  defaultValue={
                    editorStore.schema
                      ? JSON.stringify(editorStore.schema, null, 2)
                      : ""
                  }
                  value={
                    editorStore.schema
                      ? JSON.stringify(editorStore.schema, null, 2)
                      : ""
                  }
                  onChange={(value) => {
                    editorStore.replaceSchemaFromString(value);
                  }}
                  onValidate={handleEditorValidate}
                  theme="vs-dark"
                  settings={{
                    enableExperimentalValidation: true,
                    mode: "INPUT_SCHEMA",
                  }}
                  path="input-schema.json"
                  height={APP_SHELL_MAIN_INNER_HEIGHT}
                />
              </Tabs.Panel>
            </Tabs>
            <Tabs defaultValue="definition" color="orange">
              <Tabs.List>
                <Tabs.Tab value="definition">Definiton Diagram</Tabs.Tab>
                <Tabs.Tab value="input-schema">Input Schema UI</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="definition">
                {invalidMarkers.length > 0 && (
                  <Box m={-4} p={"fixed"} w="100%" style={{ zIndex: 1 }}>
                    <Alert
                      color="red"
                      title="Invalid JSON"
                      icon={<LuOctagonAlert />}
                    >
                      Diagram will be disabled until errors are addressed.
                    </Alert>
                    <Stack>
                      {invalidMarkers.map((marker, i) => (
                        <Alert
                          key={i}
                          color="red"
                          icon={<LuCircleAlert />}
                          title={`${marker.message} at line ${marker.startLineNumber}`}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
                <Box h={APP_SHELL_MAIN_INNER_HEIGHT} w="100%" bg="white">
                  <Diagram />
                </Box>
              </Tabs.Panel>
              <Tabs.Panel value="input-schema">
                {schema ? (
                  <ScrollArea h={APP_SHELL_MAIN_INNER_HEIGHT}>
                    <Alert icon={<LuInfo />} title="Experimental">
                      <Text size="sm">
                        This is an experimental rendering of your input schema
                        as a form, similar to the Guided Start page in the
                        Globus Web Application.
                      </Text>
                    </Alert>
                    <Paper p="md" m="md" withBorder>
                      <FlowsStartForm
                        schema={schema}
                        uiSchema={{
                          "ui:submitButtonOptions": {
                            norender: true,
                          },
                        }}
                      />
                    </Paper>
                  </ScrollArea>
                ) : (
                  <Center my="md">
                    <Text c="dimmed">
                      Start by defining an Input Schema in the editor.
                    </Text>
                  </Center>
                )}
              </Tabs.Panel>
              <Tabs.Panel value="documentation">
                <ScrollArea h={APP_SHELL_MAIN_INNER_HEIGHT}>
                  <DocumentationBrowser />
                </ScrollArea>
              </Tabs.Panel>
            </Tabs>
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
