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
} from "@chakra-ui/react";
import Editor from "../components/Editor";
import Diagram from "../components/Diagram/Diagram";
import { useEffect, useState } from "react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { DocumentationBrowser } from "@/components/DocumentationBrowser/DocumentationBrowser";

import package from "../../package.json" assert { type: "json" };

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

  const [definition, setDefinition] = useState<string | undefined>();
  const [invalidMarkers, setValidity] = useState<any[]>([]);
  const [isSplitRight, setIsSplitRight] = useState(true);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const d = searchParams.get("d");

  useEffect(() => {
    setDefinition(
      d ? JSON.parse(decompressFromEncodedURIComponent(d)) : undefined,
    );
  }, [d]);

  function handleEditorChange(value: string | undefined) {
    setDefinition(value ? JSON.parse(value) : undefined);
    if (value) {
      router.push(`/?d=${compressToEncodedURIComponent(value)}`);
    }
  }

  function handleEditorValidate(markers: any[]) {
    setValidity(markers);
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
                  v{package.version}-beta
                </Code>
                visualize and create flows
              </Text>
              <Spacer />
              <Button
                size="xs"
                colorScheme="brand"
                onClick={() => {
                  setShowDocumentation(!showDocumentation);
                }}
              >
                {showDocumentation ? "Hide" : "Show"} Documentation
              </Button>
            </Flex>
          </GridItem>
          <GridItem area={"editor"}>
            <Editor
              // @ts-ignore
              defaultValue={
                definition ? JSON.stringify(definition, null, 2) : ""
              }
              onChange={handleEditorChange}
              onValidate={handleEditorValidate}
              theme="vs-dark"
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
            <Diagram definition={definition} />
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
