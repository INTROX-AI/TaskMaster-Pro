export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  children: Todo[];
  parentId: string | null;
  dueDate?: Date;
  color?: string;
  completedAt?: Date;
  lastModified: Date;
  isGroup?: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed' | 'today';

export interface Quote {
  q: string;
  a: string;
  h: string;
}

export interface ProductivityMetrics {
  completionRate: number;
  taskVelocity: number;
  consistencyScore: number;
  focusScore: number;
}