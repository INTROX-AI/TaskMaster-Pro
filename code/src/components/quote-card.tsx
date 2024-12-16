import { useQuote } from '@/hooks/use-quote';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

export function QuoteCard() {
  const { quote, isLoading, error } = useQuote();

  if (error) return null;
  if (isLoading) return null;

  return (
    <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg">
      <div className="flex gap-4">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="h-8 w-8 text-primary/40 flex-shrink-0"
        />
        <div className="space-y-2">
          <p className="text-lg font-medium italic text-foreground/90">
            {quote?.q}
          </p>
          <p className="text-sm text-muted-foreground text-right">
            — {quote?.a}
          </p>
        </div>
      </div>
    </Card>
  );
}