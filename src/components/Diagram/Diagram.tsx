"use client";

import { useEffect, useMemo, useRef } from "react";
import { Box } from "@chakra-ui/react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
  useEdgesState,
  useNodesState,
} from "reactflow";
import StateNode from "./StateNode";

import type { FlowDefinition } from "@/pages/index";

import "reactflow/dist/style.css";
import { useFlowDefinition } from "../FlowDefinitionProvider/FlowDefinitionProvider";

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
        label: "Default",
        labelStyle: {
          fontFamily: "monospace",
        },
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
          target: catchState.Next,
          type: "straight",
          animated: true,
          label: "Catch",
          labelStyle: {
            fontFamily: "monospace",
          },
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
          label: "Choice",
          labelStyle: {
            fontFamily: "monospace",
          },
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

export default function Diagram() {
  const definition = useFlowDefinition();

  const nodeTypes = useMemo(() => ({ StateNode: StateNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const previousNodes = useRef(nodes);
  useEffect(() => {
    previousNodes.current = nodes;
  }, [nodes]);

  useEffect(() => {
    const { nodes: updatedNodes, edges: updatedEdges } =
      toNodesAndEdges(definition);
    updatedNodes.forEach((updatedNode) => {
      const match = previousNodes.current.find(
        (existingNode) => existingNode.id === updatedNode.id,
      );
      if (match) {
        // Retain position data associated with this node id
        updatedNode.position = match.position;
      }
    });
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [definition, previousNodes, setEdges, setNodes]);

  return (
    <Box h={"100%"} w={"100%"}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Box>
  );
}
