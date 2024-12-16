import { useState } from 'react';
import { TodoFilter, Todo } from '@/lib/types';
import { TodoInput } from '@/components/todo-input';
import { TodoItem } from '@/components/todo-item';
import { TodoFilters } from '@/components/todo-filters';
import { ProductivityStats } from '@/components/stats/productivity-stats';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { saveTodosToFile, loadTodosFromFile } from '@/lib/file-utils';
import { useTodos } from '@/hooks/use-todos';
import { FocusTimer } from '@/components/focus-timer/focus-timer';
import { NavMenu } from '@/components/navigation/nav-menu';
import { filterTodosByDueDate } from '@/lib/productivity-metrics';
import { ActionsMenu } from '@/components/actions-menu';
import { Footer } from '@/components/footer';

// Define the view types

type View = 'tasks' | 'focus' | 'stats';

function App() {
  const { todos, setTodos, addTodo, toggleTodo, deleteTodo, renameTodo, updateTodoColor } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>('today');
  const [activeView, setActiveView] = useState<View>('tasks');
  const { toast } = useToast();

  const handleSaveToFile = async () => {
    try {
      const success = await saveTodosToFile(todos);
      if (success) {
        toast({
          title: 'Success',
          description: 'Todos saved to file',
        });
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not save todos to file',
        variant: 'destructive',
      });
    }
  };

  const handleLoadFromFile = async () => {
    try {
      const loadedTodos = await loadTodosFromFile();
      if (loadedTodos) {
        setTodos(loadedTodos);
        toast({
          title: 'Success',
          description: 'Todos loaded from file',
        });
      } else {
        throw new Error('Load failed');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load todos from file',
        variant: 'destructive',
      });
    }
  };

  const filterTodoList = (todos: Todo[], filter: TodoFilter): Todo[] => {
    let filteredTodos = todos;

    if (filter === 'today') {
      filteredTodos = filterTodosByDueDate(todos);
    }

    return filteredTodos
      .filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .map((todo) => ({
        ...todo,
        children: todo.children ? 
          filter === 'completed' && todo.completed 
            ? todo.children 
            : filterTodoList(todo.children, filter)
          : []
      }));
  };

  const filteredTodos = filterTodoList(todos, filter);

  const countActiveTodos = (todos: Todo[]): number => {
    return todos.reduce((count, todo) => {
      const childCount = todo.children ? countActiveTodos(todo.children) : 0;
      return count + (!todo.completed ? 1 : 0) + childCount;
    }, 0);
  };

  const activeTodosCount = countActiveTodos(todos);

  const handleAddTodo = (title: string, dueDate?: Date, color?: string) => {
    addTodo(title, null, dueDate, color);
  };

  const handleAddSubtodo = (parentId: string, title: string, dueDate?: Date, color?: string) => {
    addTodo(title, parentId, dueDate, color);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'focus':
        return <FocusTimer />;
      case 'stats':
        return <ProductivityStats todos={todos} />;
      default:
        return (
          <div className="bg-card rounded-xl shadow-xl p-4 sm:p-6 border border-primary/10">
            <TodoInput onAdd={handleAddTodo} />

            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onAddChild={handleAddSubtodo}
                  onRename={renameTodo}
                  onColorChange={updateTodoColor}
                  showFadeEffect={filter === 'all'}
                />
              ))}
            </div>

            {todos.length > 0 && (
              <TodoFilters
                activeFilter={filter}
                onFilterChange={setFilter}
                itemsLeft={activeTodosCount}
              />
            )}

            {todos.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-lg mb-2">No tasks yet. Time to be productive!</p>
                <p className="text-sm">Add your first task above to get started.</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="container max-w-3xl mx-auto p-4">
        <Header />
        <NavMenu activeView={activeView} onViewChange={setActiveView} />
        {renderContent()}
        <ActionsMenu onSave={handleSaveToFile} onLoad={handleLoadFromFile} />
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
