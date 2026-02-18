import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Settings } from "lucide-react";
import { TEXT } from "@/lib/constants/text";
import type { SystemStatus as SystemStatusType } from "@/types";

interface SystemStatusProps {
  status?: SystemStatusType;
}

const STATUS_CONFIG = {
  online: {
    label: TEXT.STATUS.AI_ONLINE,
    icon: Activity,
    className: "bg-green-600 text-white hover:bg-green-700",
  },
  limited: {
    label: TEXT.STATUS.AI_LIMITED,
    icon: AlertTriangle,
    className: "bg-yellow-500 text-black hover:bg-yellow-600",
  },
  manual: {
    label: TEXT.STATUS.AI_MANUAL,
    icon: Settings,
    className: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
} as const;

export function SystemStatus({ status = "online" }: SystemStatusProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge className={config.className}>
      <Icon className="size-3.5 mr-1.5" />
      {config.label}
    </Badge>
  );
}
