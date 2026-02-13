
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useChartColors } from "@/hooks/use-chart-colors";

export interface CompletionPoint {
  date: string;
  completed: number;
}

interface TasksCompletionAreaProps {
  data: CompletionPoint[];
}

const formatDateLabel = (label: React.ReactNode) => {
  if (typeof label !== 'string') return '';
  const d = new Date(label);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export function TasksCompletionAreaChart({ data, }: TasksCompletionAreaProps) {
  const colors = useChartColors();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Completed tasks over time
        </CardTitle>
        <CardDescription>
          Daily count of completed tasks in the last two weeks.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[260px] px-4 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="completedArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.secondary}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={colors.secondary}
                  stopOpacity={0.15}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.border}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateLabel}
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tick={{ fill: colors.mutedForeground }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
              allowDecimals={false}
              tick={{ fill: colors.mutedForeground }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                background: colors.card,
                color: colors.foreground,     
              }}
              labelStyle={{
                color: colors.foreground,    
                fontWeight: 500,
                fontSize: 14,
              }}
              itemStyle={{
                color: colors.mutedForeground,     
                fontWeight: 300,
                fontSize: 14,
              }}
              cursor={{ fill: colors.secondary, opacity: 0.3 }}
              labelFormatter={formatDateLabel}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke={colors.mutedForeground}
              fillOpacity={1}
              fill="url(#completedArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
