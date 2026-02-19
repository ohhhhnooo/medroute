"use client";

import { Badge } from "@/components/ui/badge";
import type { Call } from "@/types";
import { cn } from "@/lib/utils/cn";
import { TEXT } from "@/lib/constants/text";
import { Clock, MapPin } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";

interface CallCardProps {
  call: Call;
  onClick: () => void;
}

export function CallCard({ call, onClick }: CallCardProps) {
  // Priority badge variants
  const priorityVariants = {
    red: "bg-destructive text-destructive-foreground",
    yellow: "bg-yellow-500 text-black",
    green: "bg-green-600 text-white",
  };

  const priorityLabels = {
    red: TEXT.PRIORITY.CRITICAL,
    yellow: TEXT.PRIORITY.URGENT,
    green: TEXT.PRIORITY.STANDARD,
  };

  return (
    <div
      className={cn(
        "p-4 cursor-pointer hover:bg-secondary transition-colors"
      )}
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <Badge className={cn("text-xs", priorityVariants[call.priority])}>
          {priorityLabels[call.priority]}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <span>{formatRelativeTime(call.callTime)}</span>
        </div>
      </div>

      {/* Complaint */}
      <p className="text-sm mb-3 line-clamp-2 leading-relaxed">
        {call.complaint.raw}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          {call.patient.age} {TEXT.PATIENT.YEARS}
        </span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <MapPin className="size-3" />
          <span>{call.district}</span>
        </div>
      </div>
    </div>
  );
}
