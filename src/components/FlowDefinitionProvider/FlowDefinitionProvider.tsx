import { createContext, useReducer, useContext } from "react";

import type { FlowDefinition } from "@/pages";
import type { PropsWithChildren } from "react";
import {
  ActionProviderEntry,
  toPascalCase,
} from "../DocumentationBrowser/library";

type FlowDefinitionPayload = {
  type: "replace";
  payload: FlowDefinition | undefined;
};
type ActionProviderPayload = {
  type: "add_ap";
  payload: ActionProviderEntry;
};

type ReducerAction = FlowDefinitionPayload | ActionProviderPayload;

function flowDefinitionReducer(
  definition: FlowDefinition | undefined,
  action: ReducerAction,
): FlowDefinition | undefined {
  switch (action.type) {
    // Replace the current definition with the new one or remove it by passing undefined
    case "replace":
      return action.payload !== undefined ? { ...action.payload } : undefined;

    // Add an action provider to the definition without clobbering exisiting keys in `States`
    case "add_ap":
      let title = toPascalCase(action.payload?.definition?.title || "");

      if (definition?.States && title in definition.States) {
        let i = 1;
        while (`${title}${i}` in definition.States) {
          i++;
        }
        title = `${title}${i}`;
      }

      return {
        ...(definition ?? { States: {}, StartAt: "" }),
        States: {
          ...(definition?.States ?? {}),
          [title]: {
            Type: "Action",
            ActionUrl: action?.payload?.url,
            Parameters: {},
            ...(action.payload.definition?.subtitle
              ? { Comment: action.payload.definition?.subtitle }
              : {}),
            Next: "",
          },
        },
      };
  }
}

const FlowDefinitionContext = createContext<FlowDefinition | undefined>(
  undefined,
);
const FlowDefinitionDispatchContext = createContext<
  React.Dispatch<ReducerAction> | undefined
>(undefined);

export function FlowDefinitionProvider({ children }: PropsWithChildren<{}>) {
  const [definition, dispatch] = useReducer(flowDefinitionReducer, undefined);
  return (
    <FlowDefinitionContext.Provider value={definition}>
      <FlowDefinitionDispatchContext.Provider value={dispatch}>
        {children}
      </FlowDefinitionDispatchContext.Provider>
    </FlowDefinitionContext.Provider>
  );
}

export function useFlowDefinition() {
  return useContext(FlowDefinitionContext);
}

export function useFlowDefinitionDispatch() {
  return useContext(FlowDefinitionDispatchContext);
}
