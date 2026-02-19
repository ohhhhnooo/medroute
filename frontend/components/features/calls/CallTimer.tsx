"use client";

import { useEffect, useState } from "react";
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

  return <span>{elapsed}</span>;
}
