import { ClipboardListIcon, CheckIcon, CalendarIcon, PercentIcon, } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";

interface MetricCardsProps {
  totalTasks: number;
  completedTasks: number;
  dailyAverage: number;
  completionRate: number;
}

export function MetricCards({ totalTasks, completedTasks, dailyAverage, completionRate, }: MetricCardsProps) {
  const cards = [
    {
      id: 1,
      Icon: ClipboardListIcon,
      metric: totalTasks.toString(),
      desc: "Total Tasks",
      footer: "Total number of tasks.",
    },
    {
      id: 2,
      Icon: CheckIcon,
      metric: completedTasks.toString(),
      desc: "Completed Tasks",
      footer: "Total number of tasks completed.",
    },
    {
      id: 3,
      Icon: CalendarIcon,
      metric: dailyAverage.toString(),
      desc: "Daily Average",
      footer: "Tasks created per day (last 7 days).",
    },
    {
      id: 4,
      Icon: PercentIcon,
      metric: `${completionRate}%`,
      desc: "Completion Rate",
      footer: "Task completion percentage.",
    },
  ];

  return (
    <div className=" grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map(({ id, Icon, metric, desc, footer }) => (
        <Card key={id} className="@container/card bg-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <CardDescription>{desc}</CardDescription>
            </div>
            <CardTitle className="mt-2 font-mono text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
              {metric}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground text-[0.82rem]">{footer}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}