import { AppShell } from "@/components/shared/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { TEXT } from "@/lib/constants/text";

export default function MapPage() {
  return (
    <AppShell>
      <div className="h-[calc(100vh-73px)] bg-muted flex items-center justify-center">
        <Card className="max-w-lg">
          <CardContent className="p-8 text-center space-y-4">
            <MapPin className="size-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">{TEXT.MAP.TITLE}</h2>
            <p className="text-muted-foreground">{TEXT.MAP.COMING_SOON}</p>

            <div className="mt-6 space-y-2 text-left">
              <p className="text-sm font-medium">{TEXT.MAP.PLANNED_FEATURES}</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>{TEXT.MAP.FEATURE_CALLS}</li>
                <li>{TEXT.MAP.FEATURE_TEAMS}</li>
                <li>{TEXT.MAP.FEATURE_HEATMAP}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
