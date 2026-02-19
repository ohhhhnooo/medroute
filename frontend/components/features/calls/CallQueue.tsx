"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CallCard } from "./CallCard";
import { useCallQueue } from "@/features/calls/hooks";
import { useCallsStore } from "@/features/calls/store";
import { TEXT } from "@/lib/constants/text";

export function CallQueue() {
  const calls = useCallQueue();
  const selectCall = useCallsStore((state) => state.selectCall);

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Очередь вызовов</CardTitle>
          <Badge variant="secondary">{calls.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {calls.length === 0 ? (
          <div className="text-center py-12 px-6">
            <p className="text-sm text-muted-foreground">
              {TEXT.DASHBOARD.QUEUE_EMPTY}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {calls.map((call) => (
              <CallCard
                key={call.id}
                call={call}
                onClick={() => selectCall(call.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
