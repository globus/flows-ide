import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";

import type { FlowDefinition } from "@/pages";
type State = FlowDefinition["States"][string];

function TypeBadge({ type, ...rest }: { type: string }) {
  if (!type) return null;
  const props = {
    Fail: { colorScheme: "red" },
    Pass: { colorScheme: "green" },
    Choice: { colorScheme: "blue" },
    ExpressionEval: { colorScheme: "purple" },
  }[type];
  return (
    <Badge variant={"outline"} {...props} {...rest}>
      {type}
    </Badge>
  );
}

function getStypePropsForState({
  isStart,
  isEnd,
  state,
}: {
  isStart: boolean;
  isEnd: boolean;
  state?: State;
}) {
  if (isStart) return { backgroundColor: "green.50" };
  if (isEnd) return { backgroundColor: "green.50" };

  if (state?.Type === "Fail") return { backgroundColor: "red.50" };

  return {
    backgroundColor: "white",
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
  const isStart = id === definition.StartAt;
  const isEnd = state?.End === true;
  return (
    <>
      <Flex>
        {!isStart && (
          <Handle type="target" isConnectable={false} position={Position.Top} />
        )}
        <Box
          border="1px"
          borderColor="gray.200"
          p={2}
          borderRadius="sm"
          {...getStypePropsForState({ isStart, isEnd, state })}
        >
          <Text fontWeight="bold">
            <Box>
              {id}
              <Box>
                <TypeBadge type={state?.Type || ""} />
              </Box>
            </Box>
          </Text>
        </Box>
        {!isEnd && state?.Next && (
          <Handle
            type="source"
            isConnectable={false}
            position={Position.Bottom}
          />
        )}
      </Flex>
    </>
  );
}
