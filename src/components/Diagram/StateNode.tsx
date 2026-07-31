import {
  Badge,
  Paper,
  Flex,
  Stack,
  Text,
  Group,
  type BadgeProps,
} from "@mantine/core";
import { Handle, Position } from "reactflow";

import type { FlowDefinition } from "@/flow";
import { useMonaco } from "@monaco-editor/react";
import { LuListTodo } from "react-icons/lu";
type State = FlowDefinition["States"][string];

function Icon({ type }: { type: string }) {
  return type === "AwaitWebInput" ? <LuListTodo size="1em" /> : null;
}

function TypeBadge({ type, ...rest }: { type: string } & BadgeProps) {
  if (!type) return null;
  const props = {
    Fail: { color: "red" },
    Pass: { color: "green" },
    Choice: { color: "blue" },
    ExpressionEval: { color: "purple" },
  }[type];
  return (
    <Badge tt="none" variant="outline" {...props} {...rest} ff="monospace">
      <Group gap={2}>
        <Icon type={type} />
        {type}
      </Group>
    </Badge>
  );
}

function getStylePropsForState({
  isStart,
  isEnd,
  state,
}: {
  isStart: boolean;
  isEnd: boolean;
  state?: State;
}) {
  if (isStart) return { bg: "green.1" };
  if (isEnd) return { bg: "green.1" };

  if (state?.Type === "Fail") return { bg: "red.1" };

  return {
    bg: "white",
  };
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
  return (
    <>
      <Flex onClick={goToState}>
        {!isStart && (
          <Handle type="target" isConnectable={false} position={Position.Top} />
        )}
        <Paper
          withBorder
          p="xs"
          {...getStylePropsForState({ isStart, isEnd, state })}
        >
          <Stack gap={1}>
            <Text c="black">{id}</Text>
            <TypeBadge type={state?.Type || ""} size="xs" />
          </Stack>
        </Paper>
        <Handle
          type="source"
          isConnectable={false}
          position={Position.Bottom}
        />
      </Flex>
    </>
  );
}
