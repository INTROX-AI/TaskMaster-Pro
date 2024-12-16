import { useMemo } from 'react';
import { Todo } from '@/lib/types';
import { subDays, isSameDay, isWithinInterval, startOfDay, differenceInHours, isBefore } from 'date-fns';

export function useProductivityStats(todos: Todo[]) {
  return useMemo(() => {
    const now = new Date();

    const calculateStats = () => {
      let completed = 0;
      let active = 0;
      let todayTasks = 0;
      let onTimeCompletions = 0;
      let totalWithDueDate = 0;

      const processItem = (item: Todo) => {
        if (item.completed) {
          completed++;
          // Check if completed on time
          if (item.dueDate && item.completedAt) {
            totalWithDueDate++;
            if (isBefore(new Date(item.completedAt), new Date(item.dueDate))) {
              onTimeCompletions++;
            }
          }
        } else {
          active++;
        }
        
        if (isSameDay(new Date(item.createdAt), now)) {
          todayTasks++;
        }
        
        item.children.forEach(processItem);
      };

      todos.forEach(processItem);
      return { 
        completed, 
        active, 
        todayTasks,
        onTimeRate: totalWithDueDate > 0 
          ? Math.round((onTimeCompletions / totalWithDueDate) * 100) 
          : 100
      };
    };

    const stats = calculateStats();

    // Generate trend data for the last 7 days
    const trendData = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(now, i);
      const startOfCurrentDay = startOfDay(date);
      const endOfCurrentDay = new Date(startOfCurrentDay);
      endOfCurrentDay.setDate(startOfCurrentDay.getDate() + 1);
      const dayInterval = { start: startOfCurrentDay, end: endOfCurrentDay };

      const dayStats = todos.reduce((acc, todo) => {
        const processTodo = (item: Todo) => {
          // Count completed tasks
          if (item.completedAt && isWithinInterval(new Date(item.completedAt), dayInterval)) {
            acc.completed++;
            
            // Calculate efficiency (completion speed relative to due date)
            if (item.dueDate) {
              const dueDate = new Date(item.dueDate);
              const completedDate = new Date(item.completedAt);
              const timeToDeadline = differenceInHours(dueDate, completedDate);
              
              if (timeToDeadline > 0) {
                // Completed before deadline
                acc.efficiencyScore += 1;
              } else {
                // Completed after deadline
                acc.efficiencyScore -= 0.5;
              }
              acc.tasksWithDueDate++;
            }
          }

          // Count new tasks
          if (isWithinInterval(new Date(item.createdAt), dayInterval)) {
            acc.added++;
          }

          // Process children recursively
          item.children.forEach(processTodo);
        };

        processTodo(todo);
        return acc;
      }, {
        completed: 0,
        added: 0,
        efficiencyScore: 0,
        tasksWithDueDate: 0
      });

      // Calculate productivity score
      const productivityScore = dayStats.tasksWithDueDate > 0
        ? Math.round((dayStats.efficiencyScore / dayStats.tasksWithDueDate) * 100)
        : dayStats.completed > 0 ? 100 : 0;

      return {
        date,
        completed: dayStats.completed,
        added: dayStats.added,
        productivityScore: Math.max(0, Math.min(100, productivityScore)), // Clamp between 0-100
      };
    }).reverse();

    const completionRate = stats.completed + stats.active > 0
      ? Math.round((stats.completed / (stats.completed + stats.active)) * 100)
      : 0;

    const calculateStreak = () => {
      let streak = 0;
      let currentDay = now;

      while (true) {
        const dayStart = startOfDay(currentDay);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);
        
        const hasCompletedTasks = todos.some(todo => {
          const checkCompletion = (item: Todo) => {
            if (item.completedAt && isWithinInterval(new Date(item.completedAt), { start: dayStart, end: dayEnd })) {
              return true;
            }
            return item.children.some(checkCompletion);
          };
          return checkCompletion(todo);
        });

        if (!hasCompletedTasks) break;
        streak++;
        currentDay = subDays(currentDay, 1);
      }

      return streak;
    };

    return {
      pieData: [
        { name: 'Completed', value: stats.completed },
        { name: 'Active', value: stats.active },
      ],
      barData: [
        { name: 'Active', value: stats.active },
        { name: 'Completed', value: stats.completed },
      ],
      trendData,
      metrics: {
        completionRate,
        streak: calculateStreak(),
        tasksToday: stats.todayTasks,
        onTimeCompletionRate: stats.onTimeRate,
      },
    };
  }, [todos]);
}