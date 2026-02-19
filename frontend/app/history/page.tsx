"use client";

import { useEffect, useMemo } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/features/calls/PriorityBadge";
import { useDecisionsStore } from "@/features/decisions/store";
import { TEXT } from "@/lib/constants/text";
import { formatDateTime } from "@/lib/utils/format";

export default function HistoryPage() {
  const decisions = useDecisionsStore((state) => state.decisions);
  const filters = useDecisionsStore((state) => state.filters);
  const setFilter = useDecisionsStore((state) => state.setFilter);

  useEffect(() => {
    useDecisionsStore.getState().fetchDecisions();
  }, []);

  const filteredDecisions = useMemo(() => {
    return decisions.filter((decision) => {
      // Priority filter
      if (filters.priority !== "all" && decision.finalPriority !== filters.priority) {
        return false;
      }

      // Dispatcher filter
      if (filters.dispatcher !== "all" && decision.dispatcherId !== filters.dispatcher) {
        return false;
      }

      // Date filter (match decisions on selected date)
      if (filters.date) {
        const decisionDate = decision.decidedAt.toISOString().split("T")[0];
        if (decisionDate !== filters.date) {
          return false;
        }
      }

      return true;
    });
  }, [decisions, filters]);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{TEXT.HISTORY.TITLE}</h1>

          {/* Filters */}
          <Select
            value={filters.priority}
            onValueChange={(value) => setFilter("priority", value)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Фильтр по приоритету" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{TEXT.HISTORY.ALL}</SelectItem>
              <SelectItem value="red">{TEXT.PRIORITY.CRITICAL}</SelectItem>
              <SelectItem value="yellow">{TEXT.PRIORITY.URGENT}</SelectItem>
              <SelectItem value="green">{TEXT.PRIORITY.STANDARD}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{TEXT.HISTORY.CALL_TIME}</TableHead>
                <TableHead>{TEXT.HISTORY.AI_PRIORITY}</TableHead>
                <TableHead>{TEXT.HISTORY.FINAL_PRIORITY}</TableHead>
                <TableHead>{TEXT.HISTORY.WAS_OVERRIDDEN}</TableHead>
                <TableHead>{TEXT.HISTORY.DISPATCHER}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDecisions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground h-32">
                    Нет данных для отображения
                  </TableCell>
                </TableRow>
              ) : (
                filteredDecisions.map((decision) => (
                  <TableRow key={decision.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {formatDateTime(decision.callTime)}
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={decision.aiPriority} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={decision.finalPriority} />
                    </TableCell>
                    <TableCell>
                      {decision.wasOverridden ? (
                        <Badge variant="outline" className="border-amber-500 text-amber-700">
                          {TEXT.HISTORY.YES}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{TEXT.HISTORY.NO}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {decision.dispatcherName}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredDecisions.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              Нет данных для отображения
            </Card>
          ) : (
            filteredDecisions.map((decision) => (
              <Card key={decision.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Время вызова</p>
                    <p className="font-semibold">{formatDateTime(decision.callTime)}</p>
                  </div>
                  {decision.wasOverridden && (
                    <Badge variant="outline" className="border-amber-500 text-amber-700">
                      Изменено
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">AI приоритет</p>
                    <PriorityBadge priority={decision.aiPriority} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Финальный</p>
                    <PriorityBadge priority={decision.finalPriority} />
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Диспетчер</p>
                  <p className="text-sm font-medium">{decision.dispatcherName}</p>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Stats Footer */}
        <Card className="p-4 bg-muted/30">
          <p className="text-sm text-center">
            <span className="font-semibold">Всего решений:</span>{" "}
            <Badge variant="secondary" className="ml-2">
              {filteredDecisions.length} из {decisions.length}
            </Badge>
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
