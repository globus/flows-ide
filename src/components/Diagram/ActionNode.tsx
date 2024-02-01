import {
  Badge,
  Box,
  Card,
  CardHeader,
  Code,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

export default function ActionNode({
  data: { state, definition, id },
}: {
  data: any;
}) {
  const isStart = id === definition.StartAt;
  const isEnd = state.End === true;

  return (
    <>
      <Flex>
        {!isStart && <Handle type="target" position={Position.Top} />}
        <Box border="1px" borderColor="gray.200" p={2} borderRadius="sm">
          <Text fontWeight="bold" fontSize="sm">
            <Flex>
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
              <Spacer />
              <Box>
                <Badge mr="1" variant="outline">
                  {state.Type}
                </Badge>
              </Box>
            </Flex>
          </Text>

          <Box>
            {state.Comment ? (
              <Text fontSize={"sm"}>{state.Comment}</Text>
            ) : null}
          </Box>
        </Box>
        {!isEnd && <Handle type="source" position={Position.Bottom} />}
      </Flex>
    </>
  );
}
