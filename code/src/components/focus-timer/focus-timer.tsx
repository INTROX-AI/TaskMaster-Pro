import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FocusPlayer } from './focus-player';
import { TimerDisplay } from './timer-display';
import { TimerControls } from './timer-controls';
import { TimerSettings } from './timer-settings';

export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const timerRef = useRef<NodeJS.Timeout>();
  const notificationRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      notificationRef.current?.play();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  }, [selectedDuration]);

  const handleDurationChange = useCallback((duration: number) => {
    setSelectedDuration(duration);
    setTimeLeft(duration * 60);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Magic Circle */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-1000 pointer-events-none",
        isRunning ? "opacity-30 scale-100" : "opacity-0 scale-90"
      )}>
        <div className="relative w-[1400px] h-[1400px]">
          <img 
            src="./magic-circle.png" 
            alt="" 
            className="absolute inset-0 w-full h-full object-contain select-none animate-spin-slow"
            style={{
              filter: 'hue-rotate(320deg) saturate(2) brightness(1.7)'
            }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto space-y-6">
        {/* Focus Player */}
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <FocusPlayer />
        </div>
        
        {/* Main Timer Card */}
        <Card className="relative overflow-hidden backdrop-blur-md bg-background/40 border-primary/20">
          <div className="relative p-8 space-y-8">
            <TimerDisplay 
              timeLeft={timeLeft}
              isRunning={isRunning}
            />
            
            <TimerControls
              isRunning={isRunning}
              onStart={toggleTimer}
              onPause={toggleTimer}
              onReset={resetTimer}
            />

            {!isRunning && (
              <TimerSettings
                selectedDuration={selectedDuration}
                onDurationChange={handleDurationChange}
              />
            )}
          </div>
        </Card>

        <audio
          ref={notificationRef}
          src="./notification.mp3"
          preload="auto"
        />
      </div>
    </div>
  );
}