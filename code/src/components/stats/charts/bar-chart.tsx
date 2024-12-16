import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useState } from 'react';
import { ChartProps } from './chart-types';
import { chartConfig } from './chart-config';

export function BarChart({ data }: ChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { colors, defaults, tooltip, grid } = chartConfig;

  // Filter to only show Active and Completed
  const filteredData = data.filter(item => 
    item.name === 'Active' || item.name === 'Completed'
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart 
        data={filteredData} 
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        onMouseMove={(state) => {
          if (state?.activeTooltipIndex !== undefined) {
            setActiveIndex(state.activeTooltipIndex);
          }
        }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <CartesianGrid 
          strokeDasharray={grid.strokeDasharray} 
          stroke={grid.stroke}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: colors.mutedForeground }}
          tickLine={{ stroke: grid.stroke }}
          axisLine={{ stroke: grid.stroke }}
          fontSize={defaults.fontSize}
        />
        <YAxis 
          tick={{ fill: colors.mutedForeground }}
          tickLine={{ stroke: grid.stroke }}
          axisLine={{ stroke: grid.stroke }}
          fontSize={defaults.fontSize}
        />
        <Tooltip 
          contentStyle={tooltip.style}
          cursor={{ fill: 'hsl(var(--muted) / 0.2)' }}
        />
        <Bar 
          dataKey="value" 
          radius={[4, 4, 0, 0]}
          animationDuration={defaults.animationDuration}
        >
          {filteredData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.name === 'Completed' ? colors.primary : colors.secondary}
              fillOpacity={index === activeIndex ? 1 : 0.7}
              stroke={index === activeIndex ? colors.background : 'none'}
              strokeWidth={2}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}