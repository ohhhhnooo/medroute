"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { CallQueue } from "@/components/features/calls/CallQueue";
import { CallDetails } from "@/components/features/calls/CallDetails";
import { useRealtimeUpdates } from "@/features/calls/hooks";
import { useCallsStore } from "@/features/calls/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // Initialize real-time updates
  useRealtimeUpdates();

  const { dispatcher, logout } = useAuthStore();
  const router = useRouter();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { calls, selectedCallId, selectCall, acceptRecommendation, postponeCall } =
        useCallsStore.getState();

      const currentIndex = calls.findIndex((c) => c.id === selectedCallId);

      // Arrow navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, calls.length - 1);
        if (calls[nextIndex]) selectCall(calls[nextIndex].id);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (calls[prevIndex]) selectCall(calls[prevIndex].id);
      }

      // Enter to select first call if none selected
      if (e.key === "Enter" && !selectedCallId && calls[0]) {
        selectCall(calls[0].id);
      }

      // Ctrl+A: Accept recommendation
      if (e.ctrlKey && e.key === "a" && selectedCallId) {
        e.preventDefault();
        acceptRecommendation(selectedCallId);
      }

      // Ctrl+P: Postpone call
      if (e.ctrlKey && e.key === "p" && selectedCallId) {
        e.preventDefault();
        postponeCall(selectedCallId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleRefresh = () => {
    useCallsStore.getState().initialize();
  };

  return (
    <AppShell>
      {/* Strong Header Bar */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold text-xl">Главный экран вызовов</h1>
              <Badge variant="secondary">AI онлайн</Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="size-4 mr-2" />
                Обновить
              </Button>

              {dispatcher && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="size-4 mr-2" />
                      {dispatcher.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <span className="text-sm text-muted-foreground">
                        Диспетчер: {dispatcher.name}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Выход
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Dense Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* LEFT COLUMN - Call Queue */}
          <CallQueue />

          {/* RIGHT COLUMN - Call Details */}
          <CallDetails />
        </div>
      </div>
    </AppShell>
  );
}
