"use client";
import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import StateNode from "./StateNode";

import type { FlowDefinition } from "@/pages/index";

import "reactflow/dist/style.css";

function toNodesAndEdges(definition: FlowDefinition | undefined) {
  const result: {
    nodes: ({
      id: keyof FlowDefinition["States"];
      position: { x: number; y: number };
      data: {
        id: keyof FlowDefinition["States"];
        state: FlowDefinition["States"][string];
        definition: FlowDefinition;
      };
    } & any)[];
    edges: any[];
  } = { nodes: [], edges: [] };

  if (!definition) return result;

  const { States, StartAt } = definition;

  if (!StartAt || !States) {
    return result;
  }
  /**
   * @todo This works well for keeping the proper order, but does not account
   * for unlinked states.
   */
  // let id = StartAt;
  // let offset = 0;
  // do {
  //   const state = States[id];
  //   result.nodes.push({
  //     id,
  //     type: "StateNode",
  //     position: { x: 5, y: 0 + offset * 100 },
  //     data: { id, state, definition },
  //     markerStart: "arrow",
  //   });
  //   if (state?.Next) {
  //     result.edges.push({
  //       id: `${id}-${state.Next}`,
  //       type: "smoothstep",
  //       source: id,
  //       target: state.Next,
  //       markerEnd: {
  //         type: MarkerType.Arrow,
  //       },
  //       style: {
  //         strokeWidth: 2,
  //       },
  //     });
  //   }
  //   id = state?.Next;
  //   offset++;
  // } while (id);

  const nodes = Object.entries(States).map(([id, state], i) => {
    return {
      id,
      type: "StateNode",
      position: { x: 5, y: 0 + i * 100 },
      data: { id, state, definition },
      markerStart: "arrow",
    };
  });

  const edges = Object.entries(States).map(([id, state]) => {
    return {
      id: `${id}-${state.Next}`,
      source: id,
      target: state.Next,
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
      style: {
        strokeWidth: 2,
      },
    };
  });

  return { nodes, edges };
}

export default function Diagram({ definition }: { definition: any }) {
  const nodeTypes = useMemo(() => ({ StateNode: StateNode }), []);
  const { nodes, edges } = toNodesAndEdges(definition);
  return (
    <Box h={"100%"} w={"100%"}>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Box>
  );
}
