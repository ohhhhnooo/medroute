import { Activity } from "lucide-react";
import { TEXT } from "@/lib/constants/text";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <Activity className="size-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-semibold">{TEXT.LOGIN.LOGO}</span>
    </div>
  );
}
