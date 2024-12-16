import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForward, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const FOCUS_SOUNDS = [
  { name: "White Noise", url: "./white-noise.mp3" },
  { name: "Rain Sounds", url: "./rainsound.mp3" },
  { name: "Nature Sounds", url: "./naturesound.mp3" },
  { name: "Ocean Waves", url: "./ocean-noise.mp3" },
  { name: "Underwater", url: "./underwater-noise.mp3" }
];

export function FocusPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        setIsPlaying(false);
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('error', () => {});
        }
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSound, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSound = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setCurrentSound((prev) => (prev + 1) % FOCUS_SOUNDS.length);
      setIsPlaying(true);
    }, 100);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume / 100);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <Card className="bg-card border-border">
      <audio
        ref={audioRef}
        src={FOCUS_SOUNDS[currentSound].url}
        loop
        preload="auto"
      />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">
            Focus Sounds: {FOCUS_SOUNDS[currentSound].name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="w-8 h-8 p-0"
              >
                <FontAwesomeIcon 
                  icon={isMuted ? faVolumeMute : faVolumeUp} 
                  className="h-4 w-4" 
                />
              </Button>
              {showVolumeSlider && (
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 p-2 bg-card border rounded-lg shadow-lg"
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <Slider
                    value={[volume * 100]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSound}
              className="w-8 h-8 p-0"
            >
              <FontAwesomeIcon icon={faForward} className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={togglePlay}
          className="w-full"
        >
          <FontAwesomeIcon 
            icon={isPlaying ? faPause : faPlay} 
            className="h-4 w-4 mr-2" 
          />
          {isPlaying ? 'Pause' : 'Play'} Focus Sounds
        </Button>
      </div>
    </Card>
  );
}