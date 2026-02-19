import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TeamRecommendation as TeamRecommendationType } from "@/types";
import { TEXT } from "@/lib/constants/text";
import { Ambulance, Clock } from "lucide-react";

interface TeamRecommendationProps {
  recommendation: TeamRecommendationType;
}

export function TeamRecommendation({ recommendation }: TeamRecommendationProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">{TEXT.DASHBOARD.RECOMMENDATION}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Team Type */}
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Ambulance className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{TEXT.TEAM.TYPE}</p>
            <p className="font-medium">{recommendation.teamType}</p>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Clock className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{TEXT.TEAM.ETA}:</p>
          <Badge variant="secondary">
            ~{recommendation.eta} {TEXT.TEAM.MINUTES}
          </Badge>
        </div>

        {/* Map Placeholder Container */}
        <div className="mt-4 rounded-lg border border-border bg-secondary h-24 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Маршрут</p>
        </div>
      </CardContent>
    </Card>
  );
}
