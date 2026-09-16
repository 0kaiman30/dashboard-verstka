import { create } from "zustand";

export interface HistoryAction {
  id: string;
  label: string;
  undo: () => Promise<void> | void;
  redo: () => Promise<void> | void;
}

interface HistoryState {
  past: HistoryAction[];
  future: HistoryAction[];
  isProcessing: boolean;
  push: (action: HistoryAction) => void;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
}

const MAX_HISTORY = 5;

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  isProcessing: false,

  push: (action) =>
    set((state) => ({
      past: [...state.past, action].slice(-MAX_HISTORY),
      future: [],
    })),

  undo: async () => {
    const { past, isProcessing } = get();
    if (isProcessing || past.length === 0) return;
    const action = past[past.length - 1];
    set({ isProcessing: true });
    try {
      await action.undo();
      set((state) => ({
        past: state.past.slice(0, -1),
        future: [action, ...state.future].slice(0, MAX_HISTORY),
      }));
    } finally {
      set({ isProcessing: false });
    }
  },

  redo: async () => {
    const { future, isProcessing } = get();
    if (isProcessing || future.length === 0) return;
    const [action, ...rest] = future;
    set({ isProcessing: true });
    try {
      await action.redo();
      set((state) => ({
        future: rest,
        past: [...state.past, action].slice(-MAX_HISTORY),
      }));
    } finally {
      set({ isProcessing: false });
    }
  },
}));