import { useEffect, useMemo } from "react";
import { useCallsStore } from "./store";
import { startRealtimeUpdates } from "@/lib/api/realtime";
import { sortByPriority } from "@/lib/utils/priorities";

/**
 * Hook to get sorted call queue
 */
export function useCallQueue() {
  const calls = useCallsStore((state) => state.calls);
  return useMemo(() => sortByPriority(calls), [calls]);
}

/**
 * Hook to get selected call
 */
export function useSelectedCall() {
  const calls = useCallsStore((state) => state.calls);
  const selectedCallId = useCallsStore((state) => state.selectedCallId);
  return useMemo(
    () => calls.find((c) => c.id === selectedCallId) || null,
    [calls, selectedCallId]
  );
}

/**
 * Hook to initialize and start real-time updates
 */
export function useRealtimeUpdates() {
  useEffect(() => {
    // Initialize store
    useCallsStore.getState().initialize();

    // Start real-time polling
    const cleanup = startRealtimeUpdates(
      (calls) => {
        useCallsStore.getState().updateQueue(calls);
      },
      () => {
        // Optional: play sound on critical call
        // playNotificationSound();
      }
    );

    return cleanup;
  }, []); // Empty deps - only run once on mount
}
