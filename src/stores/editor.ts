import { create } from "zustand";

import { toPascalCase } from "@/components/DocumentationBrowser/library";

import type { FlowDefinition } from "@/pages";
import type { ActionProviderEntry } from "@/components/DocumentationBrowser/library";

type EditorState = {
  definition: FlowDefinition | undefined;
  replace: (def?: FlowDefinition) => void;
  replaceDefinitionFromString: (s?: string) => void;
  /**
   * Attempt to restore the definition from local storage.
   */
  restore: () => void;
  /**
   * Preserve the current definition in local storage.
   */
  preserve: () => void;
  /**
   * Add an action provider to the current definition.
   */
  addActionProvider: (ap: ActionProviderEntry) => void;
};

const DEFINITION_LOCAL_STORAGE_KEY = "definition";

export const useEditorStore = create<EditorState>((set, get) => ({
  definition: undefined,
  replaceDefinitionFromString(s?: string) {
    try {
      const v = s ? JSON.parse(s) : undefined;
      set({ definition: v });
    } catch {}
  },
  replace: (def = undefined) => set({ definition: def }),
  preserve: () => {
    localStorage.setItem(
      DEFINITION_LOCAL_STORAGE_KEY,
      JSON.stringify(get().definition),
    );
  },
  restore: () => {
    const storedDef =
      globalThis.localStorage &&
      globalThis.localStorage.getItem(DEFINITION_LOCAL_STORAGE_KEY);
    let v = get().definition;
    if (storedDef) {
      v = storedDef ? JSON.parse(storedDef) : v;
    }
    globalThis.localStorage.removeItem(DEFINITION_LOCAL_STORAGE_KEY);
    set({ definition: v });
  },
  addActionProvider: (ap) => {
    let title = toPascalCase(ap.definition?.title || "");

    const def = get().definition;

    if (title && def?.States && title in def.States) {
      let i = 1;
      while (`${title}${i}` in def.States) {
        i++;
      }
      title = `${title}${i}`;
    }
    set({
      definition: {
        ...(def ?? { States: {}, StartAt: "" }),
        States: {
          ...(def?.States ?? {}),
          [title]: {
            Type: "Action",
            ActionUrl: ap?.url,
            Parameters: {},
            ...(ap.definition?.subtitle
              ? { Comment: ap.definition?.subtitle }
              : {}),
          },
        },
      },
    });
  },
}));
