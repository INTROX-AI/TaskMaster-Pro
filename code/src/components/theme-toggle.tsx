import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-10 w-10 rounded-full bg-background/95 shadow-md border border-border/50 hover:bg-primary/5"
    >
      <FontAwesomeIcon
        icon={theme === 'light' ? faMoon : faSun}
        className="h-5 w-5"
      />
    </Button>
  );
}