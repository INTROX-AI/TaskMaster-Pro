export async function fetchRandomQuote() {
  try {
    const response = await fetch('https://zenquotes.io/api/random', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    return {
      ...data[0],
      q: data[0].q,
      a: data[0].a,
      h: data[0].h
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
}