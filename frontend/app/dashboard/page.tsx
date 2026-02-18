"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { CallQueue } from "@/components/features/calls/CallQueue";
import { CallDetails } from "@/components/features/calls/CallDetails";
import { useRealtimeUpdates } from "@/features/calls/hooks";
import { useCallsStore } from "@/features/calls/store";
import { TEXT } from "@/lib/constants/text";

export default function DashboardPage() {
  // Initialize real-time updates
  useRealtimeUpdates();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { calls, selectedCallId, selectCall, acceptRecommendation, postponeCall } =
        useCallsStore.getState();

      const currentIndex = calls.findIndex((c) => c.id === selectedCallId);

      // Arrow navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, calls.length - 1);
        if (calls[nextIndex]) selectCall(calls[nextIndex].id);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (calls[prevIndex]) selectCall(calls[prevIndex].id);
      }

      // Enter to select first call if none selected
      if (e.key === "Enter" && !selectedCallId && calls[0]) {
        selectCall(calls[0].id);
      }

      // Ctrl+A: Accept recommendation
      if (e.ctrlKey && e.key === "a" && selectedCallId) {
        e.preventDefault();
        acceptRecommendation(selectedCallId);
      }

      // Ctrl+P: Postpone call
      if (e.ctrlKey && e.key === "p" && selectedCallId) {
        e.preventDefault();
        postponeCall(selectedCallId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-73px)]">
        {/* LEFT: Call Queue */}
        <div className="border-r border-border overflow-y-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Очередь вызовов</h2>
          <CallQueue />
        </div>

        {/* RIGHT: Call Details */}
        <div className="overflow-y-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Детали вызова</h2>
          <CallDetails />
        </div>
      </div>
    </AppShell>
  );
}
