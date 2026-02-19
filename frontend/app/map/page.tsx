import { AppShell } from "@/components/shared/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, TrendingUp, Activity } from "lucide-react";
import { TEXT } from "@/lib/constants/text";

export default function MapPage() {
  return (
    <AppShell>
      <div className="h-[calc(100vh-73px)] bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-2xl w-full space-y-6">
          {/* Main Card */}
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8 sm:p-12 text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center size-20 sm:size-24 rounded-2xl bg-primary/10 mb-4">
                <MapPin className="size-10 sm:size-12 text-primary" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold">{TEXT.MAP.TITLE}</h2>
                <Badge variant="secondary" className="text-sm">
                  В разработке
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
                {TEXT.MAP.COMING_SOON}
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-2">
              <CardContent className="p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center size-12 rounded-xl bg-red-500/10">
                  <Activity className="size-6 text-red-600" />
                </div>
                <p className="text-sm font-medium">{TEXT.MAP.FEATURE_CALLS}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center size-12 rounded-xl bg-blue-500/10">
                  <Navigation className="size-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">{TEXT.MAP.FEATURE_TEAMS}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center size-12 rounded-xl bg-purple-500/10">
                  <TrendingUp className="size-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium">{TEXT.MAP.FEATURE_HEATMAP}</p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Info */}
          <p className="text-center text-sm text-muted-foreground">
            Интеграция с картографическим сервисом будет добавлена в следующей версии
          </p>
        </div>
      </div>
    </AppShell>
  );
}
