import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">{TEXT.DASHBOARD.URGENCY}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Priority and Confidence */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {TEXT.PRIORITY.LABEL}
            </p>
            <PriorityBadge priority={prediction.priority} />
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">
              {TEXT.PRIORITY.CONFIDENCE}
            </p>
            <p className="text-2xl font-semibold">
              {formatConfidence(prediction.confidence)}
            </p>
          </div>
        </div>

        {/* Top Symptoms */}
        {prediction.topSymptoms.length > 0 && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Ключевые симптомы
            </p>
            <div className="flex flex-wrap gap-2">
              {prediction.topSymptoms.map((symptom, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
