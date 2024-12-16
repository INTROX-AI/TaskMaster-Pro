import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {!isRunning ? (
        <Button
          onClick={onStart}
          size="lg"
          className="w-full sm:w-32 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlay} className="mr-2 h-4 w-4" />
          Start
        </Button>
      ) : (
        <Button
          onClick={onPause}
          size="lg"
          variant="secondary"
          className="w-full sm:w-32 transform hover:scale-105 transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPause} className="mr-2 h-4 w-4" />
          Pause
        </Button>
      )}
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="w-full sm:w-32 transform hover:scale-105 transition-all duration-200"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}