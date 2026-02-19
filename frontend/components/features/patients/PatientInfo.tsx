import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Patient } from "@/types";
import { TEXT } from "@/lib/constants/text";

interface PatientInfoProps {
  patient: Patient;
}

export function PatientInfo({ patient }: PatientInfoProps) {
  const conditions = [];
  if (patient.hasCardiovascular) conditions.push(TEXT.PATIENT.CARDIOVASCULAR);
  if (patient.hasDiabetes) conditions.push(TEXT.PATIENT.DIABETES);
  if (patient.hasAsthma) conditions.push(TEXT.PATIENT.ASTHMA);

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">{TEXT.DASHBOARD.PATIENT_INFO}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{TEXT.PATIENT.AGE}</p>
            <p className="font-medium">
              {patient.age} {TEXT.PATIENT.YEARS}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">{TEXT.PATIENT.SEX}</p>
            <p className="font-medium">
              {patient.sex === "male" ? TEXT.PATIENT.MALE : TEXT.PATIENT.FEMALE}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-muted-foreground mb-2">
              {TEXT.PATIENT.CONDITIONS}
            </p>
            {conditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <Badge key={condition} variant="secondary" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </div>

          <div className="col-span-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">
              {TEXT.PATIENT.PREVIOUS_CALLS}
            </p>
            <p className="font-medium">{patient.previousCalls}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
