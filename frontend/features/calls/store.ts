import { create } from "zustand";
import type { Call } from "@/types";
import { mockAPI } from "@/lib/api/mock-api";
import { sortByPriority } from "@/lib/utils/priorities";

interface CallsStore {
  // State
  calls: Call[];
  selectedCallId: string | null;
  isLoading: boolean;

  // Actions
  selectCall: (id: string) => void;
  updateQueue: (calls: Call[]) => void;
  acceptRecommendation: (callId: string) => Promise<void>;
  overrideDecision: (
    callId: string,
    teamId: string,
    reason: string
  ) => Promise<void>;
  postponeCall: (callId: string) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useCallsStore = create<CallsStore>((set, get) => ({
  // Initial state
  calls: [],
  selectedCallId: null,
  isLoading: false,

  // Select a call to view details
  selectCall: (id) => {
    set({ selectedCallId: id });
  },

  // Update call queue (used by realtime polling)
  updateQueue: (calls) => {
    set({ calls });
  },

  // Accept AI recommendation
  acceptRecommendation: async (callId) => {
    const { selectedCallId } = get();

    try {
      set({ isLoading: true });
      await mockAPI.acceptRecommendation(callId);

      // Remove call from queue
      set((state) => ({
        calls: state.calls.filter((c) => c.id !== callId),
        selectedCallId: selectedCallId === callId ? null : selectedCallId,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to accept recommendation:", error);
      set({ isLoading: false });
    }
  },

  // Override AI decision with manual choice
  overrideDecision: async (callId, teamId, reason) => {
    const { selectedCallId } = get();

    try {
      set({ isLoading: true });
      await mockAPI.overrideDecision(callId, teamId, reason);

      // Remove call from queue
      set((state) => ({
        calls: state.calls.filter((c) => c.id !== callId),
        selectedCallId: selectedCallId === callId ? null : selectedCallId,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to override decision:", error);
      set({ isLoading: false });
    }
  },

  // Postpone call (move to bottom of queue)
  postponeCall: async (callId) => {
    try {
      set({ isLoading: true });
      await mockAPI.postponeCall(callId);

      // Re-fetch updated queue
      const updatedCalls = await mockAPI.fetchCallQueue();
      set({ calls: updatedCalls, isLoading: false });
    } catch (error) {
      console.error("Failed to postpone call:", error);
      set({ isLoading: false });
    }
  },

  // Initialize store with initial data
  initialize: async () => {
    try {
      set({ isLoading: true });
      const calls = await mockAPI.fetchCallQueue();
      set({ calls, isLoading: false });
    } catch (error) {
      console.error("Failed to initialize calls:", error);
      set({ isLoading: false });
    }
  },
}));
