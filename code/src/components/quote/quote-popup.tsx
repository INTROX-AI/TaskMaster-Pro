import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Quote } from '@/lib/quotes-service';
import { Button } from '@/components/ui/button';

interface QuotePopupProps {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export function QuotePopup({ quote, isOpen, onClose, onRefresh }: QuotePopupProps) {
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRefresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Inspirational Quote</DialogTitle>
        <div className="relative p-6">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="absolute top-0 left-0 h-8 w-8 text-primary/20 -translate-x-2 -translate-y-2"
          />
          <div className="space-y-4 pt-4">
            {quote && (
              <>
                <p className="text-xl font-serif leading-relaxed text-foreground/90">
                  {quote.quote}
                </p>
                <p className="text-sm text-muted-foreground text-right italic">
                  — {quote.author}
                </p>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <FontAwesomeIcon 
                      icon={faRotateRight} 
                      className="h-4 w-4 mr-2"
                    />
                    New Quote
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}