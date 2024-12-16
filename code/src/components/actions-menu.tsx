import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faFileImport, faFileExport } from "@fortawesome/free-solid-svg-icons";

interface ActionsMenuProps {
  onSave: () => Promise<void>;
  onLoad: () => Promise<void>;
}

export function ActionsMenu({ onSave, onLoad }: ActionsMenuProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      await onLoad();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-16 right-4 h-10 w-10 rounded-full shadow-lg hover:bg-primary/10 z-50"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={handleLoad} 
          className="cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faFileImport} className="mr-2 h-4 w-4" />
          )}
          Load Tasks
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSave} 
          className="cursor-pointer"
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faFileExport} className="mr-2 h-4 w-4" />
          )}
          Save Tasks
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}