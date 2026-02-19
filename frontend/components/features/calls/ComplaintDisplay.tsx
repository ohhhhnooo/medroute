import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Complaint } from "@/types";
import { TEXT } from "@/lib/constants/text";

interface ComplaintDisplayProps {
  complaint: Complaint;
}

export function ComplaintDisplay({ complaint }: ComplaintDisplayProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">{TEXT.DASHBOARD.COMPLAINT}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Text */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Исходный текст:</p>
            <p className="text-sm">{complaint.raw}</p>
          </div>

          {/* AI Interpretation - Muted Styling */}
          <div className="md:border-l md:pl-6 border-border">
            <p className="text-xs text-muted-foreground mb-2">AI-интерпретация:</p>
            <p className="text-sm text-muted-foreground">{complaint.processed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
