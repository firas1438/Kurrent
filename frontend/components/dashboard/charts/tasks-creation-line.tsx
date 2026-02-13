
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useChartColors } from "@/hooks/use-chart-colors";

export interface CreationPoint {
  date: string;
  created: number;
}

interface TasksCreationLineProps {
  data: CreationPoint[];
}

const formatDateLabel = (label: React.ReactNode) => {
  if (typeof label !== 'string') return '';
  const d = new Date(label);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export function TasksCreationLineChart({ data }: TasksCreationLineProps) {
  const colors = useChartColors();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Tasks created over time
        </CardTitle>
        <CardDescription>
          Daily count of new tasks created in the last two weeks.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[260px] px-4 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="created"
              stroke={colors.mutedForeground}
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
