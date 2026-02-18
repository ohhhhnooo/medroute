"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";

interface CallTimerProps {
  startTime: Date;
}

export function CallTimer({ startTime }: CallTimerProps) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const updateElapsed = () => {
      setElapsed(formatRelativeTime(startTime));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 10000); // Update every 10s

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="size-3.5" />
      {elapsed}
    </div>
  );
}
