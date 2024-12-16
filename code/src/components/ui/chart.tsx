import { ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ReactElement } from 'react';

interface ChartProps {
  children: ReactElement;
  className?: string;
}

export function Chart({ children, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {children}
    </ResponsiveContainer>
  );
}

export type ChartTooltipProps = TooltipProps<ValueType, NameType>;
