import { Todo } from './types';

export const saveTodosToFile = async (todos: Todo[]) => {
  try {
    // Convert todos to JSON string with proper formatting
    const todosJSON = JSON.stringify(todos, null, 2);
    
    // Create a Blob with the JSON data
    const blob = new Blob([todosJSON], { type: 'application/json' });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskmaster-todos-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error saving todos:', error);
    return false;
  }
};

export const loadTodosFromFile = async (): Promise<Todo[] | null> => {
  try {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    // Create promise to handle file selection
    const fileSelected = new Promise<Todo[] | null>((resolve) => {
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const content = e.target?.result as string;
            const todos = JSON.parse(content);
            
            // Convert date strings back to Date objects
            const processedTodos = processDates(todos);
            resolve(processedTodos);
          } catch (error) {
            console.error('Error parsing todos:', error);
            resolve(null);
          }
        };
        reader.readAsText(file);
      };
    });

    // Trigger file selection
    input.click();
    return await fileSelected;
  } catch (error) {
    console.error('Error loading todos:', error);
    return null;
  }
};

// Helper function to process dates in the loaded JSON
const processDates = (todos: Todo[]): Todo[] => {
  return todos.map(todo => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    lastModified: new Date(todo.lastModified),
    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
    completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
    children: processDates(todo.children)
  }));
};