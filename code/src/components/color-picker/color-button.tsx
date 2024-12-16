import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { taskColors } from "@/lib/constants/colors";

interface ColorButtonProps {
  color: typeof taskColors[number];
  selected: boolean;
  onClick: () => void;
}

export function ColorButton({ color, selected, onClick }: ColorButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-8 h-8 rounded-full p-0 relative",
        color.value,
        selected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
      title={color.name}
    >
      <span className="sr-only">{color.name}</span>
    </Button>
  );
}