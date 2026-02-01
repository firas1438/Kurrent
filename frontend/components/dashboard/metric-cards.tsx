import { ClipboardListIcon, CheckCheckIcon, CalendarIcon, PercentIcon } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricCards() {
  const cards = [
    { id: 1, Icon: ClipboardListIcon, metric: "56", desc: "Total Tasks", footer: "Total number of tasks." },
    { id: 2, Icon: CheckCheckIcon, metric: "36", desc: "Completed Tasks", footer: "Total number of tasks completed." },
    { id: 3, Icon: CalendarIcon, metric: "2.4", desc: "Daily Average", footer: "Tasks created per day." },
    { id: 4, Icon: PercentIcon, metric: "42%", desc: "Completion Rate", footer: "Task completion percentage." }
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map(({ id, Icon, metric, desc, footer }) => (
        <Card key={id} className="@container/card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <CardDescription>{desc}</CardDescription>
            </div>
            <CardTitle className="text-xl font-semibold font-mono tabular-nums @[250px]/card:text-2xl mt-2">
              {metric}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">{footer}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}