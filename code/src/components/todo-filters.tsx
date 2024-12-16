import { Button } from '@/components/ui/button';
import { TodoFilter } from '@/lib/types';

interface TodoFiltersProps {
  activeFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  itemsLeft: number;
}

export function TodoFilters({
  activeFilter,
  onFilterChange,
  itemsLeft,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 px-2">
      <span className="text-sm text-muted-foreground order-2 sm:order-1">
        {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
      </span>
      <div className="flex gap-2 w-full sm:w-auto justify-center order-1 sm:order-2">
        <Button
          variant={activeFilter === 'today' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('today')}
          className="flex-1 sm:flex-none"
        >
          Today
        </Button>
        <Button
          variant={activeFilter === 'all' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('all')}
          className="flex-1 sm:flex-none"
        >
          All
        </Button>
        <Button
          variant={activeFilter === 'active' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('active')}
          className="flex-1 sm:flex-none"
        >
          Active
        </Button>
        <Button
          variant={activeFilter === 'completed' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('completed')}
          className="flex-1 sm:flex-none"
        >
          Completed
        </Button>
      </div>
    </div>
  );
}