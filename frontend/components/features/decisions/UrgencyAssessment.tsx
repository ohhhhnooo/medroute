import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "../calls/PriorityBadge";
import type { AIPrediction } from "@/types";
import { TEXT } from "@/lib/constants/text";
import { formatConfidence } from "@/lib/utils/format";

interface UrgencyAssessmentProps {
  prediction: AIPrediction;
}

export function UrgencyAssessment({ prediction }: UrgencyAssessmentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{TEXT.DASHBOARD.URGENCY}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {TEXT.PRIORITY.LABEL}:
            </p>
            <PriorityBadge priority={prediction.priority} />
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">
              {TEXT.PRIORITY.CONFIDENCE}:
            </p>
            <p className="text-2xl font-bold">
              {formatConfidence(prediction.confidence)}
            </p>
          </div>
        </div>

        {prediction.topSymptoms.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Ключевые симптомы:
            </p>
            <div className="flex flex-wrap gap-2">
              {prediction.topSymptoms.map((symptom, i) => (
                <Badge key={i} variant="outline">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Модель: {prediction.modelVersion}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
