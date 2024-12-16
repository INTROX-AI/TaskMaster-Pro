import { motivationalQuotes } from './quotes-data';

export interface Quote {
  quote: string;
  author: string;
}

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}