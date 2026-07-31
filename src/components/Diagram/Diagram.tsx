import "reactflow/dist/style.css";

import { useEffect, useRef } from "react";
import Dagre from "@dagrejs/dagre";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { useEditorStore } from "@/stores/editor";
import StateNode from "./StateNode";

import type { FlowDefinition } from "@/flow";

const getLayoutedElements = (
  nodes: { id: string; [key: string]: any }[],
  edges: Record<string, any>[],
  options: {
    direction: "TB" | "LR";
  },
) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
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

  const nodes = Object.entries(States).map(([id, state], i) => {
    return {
      /**
       * Ensure the `id` of the node has a distinct value, even when the user might delete the named State key during editing.
       */
      id: id.length > 0 ? id : `StateNode--${i}`,
      type: "StateNode",
      data: { id, state, definition },
      markerStart: "arrow",
    };
  });

  const edges = [];

  for (const [id, state] of Object.entries(States)) {
    // Guard against undefined/null state during live editing.
    if (!state) continue;

    // "Basic" transition between states.
    if (state.Next && States[state.Next]) {
      edges.push({
        id: `${id}::next::${state.Next}`,
        source: id,
        target: state.Next,
        type: "smoothstep",
        markerEnd: { type: MarkerType.Arrow },
        style: { strokeWidth: 2 },
      });
    }

    // Catch: Group multiple catchers targeting the same state into a single edge to avoid overlapping edges on the diagram.
    if (Array.isArray(state.Catch)) {
      const catchByTarget = new Map<string, string[]>();
      for (const catcher of state.Catch) {
        if (!catcher.Next || !States[catcher.Next]) continue;
        const errors = catchByTarget.get(catcher.Next) ?? [];
        errors.push(...(catcher.ErrorEquals ?? []));
        catchByTarget.set(catcher.Next, errors);
      }
      for (const [target, errors] of catchByTarget) {
        const label =
          errors.length === 0
            ? "Catch"
            : errors.length === 1
              ? errors[0]
              : `${errors[0]}, +${errors.length - 1} more`;
        edges.push({
          id: `${id}::catch::${target}`,
          source: id,
          target,
          type: "smoothstep",
          animated: true,
          label,
          labelStyle: { fontFamily: "monospace" },
          style: { strokeWidth: 2, stroke: "red" },
          markerEnd: { type: MarkerType.Arrow, color: "red" },
        });
      }
    }

    // Choice: "Default" transition
    if (state.Type === "Choice" && state.Default && States[state.Default]) {
      edges.push({
        id: `${id}::default::${state.Default}`,
        source: id,
        target: state.Default,
        animated: true,
        type: "smoothstep",
        label: "Default",
        labelStyle: { fontFamily: "monospace" },
        style: { strokeWidth: 2 },
      });
    }

    // Choice: Groups multiple rules targeting the same state into a single edge labelled with the rule indices.
    if (state.Type === "Choice" && Array.isArray(state.Choices)) {
      const choiceByTarget = new Map<string, number[]>();
      for (let i = 0; i < state.Choices.length; i++) {
        const choice = state.Choices[i];
        if (!choice.Next || !States[choice.Next]) continue;
        const indices = choiceByTarget.get(choice.Next) ?? [];
        indices.push(i + 1);
        choiceByTarget.set(choice.Next, indices);
      }
      for (const [target, indices] of choiceByTarget) {
        const isFail = States[target]?.Type === "Fail";
        edges.push({
          id: `${id}::choice::${target}`,
          source: id,
          target,
          type: "smoothstep",
          animated: true,
          label: `Choice ${indices.join(", ")}`,
          labelStyle: { fontFamily: "monospace" },
          style: { strokeWidth: 2, stroke: isFail ? "red" : undefined },
          markerEnd: isFail
            ? { type: MarkerType.Arrow, color: "red" }
            : { type: MarkerType.Arrow },
        });
      }
    }
  }

  return getLayoutedElements(nodes, edges, { direction: "TB" });
}

const nodeTypes = { StateNode: StateNode };

export default function Diagram() {
  const definition = useEditorStore((state) => state.definition);
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
  );
}
