"use client";

import { CallCard } from "./CallCard";
import { useCallQueue, useSelectedCall } from "@/features/calls/hooks";
import { useCallsStore } from "@/features/calls/store";
import { TEXT } from "@/lib/constants/text";

export function CallQueue() {
  const calls = useCallQueue();
  const selectedCall = useSelectedCall();
  const selectCall = useCallsStore((state) => state.selectCall);

  if (calls.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>{TEXT.DASHBOARD.QUEUE_EMPTY}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {calls.map((call) => (
        <CallCard
          key={call.id}
          call={call}
          isSelected={selectedCall?.id === call.id}
          onClick={() => selectCall(call.id)}
        />
      ))}
    </div>
  );
}
