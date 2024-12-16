import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { TrendChartProps } from './chart-types';
import { chartConfig } from './chart-config';

export function TrendChart({ data }: TrendChartProps) {
  const { colors, defaults, tooltip, grid } = chartConfig;
  
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMM d'),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={formattedData} 
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid 
          strokeDasharray={grid.strokeDasharray} 
          stroke={grid.stroke} 
        />
        <XAxis 
          dataKey="date"
          stroke={colors.mutedForeground}
          fontSize={defaults.fontSize}
          tick={{ fill: colors.mutedForeground }}
          tickLine={{ stroke: grid.stroke }}
          axisLine={{ stroke: grid.stroke }}
        />
        <YAxis
          stroke={colors.mutedForeground}
          fontSize={defaults.fontSize}
          tick={{ fill: colors.mutedForeground }}
          tickLine={{ stroke: grid.stroke }}
          axisLine={{ stroke: grid.stroke }}
        />
        <Tooltip contentStyle={tooltip.style} />
        <Line
          type="monotone"
          dataKey="completed"
          name="Completed Tasks"
          stroke={colors.primary}
          strokeWidth={defaults.strokeWidth}
          dot={{ fill: colors.primary }}
        />
        <Line
          type="monotone"
          dataKey="added"
          name="Added Tasks"
          stroke={colors.muted}
          strokeWidth={defaults.strokeWidth}
          dot={{ fill: colors.muted }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}