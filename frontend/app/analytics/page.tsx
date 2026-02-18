"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { mockAPI } from "@/lib/api/mock-api";
import { TEXT } from "@/lib/constants/text";

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
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">{TEXT.ANALYTICS.TITLE}</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-semibold mt-2">
                      {metric.value}
                    </p>
                  </div>
                  {metric.trend && (
                    <Badge
                      variant={metric.isPositive ? "default" : "secondary"}
                      className="flex items-center gap-1"
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>{TEXT.ANALYTICS.PRIORITY_DISTRIBUTION}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">
                График будет добавлен (простая гистограмма)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
