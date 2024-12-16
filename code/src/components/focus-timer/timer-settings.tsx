import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TimerSettingsProps {
  selectedDuration: number;
  onDurationChange: (minutes: number) => void;
}

const presetDurations = [
  { label: '5m', minutes: 5 },
  { label: '15m', minutes: 15 },
  { label: '25m', minutes: 25 },
  { label: '45m', minutes: 45 },
];

export function TimerSettings({
  selectedDuration,
  onDurationChange,
}: TimerSettingsProps) {
  const [customMinutes, setCustomMinutes] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = parseInt(customMinutes);
    if (!isNaN(minutes) && minutes > 0) {
      onDurationChange(minutes);
      setCustomMinutes('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presetDurations.map(({ label, minutes }) => (
          <Button
            key={minutes}
            onClick={() => onDurationChange(minutes)}
            variant={selectedDuration === minutes ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'w-full transform hover:scale-105 transition-transform duration-200',
              selectedDuration === minutes && 'bg-primary text-primary-foreground'
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Label htmlFor="custom-minutes" className="sr-only">
            Custom Minutes
          </Label>
          <Input
            id="custom-minutes"
            type="number"
            min="1"
            placeholder="Custom minutes"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            className="w-full"
          />
        </div>
        <Button 
          type="submit" 
          variant="secondary"
          className="w-full sm:w-24 transform hover:scale-105 transition-all duration-200"
        >
          Set
        </Button>
      </form>
    </div>
  );
}