"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  Flex,
  Button,
  Code,
  Text,
  Spacer,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Stack,
} from "@chakra-ui/react";
import { ExternalLinkIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  fetchActionProviders,
  type ActionProviderEntry,
  BOOTSTRAPPED,
} from "./library";
import { useEffect, useRef, useState } from "react";
import { useFlowDefinitionDispatch } from "../FlowDefinitionProvider/FlowDefinitionProvider";

const ActionProviderItem = ({ ap }: { ap: ActionProviderEntry }) => {
  const flowDefinitionDispatch = useFlowDefinitionDispatch();

  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {ap.definition?.title ?? ap.url}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel pb={4}>
        {ap.definition?.subtitle ? (
          <Box>
            <Text>{ap.definition?.subtitle ?? ""}</Text>
            <Code variant="outline" colorScheme="pink" my={2}>
              {ap.definition?.globus_auth_scope}
            </Code>
          </Box>
        ) : null}
        <Flex>
          <ButtonGroup>
            {ap?.definition?.title ? (
              <Button
                colorScheme="blue"
                variant={"outline"}
                leftIcon={<PlusSquareIcon />}
                onClick={() => {
                  flowDefinitionDispatch?.({
                    type: "add_ap",
                    payload: ap,
                  });
                }}
                size={"xs"}
              >
                Add State
              </Button>
            ) : null}
            <Button
              as={Link}
              href={ap.url}
              isExternal
              size={"xs"}
              variant={"outline"}
            >
              Definition
              <ExternalLinkIcon mx="2px" />
            </Button>
            <Button
              as={Link}
              href={ap.documentation}
              isExternal
              size={"xs"}
              variant={"outline"}
            >
              Documentation
              <ExternalLinkIcon mx="2px" />
            </Button>
          </ButtonGroup>
          <Spacer />
          <Text fontSize="xs">{ap.definition?.admin_contact}</Text>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export function DocumentationBrowser() {
  const [actionProviders, setActionProviders] = useState<ActionProviderEntry[]>(
    [],
  );

  const [actionProviderMenu, setActionProvidersMenu] = useState<{
    main: ActionProviderEntry[];
    transfer: ActionProviderEntry[];
  }>({ main: [], transfer: [] });

  const bootstrapped = useRef(BOOTSTRAPPED);

  useEffect(() => {
    async function execute() {
      const aps = await fetchActionProviders();
      setActionProviders(aps);
    }
    execute();
  }, [bootstrapped]);

  useEffect(() => {
    const transfer = actionProviders.filter((ap) =>
      ap.url.includes("transfer"),
    );
    const main = actionProviders.filter((ap) => !ap.url.includes("transfer"));

    setActionProvidersMenu({
      main,
      transfer,
    });
  }, [actionProviders]);

  return (
    <Stack p={2}>
      <Card as="section" size="sm">
        <CardHeader>
          <Heading as="h2" size="xs">
            Guides + Tutorials
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Link
              href="https://docs.globus.org/guides/tutorials/flow-automation/create-a-flow/"
              isExternal
              fontSize={"sm"}
            >
              How to Create a Flow
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Link
              href="https://docs.globus.org/guides/tutorials/flow-automation/run-a-flow/"
              isExternal
              fontSize={"sm"}
            >
              How to Run a Flow
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Stack>
        </CardBody>
      </Card>
      <Card as="section" size="sm">
        <CardHeader>
          <Heading as="h2" size="xs">
            Action Providers
          </Heading>
        </CardHeader>
        <CardBody>
          <Accordion allowMultiple>
            {actionProviderMenu.main.map((ap) => (
              <ActionProviderItem ap={ap} key={ap.url} />
            ))}
            <AccordionItem>
              <h3>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Globus Transfer
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                <Accordion allowMultiple>
                  {actionProviderMenu.transfer.map((ap) => (
                    <ActionProviderItem ap={ap} key={ap.url} />
                  ))}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </Stack>
  );
}
