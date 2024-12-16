import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faClock, faChartBar } from '@fortawesome/free-solid-svg-icons';

type View = 'tasks' | 'focus' | 'stats';

interface NavMenuProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export function NavMenu({ activeView, onViewChange }: NavMenuProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-muted rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('tasks')}
          className={cn(
            'flex items-center gap-2',
            activeView === 'tasks' && 'bg-background shadow-sm'
          )}
        >
          <FontAwesomeIcon icon={faListCheck} className="h-4 w-4" />
          <span>Tasks</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('focus')}
          className={cn(
            'flex items-center gap-2',
            activeView === 'focus' && 'bg-background shadow-sm'
          )}
        >
          <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
          <span>Focus</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('stats')}
          className={cn(
            'flex items-center gap-2',
            activeView === 'stats' && 'bg-background shadow-sm'
          )}
        >
          <FontAwesomeIcon icon={faChartBar} className="h-4 w-4" />
          <span>Stats</span>
        </Button>
      </div>
    </div>
  );
}