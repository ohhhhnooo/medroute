"use client";

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
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-center">{TEXT.DASHBOARD.SELECT_CALL}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PatientInfo patient={selectedCall.patient} />
      <ComplaintDisplay complaint={selectedCall.complaint} />
      <UrgencyAssessment prediction={selectedCall.aiPrediction} />
      <TeamRecommendation recommendation={selectedCall.recommendation} />
      <ActionButtons callId={selectedCall.id} />
    </div>
  );
}
