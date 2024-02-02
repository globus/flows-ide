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
} from "@chakra-ui/react";
import Editor from "../components/Editor";
import Diagram from "../components/Diagram/Diagram";
import { useEffect, useState } from "react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export type FlowDefinition = {
  States: {
    [key: string]: {
      Next?: string;
      End?: boolean;
      Comment?: string;
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

  return (
    <>
      <Head>
        <title>plum</title>
        <meta name="description" content="visualize and create flows" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Grid
          h="100vh"
          templateAreas={`"header header"
            "editor diagram"`}
          gridTemplateRows={"auto 1fr"}
          gridTemplateColumns={"1fr 1fr"}
          gap={0}
        >
          <GridItem area="header">
            <Flex bgColor={"purple.800"} px={2} align={"center"}>
              <Heading as="h1" color={"plum"}>
                <Text>plum</Text>
              </Heading>
              <Spacer />
              <Text color="white">visualize and create flows</Text>
            </Flex>
          </GridItem>
          <GridItem area={"editor"}>
            {" "}
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
        </Grid>
      </main>
    </>
  );
}
