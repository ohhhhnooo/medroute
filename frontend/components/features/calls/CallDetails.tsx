"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedCall } from "@/features/calls/hooks";
import { PatientInfo } from "../patients/PatientInfo";
import { ComplaintDisplay } from "./ComplaintDisplay";
import { UrgencyAssessment } from "../decisions/UrgencyAssessment";
import { TeamRecommendation } from "../decisions/TeamRecommendation";
import { ActionButtons } from "../decisions/ActionButtons";
import { TEXT } from "@/lib/constants/text";

export function CallDetails() {
  const selectedCall = useSelectedCall();

  if (!selectedCall) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base">Детали вызова</CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {TEXT.DASHBOARD.SELECT_CALL}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Выберите вызов из списка слева
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid Layout for Dense Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Блок 1 — Информация о пациенте */}
        <PatientInfo patient={selectedCall.patient} />

        {/* Блок 3 — Оценка срочности */}
        <UrgencyAssessment prediction={selectedCall.aiPrediction} />
      </div>

      {/* Блок 2 — Жалоба (Full Width) */}
      <ComplaintDisplay complaint={selectedCall.complaint} />

      {/* Grid for Recommendation + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Блок 4 — Рекомендация */}
        <TeamRecommendation recommendation={selectedCall.recommendation} />

        {/* Блок 5 — Управление */}
        <ActionButtons callId={selectedCall.id} />
      </div>
    </div>
  );
}
