import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{TEXT.DASHBOARD.PATIENT_INFO}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{TEXT.PATIENT.AGE}</p>
            <p className="text-lg font-semibold">
              {patient.age} {TEXT.PATIENT.YEARS}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{TEXT.PATIENT.SEX}</p>
            <p className="text-lg font-semibold">
              {patient.sex === "male"
                ? TEXT.PATIENT.MALE
                : TEXT.PATIENT.FEMALE}
            </p>
          </div>
        </div>

        {conditions.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {TEXT.PATIENT.CONDITIONS}
            </p>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition) => (
                <Badge key={condition} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground">
            {TEXT.PATIENT.PREVIOUS_CALLS}
          </p>
          <p className="text-lg font-semibold">{patient.previousCalls}</p>
        </div>
      </CardContent>
    </Card>
  );
}
