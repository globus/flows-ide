import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";

import type { FlowDefinition } from "@/pages";

export default function StateNode({
  data: { state, definition, id },
}: {
  data: {
    id: string;
    definition: FlowDefinition;
    state: undefined | FlowDefinition["States"][string];
  };
}) {
  const isStart = id === definition.StartAt;
  const isEnd = state?.End === true;
  return (
    <>
      <Flex>
        {!isStart && <Handle type="target" position={Position.Top} />}
        <Box
          border="1px"
          borderColor="gray.200"
          backgroundColor={"white"}
          p={2}
          borderRadius="sm"
        >
          <Text fontWeight="bold">
            <Box>
              {isStart && (
                <Badge mr="1" colorScheme="green">
                  Start
                </Badge>
              )}
              {isEnd && (
                <Badge mr="1" colorScheme="red">
                  End
                </Badge>
              )}
              {id}
            </Box>
          </Text>
          <Box>
            {state?.Comment ? (
              <Text fontSize={"xs"}>{state?.Comment}</Text>
            ) : null}
          </Box>
        </Box>
        {!isEnd && <Handle type="source" position={Position.Right} />}
      </Flex>
    </>
  );
}
