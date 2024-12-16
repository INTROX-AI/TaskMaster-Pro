import { useState, useEffect } from 'react';
import { Quote } from '@/lib/types';
import { fetchRandomQuote } from '@/lib/api';

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      try {
        setIsLoading(true);
        const newQuote = await fetchRandomQuote();
        setQuote(newQuote);
        setError(null);
      } catch (err) {
        setError('Failed to fetch quote');
      } finally {
        setIsLoading(false);
      }
    };

    getQuote();
  }, []);

  return { quote, isLoading, error };
}