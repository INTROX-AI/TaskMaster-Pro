import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { QuoteButton } from '@/components/quote/quote-button';

export function Header() {
  return (
    <div className="relative mb-8">
      <div className="fixed top-4 right-4 flex items-center gap-4">
        <QuoteButton />
        <ThemeToggle />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <FontAwesomeIcon 
            icon={faListCheck} 
            className="h-8 w-8 text-primary animate-pulse"
          />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            TaskMaster Pro 
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your tasks like a pro ⚡
          </p>
        </div>
      </div>
    </div>
  );
}