import { Todo } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useTodoStats } from '@/hooks/use-todo-stats';
import { PieChart } from './charts/pie-chart';
import { BarChart } from './charts/bar-chart';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const { pieData, barData } = useTodoStats(todos);

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/95 border-primary/10">
      <h2 className="text-2xl font-semibold mb-8">Task Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[300px] p-4 rounded-lg bg-gradient-to-br from-background to-background/95 border border-border/50">
          <h3 className="text-lg font-medium mb-4 text-center">Task Distribution</h3>
          <PieChart data={pieData} />
        </div>

        <div className="h-[300px] p-4 rounded-lg bg-gradient-to-br from-background to-background/95 border border-border/50">
          <h3 className="text-lg font-medium mb-4 text-center">Task Overview</h3>
          <BarChart data={barData} />
        </div>
      </div>
    </Card>
  );
}