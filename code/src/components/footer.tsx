import { Link } from '@/components/ui/link';

const AUTHOR_URL = "https://github.com/INTROX-AI";
const AUTHOR_NAME = "INTROX";

export function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 py-2 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2">
          Made with ❤️ by{' '}
          <Link 
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            {AUTHOR_NAME}
          </Link>
        </p>
      </div>
    </div>
  );
} 