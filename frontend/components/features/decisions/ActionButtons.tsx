"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Edit, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallsStore } from "@/features/calls/store";
import { TEXT } from "@/lib/constants/text";

interface ActionButtonsProps {
  callId: string;
}

export function ActionButtons({ callId }: ActionButtonsProps) {
  const router = useRouter();
  const { acceptRecommendation, postponeCall, isLoading } = useCallsStore();

  const handleAccept = async () => {
    await acceptRecommendation(callId);
  };

  const handleOverride = () => {
    router.push(`/override?callId=${callId}`);
  };

  const handlePostpone = async () => {
    await postponeCall(callId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{TEXT.DASHBOARD.ACTIONS}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleAccept}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            <Check className="size-4 mr-2" />
            {TEXT.ACTIONS.ACCEPT}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleOverride}
              disabled={isLoading}
            >
              <Edit className="size-4 mr-2" />
              {TEXT.ACTIONS.OVERRIDE}
            </Button>

            <Button
              variant="outline"
              onClick={handlePostpone}
              disabled={isLoading}
            >
              <Clock className="size-4 mr-2" />
              {TEXT.ACTIONS.POSTPONE}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
