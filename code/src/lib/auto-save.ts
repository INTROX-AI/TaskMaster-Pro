import { Todo } from './types';

const AUTO_SAVE_KEY = 'taskmaster-autosave';
const BACKUP_INTERVAL = 30000; // 30 seconds

export function saveToLocalStorage(todos: Todo[]) {
  localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(todos));
}

export function loadFromLocalStorage(): Todo[] {
  const savedData = localStorage.getItem(AUTO_SAVE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      return parsedData.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        lastModified: todo.lastModified ? new Date(todo.lastModified) : new Date(),
      }));
    } catch (error) {
      console.error('Error restoring data:', error);
      return [];
    }
  }
  return [];
}

export function setupAutoSave(todos: Todo[], onRestore: (todos: Todo[]) => void) {
  // Load initial data
  const savedTodos = loadFromLocalStorage();
  if (savedTodos.length > 0) {
    onRestore(savedTodos);
  }

  // Set up periodic backup
  const backupInterval = setInterval(() => {
    saveToLocalStorage(todos);
  }, BACKUP_INTERVAL);

  // Return cleanup function
  return () => {
    clearInterval(backupInterval);
  };
}
