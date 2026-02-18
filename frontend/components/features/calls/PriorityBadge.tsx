import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/types";
import { PRIORITY_COLORS, getPriorityLabel } from "@/lib/utils/priorities";

interface PriorityBadgeProps {
  priority: Priority;
  showLabel?: boolean;
}

export function PriorityBadge({
  priority,
  showLabel = true,
}: PriorityBadgeProps) {
  const config = PRIORITY_COLORS[priority];
  const label = getPriorityLabel(priority);

  return (
    <Badge className={config.badge}>
      {showLabel ? label : priority.toUpperCase()}
    </Badge>
  );
}
