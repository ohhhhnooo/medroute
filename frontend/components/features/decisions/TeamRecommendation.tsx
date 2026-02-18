import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Ambulance } from "lucide-react";
import type { TeamRecommendation as TeamRecommendationType } from "@/types";
import { TEXT } from "@/lib/constants/text";

interface TeamRecommendationProps {
  recommendation: TeamRecommendationType;
}

export function TeamRecommendation({ recommendation }: TeamRecommendationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{TEXT.DASHBOARD.RECOMMENDATION}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Ambulance className="size-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{TEXT.TEAM.TYPE}:</p>
            <p className="text-lg font-semibold">{recommendation.teamType}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Clock className="size-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {TEXT.TEAM.ETA}:
          </p>
          <Badge variant="secondary">
            ~{recommendation.eta} {TEXT.TEAM.MINUTES}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
