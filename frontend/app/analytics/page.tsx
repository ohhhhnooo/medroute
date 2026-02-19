"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, BarChart } from "lucide-react";
import { mockAPI } from "@/lib/api/mock-api";
import { TEXT } from "@/lib/constants/text";
import { cn } from "@/lib/utils/cn";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<{
    avgDecisionTime: number;
    aiAgreementRate: number;
    criticalCallsCount: number;
    peakHours: string;
  } | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await mockAPI.fetchAnalytics();
      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[calc(100vh-73px)]">
          <p className="text-muted-foreground">{TEXT.COMMON.LOADING}</p>
        </div>
      </AppShell>
    );
  }

  const metrics = [
    {
      title: TEXT.ANALYTICS.AVG_DECISION_TIME,
      value: `${analytics.avgDecisionTime} сек`,
      trend: "-12%",
      isPositive: true,
    },
    {
      title: TEXT.ANALYTICS.AI_AGREEMENT,
      value: `${analytics.aiAgreementRate}%`,
      trend: "+5%",
      isPositive: true,
    },
    {
      title: TEXT.ANALYTICS.CRITICAL_CALLS,
      value: analytics.criticalCallsCount.toString(),
      trend: "+8%",
      isPositive: false,
    },
    {
      title: TEXT.ANALYTICS.PEAK_HOURS,
      value: analytics.peakHours,
      trend: null,
      isPositive: null,
    },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{TEXT.ANALYTICS.TITLE}</h1>
          <p className="text-muted-foreground">
            Обзор производительности и статистики системы
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => {
            const iconColors = [
              "text-blue-600",
              "text-green-600",
              "text-red-600",
              "text-purple-600",
            ];
            const bgColors = [
              "bg-blue-500/10",
              "bg-green-500/10",
              "bg-red-500/10",
              "bg-purple-500/10",
            ];

            return (
              <Card key={metric.title} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${bgColors[index % 4]}`}>
                        {metric.isPositive ? (
                          <TrendingUp className={`size-6 ${iconColors[index % 4]}`} />
                        ) : metric.isPositive === false ? (
                          <TrendingDown className={`size-6 ${iconColors[index % 4]}`} />
                        ) : (
                          <Activity className={`size-6 ${iconColors[index % 4]}`} />
                        )}
                      </div>
                      {metric.trend && (
                        <Badge
                          variant={metric.isPositive ? "default" : "secondary"}
                          className={cn(
                            "flex items-center gap-1",
                            metric.isPositive && "bg-green-600 hover:bg-green-700"
                          )}
                        >
                          {metric.isPositive ? (
                            <TrendingUp className="size-3" />
                          ) : (
                            <TrendingDown className="size-3" />
                          )}
                          {metric.trend}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {metric.title}
                      </p>
                      <p className="text-3xl sm:text-4xl font-bold">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <Card className="border-2">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-xl">
              {TEXT.ANALYTICS.PRIORITY_DISTRIBUTION}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 sm:h-80 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted/20">
              <BarChart className="size-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-center px-4">
                График будет добавлен (простая гистограмма)
              </p>
              <p className="text-sm text-muted-foreground/60 mt-2">
                Визуализация распределения вызовов по приоритетам
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
