"use client";

import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
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
  g.setGraph({
    rankdir: options.direction,
    nodesep: 200,
    ranksep: 100,
    align: "UL",
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, { ...node, width: 150, height: 25 }),
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
      draggable: false,
    };
  });

  const edges = [];

  for (const [id, state] of Object.entries(States)) {
    if (state.Next) {
      edges.push({
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
      });
    }
    if (state.Default) {
      edges.push({
        id: `${id}-${state.Default}`,
        source: id,
        target: state.Default,
        animated: true,
        type: "straight",
        style: {
          strokeWidth: 2,
        },
      });
    }
    if (state.Catch) {
      for (const [catchId, catchState] of Object.entries(state.Catch)) {
        edges.push({
          id: `${id}-${catchId}`,
          source: id,
          target: catchState?.Next,
          type: "straight",
          animated: true,
          style: {
            strokeWidth: 2,
            stroke: "red",
          },
        });
      }
    }

    if (state.Type === "Choice" && state.Choices) {
      for (const [choiceId, choice] of Object.entries(state.Choices)) {
        edges.push({
          id: `${id}-${choiceId}`,
          source: id,
          target: choice.Next,
          type: "straight",
          animated: true,
          style: {
            strokeWidth: 2,
            stroke:
              choice.Next && States[choice.Next]?.Type === "Fail"
                ? "red"
                : "black",
          },
        });
      }
    }
  }

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
