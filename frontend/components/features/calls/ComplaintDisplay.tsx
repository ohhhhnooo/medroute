import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Complaint } from "@/types";
import { TEXT } from "@/lib/constants/text";

interface ComplaintDisplayProps {
  complaint: Complaint;
}

export function ComplaintDisplay({ complaint }: ComplaintDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{TEXT.DASHBOARD.COMPLAINT}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            Исходный текст:
          </p>
          <p className="text-base font-medium">{complaint.raw}</p>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground mb-1">
            AI-интерпретация:
          </p>
          <p className="text-sm text-muted-foreground">{complaint.processed}</p>
        </div>
      </CardContent>
    </Card>
  );
}
