export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TrendDataPoint {
  date: Date;
  completed: number;
  added: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
}

export interface TrendChartProps {
  data: TrendDataPoint[];
}