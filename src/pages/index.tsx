import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Grid,
  GridItem,
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
  Button,
  Code,
  Image,
  HStack,
} from "@chakra-ui/react";
import Editor from "../components/Editor";
import Diagram from "../components/Diagram/Diagram";
import { useCallback, useEffect, useState } from "react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { DocumentationBrowser } from "@/components/DocumentationBrowser/DocumentationBrowser";
import packageJson from "../../package.json" assert { type: "json" };
import {
  useFlowDefinition,
  useFlowDefinitionDispatch,
} from "@/components/FlowDefinitionProvider/FlowDefinitionProvider";

import Profile from "@/components/Profile";

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

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useFlowDefinitionDispatch();
  const definition = useFlowDefinition();

  const [invalidMarkers, setValidity] = useState<any[]>([]);
  const [isSplitRight, setIsSplitRight] = useState(true);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const d = searchParams.get("d");

  const replaceDefinition = useCallback(
    (def: string | undefined) => {
      try {
        const v = def ? JSON.parse(def) : undefined;
        dispatch?.({
          type: "replace",
          payload: v,
        });
      } catch {
        // ignore JSON parsing exceptions
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (d) {
      replaceDefinition(decompressFromEncodedURIComponent(d));
    }
  }, [d, replaceDefinition]);

  useEffect(() => {
    if (definition) {
      const v = compressToEncodedURIComponent(JSON.stringify(definition));
      router.push(`/?d=${v}`);
    }
  }, [definition, router]);

  function handleEditorValidate(markers: any[]) {
    const errors = markers.filter((marker) => marker.severity === 8);
    setValidity(errors);
  }

  let templateAreas = `
    "header header"
    "editor diagram"
  `;
  let gridTemplateColumns = "1fr 1fr";
  let gridTemplateRows = "auto 1fr";

  if (showDocumentation) {
    gridTemplateColumns = "1fr 1fr 1fr";
    gridTemplateRows = "auto 1fr 1fr";
    templateAreas = isSplitRight
      ? `
    "header header header"
    "editor diagram documentation"
    "editor diagram documentation"
  `
      : `
    "header header header"
    "editor documentation documentation"
    "editor diagram diagram"
  `;
  }

  return (
    <>
      <Head>
        <title>Globus : Flows IDE</title>
        <meta name="description" content="visualize and create flows" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Grid
          h="100vh"
          templateAreas={templateAreas}
          gridTemplateRows={gridTemplateRows}
          gridTemplateColumns={gridTemplateColumns}
          gap={0}
        >
          <GridItem area="header">
            <Flex bgColor={"brand.800"} px={2} align={"center"}>
              <Heading as="h1" color={"white"}>
                <Flex align={"center"}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/globus-logo.svg`}
                    alt="Globus Flows IDE"
                    boxSize="50px"
                    objectFit="contain"
                    p={1}
                    mx={2}
                  />
                </Flex>
              </Heading>
              <Text color="white">
                <Code mr={1} colorScheme={"red"} variant={"solid"}>
                  v{packageJson.version}-beta
                </Code>
                visualize and create flows
              </Text>
              <Spacer />
              <HStack>
                <Button
                  size="xs"
                  colorScheme="brand"
                  onClick={() => {
                    setShowDocumentation(!showDocumentation);
                  }}
                >
                  {showDocumentation ? "Hide" : "Show"} Documentation
                </Button>
                <Profile />
              </HStack>
            </Flex>
          </GridItem>
          <GridItem area={"editor"}>
            <Editor
              defaultValue={
                definition ? JSON.stringify(definition, null, 2) : ""
              }
              value={definition ? JSON.stringify(definition, null, 2) : ""}
              onChange={replaceDefinition}
              onValidate={handleEditorValidate}
              theme="vs-dark"
              settings={{ enableExperimentalValidation: true }}
            />
          </GridItem>
          <GridItem area={"diagram"}>
            {invalidMarkers.length > 0 && (
              <Box position={"fixed"} zIndex={1} w="100%">
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Invalid JSON</AlertTitle>
                  <Box>
                    <AlertDescription>
                      Diagram will be disabled until errors are addressed
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
                            {marker.message} at line {marker.startLineNumber}
                          </AlertTitle>
                        </Alert>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
            <Diagram />
          </GridItem>
          {showDocumentation && (
            <GridItem area={"documentation"} bg={"gray.100"}>
              <Flex justify={"right"} p={2} align={"center"}>
                <Heading as="h1" size="xs">
                  Documentation
                </Heading>
                <hr />
                <Spacer />
                <Button
                  onClick={() => setIsSplitRight(!isSplitRight)}
                  size="xs"
                  variant={"outline"}
                >
                  Split View {isSplitRight ? "Down" : "Right"}
                </Button>
              </Flex>
              <DocumentationBrowser />
            </GridItem>
          )}
        </Grid>
      </main>
    </>
  );
}
