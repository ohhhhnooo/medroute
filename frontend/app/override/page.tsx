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
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">{TEXT.OVERRIDE.TITLE}</h1>
          <p className="text-muted-foreground mt-1">
            Вызов: {call.complaint.raw}
          </p>
        </div>

        {/* AI Recommendation */}
        <Card>
          <CardHeader>
            <CardTitle>{TEXT.OVERRIDE.AI_RECOMMENDATION}</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamRecommendation recommendation={call.recommendation} />
          </CardContent>
        </Card>

        {/* Available Teams */}
        <Card>
          <CardHeader>
            <CardTitle>{TEXT.TEAM.AVAILABLE}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className={`p-4 rounded-lg border-2 transition-colors text-left ${
                    selectedTeamId === team.id
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Ambulance className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{team.teamType}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span>
                          ~{team.eta} {TEXT.TEAM.MINUTES}
                        </span>
                      </div>
                      <Badge variant="secondary" className="mt-2">
                        {TEXT.TEAM.STATUS}: Доступна
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Override Reason */}
        <Card>
          <CardHeader>
            <CardTitle>{TEXT.OVERRIDE.REASON}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={TEXT.OVERRIDE.REASON_PLACEHOLDER}
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              rows={4}
            />

            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={!selectedTeamId || !overrideReason.trim()}
                size="lg"
              >
                {TEXT.ACTIONS.CONFIRM}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/dashboard")}
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
