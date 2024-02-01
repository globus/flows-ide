"use client";
import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import StateNode from "./StateNode";

import "reactflow/dist/style.css";

function toNodesAndEdges(
  definition:
    | { States: Record<string, any>; StartAt: string; Comment?: string }
    | undefined,
) {
  if (!definition) return { nodes: [], edges: [] };

  const { States, StartAt } = definition;

  if (!StartAt || !States) {
    return { nodes: [], edges: [] };
  }

  const nodes = Object.entries(States).map(([id, state], i) => {
    return {
      id,
      type: "StateNode",
      position: { x: 5, y: 0 + i * 100 },
      data: { id, state, definition },
    };
  });

  console.log(nodes);

  const edges = Object.entries(States).map(([id, state]) => {
    return {
      id: `${id}-${state.Next}`,
      source: id,
      target: state.Next,
    };
  });

  return { nodes, edges };
}

export default function Diagram({ definition }: { definition: any }) {
  const nodeTypes = useMemo(() => ({ StateNode: StateNode }), []);

  const def = toNodesAndEdges(definition);

  return (
    <Box h={"100%"} w={"100%"}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={def.nodes}
        edges={def.edges}
        fitView
      >
        {/* <MiniMap /> */}
        <Controls />
        <Background />
      </ReactFlow>
    </Box>
  );
}
