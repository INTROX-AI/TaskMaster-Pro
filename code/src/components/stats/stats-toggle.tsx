import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TodoStats } from './todo-stats';
import { Todo } from '@/lib/types';

interface StatsToggleProps {
  todos: Todo[];
}

export function StatsToggle({ todos }: StatsToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-8 space-y-2"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            <FontAwesomeIcon
              icon={faChartBar}
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
            <span className="sr-only">Toggle stats</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <TodoStats todos={todos} />
      </CollapsibleContent>
    </Collapsible>
  );
}