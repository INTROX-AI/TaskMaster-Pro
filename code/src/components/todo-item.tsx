import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTrashCan,
  faPen,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Todo } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ColorPicker } from './color-picker/color-picker';
import { taskColors } from '@/lib/constants/colors';
import { TodoInput } from './todo-input';

interface TodoItemProps {
  todo: Todo;
  level?: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string, title: string, dueDate?: Date, color?: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onColorChange: (id: string, color: string) => void;
  showFadeEffect?: boolean;
}

export function TodoItem({
  todo,
  level = 0,
  onToggle,
  onDelete,
  onAddChild,
  onRename,
  onColorChange,
  showFadeEffect = false,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousCompletedRef = useRef(todo.completed);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (todo.completed && !previousCompletedRef.current && showFadeEffect) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    previousCompletedRef.current = todo.completed;
  }, [todo.completed, showFadeEffect]);

  const handleRename = () => {
    if (editValue.trim() !== '') {
      onRename(todo.id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  };

  const handleAddSubtask = (title: string, dueDate?: Date, color?: string) => {
    onAddChild(todo.id, title, dueDate, color);
    setShowSubtaskInput(false);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const getDueDateColor = (): "default" | "destructive" | "outline" | "secondary" => {
    if (!todo.dueDate) return "secondary";
    const now = new Date();
    const dueDate = new Date(todo.dueDate);
    
    if (dueDate < now) return "destructive";
    if (dueDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) return "outline";
    return "default";
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          'group flex items-center gap-2 rounded-lg border p-2 transition-all hover:shadow-md',
          todo.completed && 'bg-muted',
          !todo.completed && todo.color,
          level > 0 && `ml-${level * 4}`,
          isAnimating && showFadeEffect && 'animate-completion'
        )}
        style={{ marginLeft: level > 0 ? `${level * 1.5}rem` : 0 }}
      >
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'h-6 w-6 shrink-0 transition-colors duration-300',
            todo.completed && 'bg-primary text-primary-foreground'
          )}
          onClick={handleToggle}
        >
          <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
        </Button>

        {isEditing ? (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            className="flex-1 h-8 text-sm"
          />
        ) : (
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                'text-sm transition-all duration-300 truncate block',
                todo.completed && 'text-muted-foreground line-through'
              )}
            >
              {todo.title}
            </span>
            {todo.dueDate && (
              <Badge variant={getDueDateColor()} className="mt-1 text-xs">
                <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                {formatDate(todo.dueDate)}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-1 ml-auto items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ColorPicker
            selectedColor={todo.color || taskColors[0].value}
            onColorChange={(color) => onColorChange(todo.id, color.value)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7"
            onClick={() => setIsEditing(true)}
          >
            <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7"
            onClick={() => setShowSubtaskInput(!showSubtaskInput)}
          >
            <span className="text-xs font-bold">+</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7"
            onClick={() => onDelete(todo.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {showSubtaskInput && (
        <TodoInput onAdd={handleAddSubtask} isSubtask />
      )}

      {todo.children.map((child) => (
        <TodoItem
          key={child.id}
          todo={child}
          level={level + 1}
          onToggle={onToggle}
          onDelete={onDelete}
          onAddChild={onAddChild}
          onRename={onRename}
          onColorChange={onColorChange}
          showFadeEffect={showFadeEffect}
        />
      ))}
    </div>
  );
}