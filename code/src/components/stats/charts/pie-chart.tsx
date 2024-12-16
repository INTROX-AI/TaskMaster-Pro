import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useState, useCallback } from 'react';
import { ChartProps } from './chart-types';
import { chartConfig } from './chart-config';

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
  const text = `${(percent * 100).toFixed(0)}%`;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="fill-current text-sm font-medium"
    >
      {text}
    </text>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { value: number };
  }>;
  data: Array<{ value: number }>;
}

const CustomTooltip = ({ active, payload, data }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = data.reduce((a: number, b: { value: number }) => a + b.value, 0);
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value} tasks ({((payload[0].value / total) * 100).toFixed(0)}%)
        </p>
      </div>
    );
  }
  return null;
};

export function PieChart({ data }: ChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { colors, defaults } = chartConfig;

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={CustomLabel}
          labelLine={false}
          onMouseEnter={onPieEnter}
          animationDuration={defaults.animationDuration}
          animationBegin={0}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={[colors.primary, colors.secondary, colors.accent, colors.highlight][index % 4]}
              fillOpacity={activeIndex === index ? 1 : 0.7}
              stroke={activeIndex === index ? colors.background : 'none'}
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip data={data} />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value: string) => (
            <span className="text-sm text-foreground">{value}</span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}