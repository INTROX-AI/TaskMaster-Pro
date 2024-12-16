import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ColorPicker } from './color-picker/color-picker';
import { taskColors } from '@/lib/constants/colors';

interface TodoInputProps {
  onAdd: (title: string, dueDate?: Date, color?: string) => void;
  isSubtask?: boolean;
}

export function TodoInput({ onAdd, isSubtask = false }: TodoInputProps) {
  const [input, setInput] = useState('');
  const [date, setDate] = useState<Date>();
  const [selectedColor, setSelectedColor] = useState(taskColors[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim(), date, selectedColor);
      setInput('');
      setDate(undefined);
    }
  };

  return (
    <form 
      className={cn(
        "flex flex-col gap-2 mb-4",
        isSubtask ? "ml-8" : "mb-6"
      )} 
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isSubtask ? "Add a subtask..." : "What needs to be done?"}
          className={cn(
            "flex-1",
            isSubtask ? "h-9 text-sm" : "h-12 text-base"
          )}
        />
        
        <Button
          type="submit"
          size={isSubtask ? "sm" : "default"}
          className="shrink-0"
          title={isSubtask ? "Add Subtask" : "Add Task"}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4" />
          <span className="sr-only">{isSubtask ? "Add Subtask" : "Add Task"}</span>
        </Button>
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={isSubtask ? "sm" : "default"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Set due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <ColorPicker
          selectedColor={selectedColor}
          onColorChange={(color) => setSelectedColor(color.value)}
        />
      </div>
    </form>
  );
}