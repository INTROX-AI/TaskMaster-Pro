import { Card } from '@/components/ui/card';
import { Todo } from '@/lib/types';
import { BarChart } from './charts/bar-chart';
import { PieChart } from './charts/pie-chart';
import { TrendChart } from './charts/trend-chart';
import { useProductivityStats } from '@/hooks/use-productivity-stats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faFire, faTasks } from '@fortawesome/free-solid-svg-icons';

interface ProductivityStatsProps {
  todos: Todo[];
}

export function ProductivityStats({ todos }: ProductivityStatsProps) {
  const { pieData, barData, trendData, metrics } = useProductivityStats(todos);

  // Filter barData to only include Active and Completed
  const filteredBarData = barData.filter(item => 
    item.name === 'Active' || item.name === 'Completed'
  );

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Completion Rate</h3>
              <p className="text-2xl font-bold">{metrics.completionRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FontAwesomeIcon icon={faFire} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Active Streak</h3>
              <p className="text-2xl font-bold">{metrics.streak} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 transform hover:scale-105 transition-transform duration-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FontAwesomeIcon icon={faTasks} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tasks Today</h3>
              <p className="text-2xl font-bold">{metrics.tasksToday}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 transform hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
          <div className="h-[300px] w-full">
            <PieChart data={pieData} />
          </div>
        </Card>

        <Card className="p-6 transform hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-medium mb-4">Task Categories</h3>
          <div className="h-[300px] w-full">
            <BarChart data={filteredBarData} />
          </div>
        </Card>
      </div>

      <Card className="p-6 transform hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-lg font-medium mb-4">Productivity Trends</h3>
        <div className="h-[300px] sm:h-[400px] w-full">
          <TrendChart data={trendData} />
        </div>
      </Card>
    </div>
  );
}