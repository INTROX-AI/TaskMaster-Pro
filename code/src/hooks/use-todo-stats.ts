import { useMemo } from 'react';
import { Todo } from '@/lib/types';

export function useTodoStats(todos: Todo[]) {
  return useMemo(() => {
    const calculateStats = (todoList: Todo[]) => {
      let total = 0;
      let completed = 0;
      let groups = 0;

      const processItem = (item: Todo) => {
        total++;
        if (item.completed) completed++;
        if (item.isGroup) groups++;
        item.children.forEach(processItem);
      };

      todoList.forEach(processItem);
      return { total, completed, groups, active: total - completed };
    };

    const stats = calculateStats(todos);

    const pieData = [
      { name: 'Completed', value: stats.completed },
      { name: 'Active', value: stats.active },
    ];

    const barData = [
      { name: 'Total Tasks', value: stats.total },
      { name: 'Groups', value: stats.groups },
      { name: 'Completed', value: stats.completed },
      { name: 'Active', value: stats.active },
    ];

    return {
      stats,
      pieData,
      barData,
    };
  }, [todos]);
}