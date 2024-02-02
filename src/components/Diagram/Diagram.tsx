"use client";

import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
  Node,
  Edge,
} from "reactflow";
import StateNode from "./StateNode";

import type { FlowDefinition } from "@/pages/index";

import "reactflow/dist/style.css";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: { id: string; [key: string]: any }[],
  edges: Record<string, any>[],
  options: {
    direction: "TB" | "LR";
  },
) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, { ...node, width: 150, height: 50 }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

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

  const nodes = Object.entries(States).map(([id, state]) => {
    return {
      id,
      type: "StateNode",
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

  return getLayoutedElements(nodes, edges, { direction: "TB" });
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
