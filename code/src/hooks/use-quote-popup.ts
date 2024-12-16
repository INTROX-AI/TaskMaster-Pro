import { useState, useCallback } from 'react';
import { Quote, getRandomQuote } from '@/lib/quotes-service';

export function useQuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);

  const fetchQuote = useCallback(() => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
  }, []);

  const openPopup = useCallback(() => {
    setIsOpen(true);
    fetchQuote();
  }, [fetchQuote]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const refreshQuote = useCallback(() => {
    fetchQuote();
  }, [fetchQuote]);

  return {
    isOpen,
    quote,
    openPopup,
    closePopup,
    refreshQuote
  };
}