"use client";

import {
  Anchor,
  Accordion,
  Text,
  Code,
  Button,
  Title,
  Stack,
  Paper,
  Group,
  ThemeIcon,
} from "@mantine/core";
import {
  LuExternalLink,
  LuPencil,
  LuSquarePlay,
  LuSquarePlus,
} from "react-icons/lu";
import {
  fetchActionProviders,
  type ActionProviderEntry,
  BOOTSTRAPPED,
} from "./library";
import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/stores/editor";

const ActionProviderItem = ({ ap }: { ap: ActionProviderEntry }) => {
  const editor = useEditorStore();

  return (
    <Accordion.Item value={ap.url}>
      <Accordion.Control>{ap.definition?.title ?? ap.url}</Accordion.Control>
      <Accordion.Panel>
        <Stack gap={1} mb="xs">
          {ap.definition?.subtitle ? (
            <Text size="xs">{ap.definition?.subtitle ?? ""}</Text>
          ) : null}
          <Text size="xs">Contact: {ap.definition?.admin_contact}</Text>
          <Text size="xs">
            Scope: <Code>{ap.definition?.globus_auth_scope}</Code>
          </Text>
        </Stack>
        <Group justify="space-between">
          <Group gap="xs">
            <Button
              component="a"
              href={ap.url}
              size={"xs"}
              variant="subtle"
              rightSection={<LuExternalLink />}
              rel="noopener noreferrer"
              target="_blank"
            >
              Definition
            </Button>
            <Button
              component="a"
              href={ap.documentation}
              size="xs"
              variant="subtle"
              rightSection={<LuExternalLink />}
              rel="noopener noreferrer"
              target="_blank"
            >
              Documentation
            </Button>
          </Group>

          {ap?.definition?.title ? (
            <Button
              color="blue"
              variant={"outline"}
              leftSection={<LuSquarePlus />}
              onClick={() => {
                editor.addActionProvider(ap);
              }}
              size="xs"
            >
              Add State
            </Button>
          ) : null}
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
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
    <Stack p="md">
      <Group gap="lg">
        <Group align="start">
          <ThemeIcon>
            <LuPencil size={16} />
          </ThemeIcon>
          <Stack gap={2}>
            Just getting started?
            <Anchor
              component="a"
              href="https://docs.globus.org/guides/tutorials/flow-automation/create-a-flow/"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn How to Create a Flow.&nbsp;
              <LuExternalLink />
            </Anchor>
          </Stack>
        </Group>

        <Group align="start">
          <ThemeIcon>
            <LuSquarePlay size={16} />
          </ThemeIcon>
          <Stack gap={2}>
            Ready to Run?
            <Anchor
              href="https://docs.globus.org/guides/tutorials/flow-automation/run-a-flow/"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn How to Run a Flow.&nbsp;
              <LuExternalLink />
            </Anchor>
          </Stack>
        </Group>
      </Group>

      <Paper component="section" withBorder p="sm">
        <Title component="h2" size="xs">
          Action Providers
        </Title>
        <Accordion multiple>
          {actionProviderMenu.main.map((ap) => (
            <ActionProviderItem ap={ap} key={ap.url} />
          ))}
          <Accordion.Item value="transfer">
            <Accordion.Control>Globus Transfer</Accordion.Control>
            <Accordion.Panel>
              <Accordion multiple>
                {actionProviderMenu.transfer.map((ap) => (
                  <ActionProviderItem ap={ap} key={ap.url} />
                ))}
              </Accordion>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
    </Stack>
  );
}
