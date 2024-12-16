export const chartConfig = {
  colors: {
    primary: '#FF3333',
    secondary: '#FFB700',
    accent: '#3366FF',
    highlight: '#9933FF',
    muted: '#666666',
    background: 'hsl(var(--background))',
    border: 'hsl(var(--border))',
    mutedForeground: 'hsl(var(--muted-foreground))',
    foreground: 'hsl(var(--foreground))',
    cells: ['#FF3333', '#FFB700', '#3366FF', '#9933FF']
  },
  defaults: {
    fontSize: 12,
    strokeWidth: 2,
    animationDuration: 800,
    radius: [4, 4, 0, 0],
  },
  tooltip: {
    style: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  grid: {
    stroke: 'hsl(var(--muted-foreground) / 0.2)',
    strokeDasharray: '3 3',
  },
};