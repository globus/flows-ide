import {
  Badge,
  Paper,
  Flex,
  Stack,
  Text,
  Tooltip,
  Group,
  type BadgeProps,
} from "@mantine/core";
import { Handle, Position } from "reactflow";
import {
  LuCheck,
  LuCircleDot,
  LuCode,
  LuHourglass,
  LuListTodo,
  LuRegex,
  LuX,
} from "react-icons/lu";
import { useMonaco } from "@monaco-editor/react";

import type { FlowDefinition } from "@/flow";
type State = FlowDefinition["States"][string];

const TYPE_COLORS: Record<string, string> = {
  Action: "blue",
  Choice: "blue",
  ExpressionEval: "violet",
  Fail: "red",
  Pass: "green",
  Wait: "cyan",
  AwaitWebInput: "blue",
  CreateWebInput: "blue",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Action: <LuCode size="1em" />,
  Choice: <LuCircleDot size="1em" />,
  ExpressionEval: <LuRegex size="1em" />,
  Fail: <LuX size="1em" />,
  Pass: <LuCheck size="1em" />,
  Wait: <LuHourglass size="1em" />,
  AwaitWebInput: <LuListTodo size="1em" />,
  CreateWebInput: <LuListTodo size="1em" />,
};

function TypeIcon({ type }: { type: string }) {
  if (!type) return null;
  return TYPE_ICONS[type] ?? null;
}

function TypeBadge({ type }: { type: string } & BadgeProps) {
  if (!type) return null;
  return (
    <Badge
      tt="none"
      ff="monospace"
      variant="outline"
      radius="sm"
      color={TYPE_COLORS[type]}
    >
      <Group gap={4}>
        <TypeIcon type={type} />
        {type}
      </Group>
    </Badge>
  );
}

export default function StateNode({
  data: { state, definition, id },
}: {
  data: {
    id: string;
    definition: FlowDefinition;
    state: undefined | State;
  };
}) {
  const monaco = useMonaco();
  function goToState() {
    if (monaco) {
      const models = monaco.editor.getModels();
      const matches = models[0].findMatches(
        `"${id}":`,
        true,
        true,
        true,
        null,
        true,
      );
      if (!matches.length) return;
      monaco.editor
        .getEditors()[0]
        .revealLineInCenter(matches[0].range.startLineNumber);
      monaco.editor.getEditors()[0].focus();
      monaco.editor
        .getEditors()[0]
        .setPosition(matches[0].range.getStartPosition());
    }
  }

  const isStart = id === definition.StartAt;
  const isEnd = state?.End === true;
  const isTerminal = isEnd || state?.Type === "Fail";

  return (
    <Flex onClick={goToState}>
      {!isStart && (
        <Handle type="target" isConnectable={false} position={Position.Top} />
      )}
      <Tooltip
        label={state?.Comment}
        disabled={!state?.Comment}
        position="right"
        withArrow
      >
        <Paper withBorder p="xs" bg="white" miw={200}>
          <Stack gap={1}>
            <Group justify="space-between" align="center">
              <Text c="black" size="xs" fw={500}>
                {id}
              </Text>
              {isStart && (
                <Badge color="green" size="xs">
                  Start
                </Badge>
              )}
              {isEnd && (
                <Badge color="blue" size="xs">
                  End
                </Badge>
              )}
              {state?.Type === "Fail" && (
                <Badge color="red" size="xs">
                  Fail
                </Badge>
              )}
            </Group>
            <TypeBadge type={state?.Type || ""} size="compact-xs" />
          </Stack>
        </Paper>
      </Tooltip>
      {!isTerminal && (
        <Handle
          type="source"
          isConnectable={false}
          position={Position.Bottom}
        />
      )}
    </Flex>
  );
}
