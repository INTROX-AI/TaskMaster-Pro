import { cn } from "@/lib/utils";
import { taskColors } from "@/lib/constants/colors";
import { ColorButton } from "./color-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: typeof taskColors[number]) => void;
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  const selected = taskColors.find(color => color.value === selectedColor) || taskColors[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            selected.value
          )}
        >
          <FontAwesomeIcon icon={faPalette} className={cn("h-4 w-4", selected.textColor)} />
          <span className="sr-only">Pick a color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-5 gap-2">
          {taskColors.map((color) => (
            <ColorButton
              key={color.name}
              color={color}
              selected={color.value === selectedColor}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}