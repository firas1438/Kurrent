
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useChartColors } from "@/hooks/use-chart-colors";

export interface StatusPoint {
  status: string;
  count: number;
}

interface TasksStatusBarProps {
  data: StatusPoint[];
}

export function TasksStatusBarChart({ data }: TasksStatusBarProps) {
  const colors = useChartColors();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Tasks by status
        </CardTitle>
        <CardDescription>
          Distribution of tasks across different statuses.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[260px] px-4 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis
              dataKey="status"
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
            />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              fill={colors.secondary}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
