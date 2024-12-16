import { useState, useEffect } from 'react';
import { Todo } from '@/lib/types';
import { setupAutoSave, saveToLocalStorage } from '@/lib/auto-save';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedData = localStorage.getItem('taskmaster-autosave');
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
  });

  useEffect(() => {
    const cleanup = setupAutoSave(todos, (restoredTodos) => {
      setTodos(restoredTodos);
    });

    return cleanup;
  }, []);

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  const addTodo = (title: string, parentId: string | null = null, dueDate?: Date, color?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      children: [],
      parentId,
      dueDate,
      color,
      completedAt: undefined,
      lastModified: new Date(),
    };

    setTodos((prev) => {
      if (!parentId) {
        return [newTodo, ...prev];
      }

      const updateChildren = (todos: Todo[]): Todo[] => {
        return todos.map((todo) => {
          if (todo.id === parentId) {
            return {
              ...todo,
              children: [newTodo, ...todo.children],
              lastModified: new Date(),
            };
          }
          if (todo.children.length > 0) {
            return {
              ...todo,
              children: updateChildren(todo.children),
            };
          }
          return todo;
        });
      };

      return updateChildren(prev);
    });
  };

  const toggleTodo = (id: string) => {
    const updateTodos = (todos: Todo[]): Todo[] => {
      return todos.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          const now = new Date();
          return {
            ...todo,
            completed: newCompleted,
            completedAt: newCompleted ? now : undefined,
            lastModified: now,
            children: todo.children.map(child => ({
              ...child,
              completed: newCompleted,
              completedAt: newCompleted ? now : undefined,
              lastModified: now,
              children: child.children.map(subChild => ({
                ...subChild,
                completed: newCompleted,
                completedAt: newCompleted ? now : undefined,
                lastModified: now,
              }))
            }))
          };
        }

        if (todo.children.length > 0) {
          const updatedChildren = updateTodos(todo.children);
          const allChildrenCompleted = updatedChildren.every(
            child => child.completed && child.children.every(subChild => subChild.completed)
          );
          return {
            ...todo,
            completed: allChildrenCompleted,
            completedAt: allChildrenCompleted ? new Date() : undefined,
            lastModified: new Date(),
            children: updatedChildren
          };
        }

        return todo;
      });
    };

    setTodos(updateTodos);
  };

  const deleteTodo = (id: string) => {
    const filterTodos = (todos: Todo[]): Todo[] => {
      return todos
        .filter((todo) => todo.id !== id)
        .map((todo) => ({
          ...todo,
          children: filterTodos(todo.children),
          lastModified: new Date(),
        }));
    };

    setTodos(filterTodos);
  };

  const renameTodo = (id: string, newTitle: string) => {
    const updateTodos = (todos: Todo[]): Todo[] => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle,
            lastModified: new Date(),
          };
        }
        if (todo.children.length > 0) {
          return {
            ...todo,
            children: updateTodos(todo.children),
          };
        }
        return todo;
      });
    };

    setTodos(updateTodos);
  };

  const updateTodoColor = (id: string, color: string) => {
    const updateTodos = (todos: Todo[]): Todo[] => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            color,
            lastModified: new Date(),
          };
        }
        if (todo.children.length > 0) {
          return {
            ...todo,
            children: updateTodos(todo.children),
          };
        }
        return todo;
      });
    };

    setTodos(updateTodos);
  };

  return {
    todos,
    setTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    renameTodo,
    updateTodoColor,
  };
}