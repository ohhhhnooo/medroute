"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallsStore } from "@/features/calls/store";
import { TEXT } from "@/lib/constants/text";
import { Check, Edit, Clock } from "lucide-react";

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
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">{TEXT.DASHBOARD.ACTIONS}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Primary Action */}
        <Button
          onClick={handleAccept}
          disabled={isLoading}
          className="w-full mb-3"
          size="lg"
        >
          <Check className="size-4 mr-2" />
          {TEXT.ACTIONS.ACCEPT}
        </Button>

        {/* Secondary Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant="outline"
            onClick={handleOverride}
            disabled={isLoading}
          >
            <Edit className="size-3 mr-2" />
            <span className="text-xs">{TEXT.ACTIONS.OVERRIDE}</span>
          </Button>

          <Button
            variant="outline"
            onClick={handlePostpone}
            disabled={isLoading}
          >
            <Clock className="size-3 mr-2" />
            <span className="text-xs">{TEXT.ACTIONS.POSTPONE}</span>
          </Button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Ctrl+A</kbd> принять •{" "}
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Ctrl+O</kbd> изменить •{" "}
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Ctrl+P</kbd> отложить
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
