import { Todo } from './types';
import { 
  differenceInDays, 
  differenceInMinutes, 
  isWithinInterval,
  startOfDay,
  endOfDay
} from 'date-fns';

export function calculateProductivityMetrics(todos: Todo[]) {
  const today = new Date();
  
  // Task Velocity: Rate of task completion over time
  const calculateTaskVelocity = () => {
    const last7Days = todos.filter(todo => {
      const createdDate = new Date(todo.createdAt);
      return differenceInDays(today, createdDate) <= 7;
    });

    const completedTasks = last7Days.filter(todo => todo.completed);
    return (completedTasks.length / Math.max(last7Days.length, 1)) * 100;
  };

  // Consistency Score: How regularly tasks are completed
  const calculateConsistencyScore = () => {
    const dailyCompletions = new Array(7).fill(0);
    
    todos.forEach(todo => {
      if (todo.completed && todo.completedAt) {
        const dayIndex = differenceInDays(today, new Date(todo.completedAt));
        if (dayIndex >= 0 && dayIndex < 7) {
          dailyCompletions[dayIndex]++;
        }
      }
    });

    const variance = calculateVariance(dailyCompletions);
    return Math.max(100 - (variance * 10), 0); // Lower variance means higher consistency
  };

  // Focus Score: Based on task completion times and modifications
  const calculateFocusScore = () => {
    const completedTasks = todos.filter(todo => todo.completed && todo.completedAt);
    
    if (completedTasks.length === 0) return 0;

    const averageCompletionTime = completedTasks.reduce((sum, todo) => {
      const completionTime = differenceInMinutes(
        new Date(todo.completedAt!),
        new Date(todo.createdAt)
      );
      return sum + completionTime;
    }, 0) / completedTasks.length;

    // Lower completion time means higher focus score
    return Math.min(100, (1000 / Math.max(averageCompletionTime, 1)) * 100);
  };

  // Helper function to calculate variance
  const calculateVariance = (numbers: number[]) => {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squareDiffs = numbers.map(value => Math.pow(value - mean, 2));
    return squareDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  };

  return {
    taskVelocity: Math.round(calculateTaskVelocity()),
    consistencyScore: Math.round(calculateConsistencyScore()),
    focusScore: Math.round(calculateFocusScore())
  };
}

export function filterTodosByDueDate(todos: Todo[]): Todo[] {
  const today = new Date();
  return todos.filter(todo => {
    if (!todo.dueDate) return false;
    return isWithinInterval(new Date(todo.dueDate), { 
      start: startOfDay(today),
      end: endOfDay(today)
    });
  });
}