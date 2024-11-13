import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

type SupportedHandles = FileSystemDirectoryHandle | FileSystemFileHandle;

type Entry = {
  path?: string;
  handle: SupportedHandles;
};

type State = {
  handles: SupportedHandles[];
  entries: Entry[];
};

const storage: PersistStorage<State> = {
  getItem: async (name) => {
    return (await get(name)) || null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  },
};

type Actions = {
  addEntry: (entry: Entry) => Promise<void>;
  addHandle: (handle: SupportedHandles) => Promise<void>;
};

const initialState: State = {
  handles: [],
  entries: [],
};

export const useFileSystem = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      addEntry: async (entry: Entry) => {
        const entries = get().entries;
        let isDuplicate = false;
        for (const e of entries) {
          if (await entry.handle.isSameEntry(e.handle)) {
            isDuplicate = true;
          }
        }
        if (isDuplicate) {
          return;
        }
        set((state) => {
          return {
            ...state,
            entries: [...state.entries, entry],
          };
        });
      },
      addHandle: async (handle: SupportedHandles) => {
        const handles = get().handles;
        let isDuplicate = false;
        for (const h of handles) {
          if (await handle.isSameEntry(h)) {
            isDuplicate = true;
          }
        }
        if (isDuplicate) {
          return;
        }
        set((state) => {
          return {
            ...state,
            handles: [...state.handles, handle],
          };
        });
      },
    }),
    {
      name: "file-system",
      storage,
      partialize: (state) => {
        return {
          handles: state.handles,
          entries: state.entries,
        };
      },
    },
  ),
);
