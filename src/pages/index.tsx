import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Grid,
  GridItem,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Input,
  SkeletonText,
  CardFooter,
  Link,
  Text,
  Box,
  Flex,
  Stack,
  Spacer,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import Editor from "../components/Editor";
import Diagram from "../components/Diagram/Diagram";
import { useEffect, useState } from "react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

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
        <Flex bgColor={"purple.800"} px={2} align={"center"}>
          <Heading as="h1" color={"plum"}>
            <Text>plum</Text>
          </Heading>
          <Spacer />
          <Text color="white">visualize and create flows</Text>
        </Flex>
        <Container maxW="2560px">
          <Grid
            h="90vh"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={1}
          >
            <GridItem rowSpan={3} colSpan={1}>
              <Editor
                // @ts-ignore
                defaultValue={
                  definition ? JSON.stringify(definition, null, 2) : ""
                }
                onChange={handleEditorChange}
                onValidate={handleEditorValidate}
              />
            </GridItem>
            <GridItem colSpan={1} rowSpan={2}>
              {invalidMarkers.length > 0 && (
                <Alert status="error" position={"absolute"} zIndex={1}>
                  <AlertIcon />
                  <AlertTitle>Invalid JSON</AlertTitle>
                  <Box>
                    <AlertDescription>
                      Diagram updating is disabled until the JSON is valid.
                      <List>
                        {invalidMarkers.map((marker, i) => (
                          <ListItem key={i}>
                            {marker.message} at line {marker.startLineNumber}.
                          </ListItem>
                        ))}
                      </List>
                    </AlertDescription>
                  </Box>
                </Alert>
              )}
              <Diagram definition={definition} />
            </GridItem>
            <GridItem colSpan={1}>
              {/* <Flex h="100%" direction={"column"}>
                <Card my={2}>
                  <CardBody>
                    <Input placeholder="find an action provider" size="md" />
                  </CardBody>
                </Card>
                <Spacer />
                <Stack>
                  
                </Stack>
              </Flex> */}
            </GridItem>
          </Grid>
        </Container>
      </main>
    </>
  );
}
