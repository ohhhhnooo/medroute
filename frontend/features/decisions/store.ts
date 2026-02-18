import { create } from "zustand";
import type { Decision, DecisionFilters, Priority } from "@/types";
import { mockAPI } from "@/lib/api/mock-api";

interface DecisionsStore {
  decisions: Decision[];
  filters: DecisionFilters;
  isLoading: boolean;

  fetchDecisions: () => Promise<void>;
  setFilter: (key: keyof DecisionFilters, value: any) => void;
}

export const useDecisionsStore = create<DecisionsStore>((set, get) => ({
  decisions: [],
  filters: {
    priority: "all",
    dispatcher: "all",
    date: null,
  },
  isLoading: false,

  fetchDecisions: async () => {
    try {
      set({ isLoading: true });
      const decisions = await mockAPI.fetchDecisionHistory();
      set({ decisions, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch decisions:", error);
      set({ isLoading: false });
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },
}));
