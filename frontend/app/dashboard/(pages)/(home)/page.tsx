"use client";

import { useEffect, useState } from "react";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { TasksCompletionAreaChart } from "@/components/dashboard/charts/tasks-completion-area";
import { TasksStatusBarChart } from "@/components/dashboard/charts/tasks-status-bar";
import { TasksPriorityBarChart } from "@/components/dashboard/charts/tasks-priority-bar";
import { TasksCreationLineChart } from "@/components/dashboard/charts/tasks-creation-line";
import { Spinner } from "@/components/ui/spinner";
import { getTaskSummary, getTaskCompletionTrend, getTasksByStatus, getTasksByPriority, getTaskCreationTrend, } from "@/api/stats";
import { toast } from "@/hooks/use-toast";
import type { CompletionPoint } from "@/components/dashboard/charts/tasks-completion-area";
import type { StatusPoint } from "@/components/dashboard/charts/tasks-status-bar";
import type { PriorityPoint } from "@/components/dashboard/charts/tasks-priority-bar";
import type { CreationPoint } from "@/components/dashboard/charts/tasks-creation-line";
import Container from "@/components/global/container";

interface SummaryState {
  totalTasks: number;
  completedTasks: number;
  dailyAverage: number;
  completionRate: number;
}

const EMPTY_SUMMARY: SummaryState = {
  totalTasks: 0,
  completedTasks: 0,
  dailyAverage: 0,
  completionRate: 0,
};

export default function Page() {
  const [summary, setSummary] = useState<SummaryState>(EMPTY_SUMMARY);
  const [completionTrend, setCompletionTrend] = useState<CompletionPoint[]>( [] );
  const [statusData, setStatusData] = useState<StatusPoint[]>([]);
  const [priorityData, setPriorityData] = useState<PriorityPoint[]>([]);
  const [creationTrend, setCreationTrend] = useState<CreationPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch stats & metrics
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryRes, completionRes, statusRes, priorityRes, creationRes] =
          await Promise.all([
            getTaskSummary(),
            getTaskCompletionTrend(),
            getTasksByStatus(),
            getTasksByPriority(),
            getTaskCreationTrend(),
          ]);

        setSummary(summaryRes.data);
        setCompletionTrend(
          completionRes.data.map((item: any) => ({
            date: item.date,
            completed: item.completed,
          }))
        );
        setStatusData(statusRes.data);
        setPriorityData(priorityRes.data);
        setCreationTrend(
          creationRes.data.map((item: any) => ({
            date: item.date,
            created: item.created,
          }))
        );
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        toast({ title: "Error loading dashboard", description: "We couldn't load your task statistics. Please try again.", variant: "destructive", });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container animation="fadeIn" delay={0.3} className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 md:gap-6">
        {loading ? (
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <Spinner className="size-10 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">
                Loading dashboard...
              </p>
            </div>
          </div>
        ) : (
          <>
            <MetricCards
              totalTasks={summary.totalTasks}
              completedTasks={summary.completedTasks}
              dailyAverage={summary.dailyAverage}
              completionRate={summary.completionRate}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <TasksCompletionAreaChart data={completionTrend} />
              <TasksCreationLineChart data={creationTrend} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <TasksStatusBarChart data={statusData} />
              <TasksPriorityBarChart data={priorityData} />
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
