"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/shared/AppShell";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TeamRecommendation } from "@/components/features/decisions/TeamRecommendation";
import { useCallsStore } from "@/features/calls/store";
import { useTeamsStore } from "@/features/teams/store";
import { TEXT } from "@/lib/constants/text";
import { Clock, Ambulance } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function OverridePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callId = searchParams.get("callId");

  const calls = useCallsStore((state) => state.calls);
  const overrideDecision = useCallsStore((state) => state.overrideDecision);
  const teams = useTeamsStore((state) => state.teams);

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [overrideReason, setOverrideReason] = useState("");

  const call = useMemo(
    () => calls.find((c) => c.id === callId),
    [calls, callId]
  );

  useEffect(() => {
    useTeamsStore.getState().fetchTeams();
  }, []);

  const handleSubmit = async () => {
    if (!call || !selectedTeamId || !overrideReason.trim()) {
      return;
    }

    await overrideDecision(call.id, selectedTeamId, overrideReason);
    router.push("/dashboard");
  };

  if (!call) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[calc(100vh-73px)]">
          <p className="text-muted-foreground">Вызов не найден</p>
        </div>
      </AppShell>
    );
  }

  const availableTeams = useMemo(
    () => teams.filter((t) => t.status === "available"),
    [teams]
  );

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold">{TEXT.OVERRIDE.TITLE}</h1>
          <Card className="p-4 bg-amber-500/10 border-amber-500/20">
            <p className="text-sm font-medium">
              <span className="text-muted-foreground">Вызов:</span>{" "}
              <span className="text-foreground">{call.complaint.raw}</span>
            </p>
          </Card>
        </div>

        {/* AI Recommendation */}
        <Card className="border-2 border-blue-500/20">
          <CardHeader className="bg-blue-500/5">
            <CardTitle className="flex items-center gap-2">
              <span className="text-blue-600">🤖</span>
              {TEXT.OVERRIDE.AI_RECOMMENDATION}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <TeamRecommendation recommendation={call.recommendation} />
          </CardContent>
        </Card>

        {/* Available Teams */}
        <Card className="border-2">
          <CardHeader className="bg-muted/30">
            <CardTitle>{TEXT.TEAM.AVAILABLE}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Выберите бригаду для отправки
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {availableTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className={cn(
                    "p-4 sm:p-5 rounded-xl border-2 transition-all text-left",
                    selectedTeamId === team.id
                      ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "size-12 rounded-full flex items-center justify-center flex-shrink-0",
                      selectedTeamId === team.id ? "bg-primary/20" : "bg-primary/10"
                    )}>
                      <Ambulance className={cn(
                        "size-6",
                        selectedTeamId === team.id ? "text-primary" : "text-primary/70"
                      )} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base">{team.teamType}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span className="font-medium">
                          ~{team.eta} {TEXT.TEAM.MINUTES}
                        </span>
                      </div>
                      <Badge variant="secondary" className="mt-3 bg-green-500/10 text-green-700 border-green-500/20">
                        ✓ Доступна
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Override Reason */}
        <Card className="border-2">
          <CardHeader className="bg-muted/30">
            <CardTitle>{TEXT.OVERRIDE.REASON}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Укажите причину изменения рекомендации AI
            </p>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <Textarea
              placeholder={TEXT.OVERRIDE.REASON_PLACEHOLDER}
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              rows={4}
              className="resize-none text-base"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSubmit}
                disabled={!selectedTeamId || !overrideReason.trim()}
                size="lg"
                className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md"
              >
                {TEXT.ACTIONS.CONFIRM}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto h-12 border-2"
              >
                {TEXT.ACTIONS.CANCEL}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
