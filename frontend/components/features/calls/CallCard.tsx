"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "./PriorityBadge";
import { CallTimer } from "./CallTimer";
import type { Call } from "@/types";
import { cn } from "@/lib/utils/cn";
import { TEXT } from "@/lib/constants/text";
import { PRIORITY_COLORS } from "@/lib/utils/priorities";

interface CallCardProps {
  call: Call;
  isSelected: boolean;
  onClick: () => void;
}

export function CallCard({ call, isSelected, onClick }: CallCardProps) {
  const borderColor = PRIORITY_COLORS[call.priority].border;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent/50 mb-3 border-l-4",
        isSelected && "ring-2 ring-primary bg-accent/30",
        borderColor
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex-shrink-0">
          <PriorityBadge priority={call.priority} />
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <CallTimer startTime={call.callTime} />
            <Badge variant="outline" className="flex-shrink-0">
              {call.district}
            </Badge>
          </div>

          <p className="text-sm font-medium line-clamp-2">
            {call.complaint.raw}
          </p>

          <div className="flex gap-3 text-xs text-muted-foreground">
            <span>
              {TEXT.PATIENT.AGE}: {call.patient.age} {TEXT.PATIENT.YEARS}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span>
              {call.patient.sex === "male"
                ? TEXT.PATIENT.MALE
                : TEXT.PATIENT.FEMALE}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
