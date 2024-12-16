import { formatTime } from '@/lib/utils';

interface TimerDisplayProps {
  timeLeft: number;
  isRunning: boolean;
}

export function TimerDisplay({ timeLeft, isRunning }: TimerDisplayProps) {
  return (
    <div className="relative flex items-center justify-center py-8">
      <div className="text-center transform scale-120 hover:scale-105 transition-transform duration-200">
        <div className={`text-4xl sm:text-6xl md:text-7xl font-bold tabular-nums tracking-tight ${
          isRunning ? 'text-primary animate-pulse' : ''
        }`}>
          {formatTime(timeLeft)}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {isRunning ? 'Focus time remaining' : 'Ready to focus'}
        </p>
      </div>
    </div>
  );
}