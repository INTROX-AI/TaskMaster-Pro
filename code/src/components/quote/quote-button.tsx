import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { useQuotePopup } from '@/hooks/use-quote-popup';
import { QuotePopup } from './quote-popup';

export function QuoteButton() {
  const { isOpen, quote, openPopup, closePopup, refreshQuote } = useQuotePopup();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full bg-background/95 shadow-md border border-border/50 hover:bg-primary/5 hover:scale-110 transition-all duration-300"
        onClick={openPopup}
      >
        <FontAwesomeIcon 
          icon={faLightbulb} 
          className="h-5 w-5 text-primary"
        />
      </Button>

      <QuotePopup 
        quote={quote}
        isOpen={isOpen}
        onClose={closePopup}
        onRefresh={refreshQuote}
      />
    </>
  );
}