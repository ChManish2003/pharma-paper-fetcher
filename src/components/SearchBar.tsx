
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, HelpCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, initialQuery = '', isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto px-6 relative z-10"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      transition={{ delay: 0.5 }}
    >
      <form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="glass-bg rounded-2xl shadow-subtle overflow-hidden flex items-center transition-all duration-300 focus-within:shadow-elevation">
          <div className="flex-grow flex items-center pl-4">
            <Search className="w-5 h-5 text-muted-foreground mr-2 flex-shrink-0" />
            
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for papers, authors, or keywords..."
              className="w-full py-4 px-2 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
            
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors duration-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Search help"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-2 p-1 text-sm">
                  <p className="font-medium">Search Syntax Examples:</p>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li><code>"exact phrase"</code> - Search for exact phrase</li>
                    <li><code>author:smith</code> - Search by author</li>
                    <li><code>company:pfizer</code> - Search by company</li>
                    <li><code>2020..2023</code> - Date range</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            type="submit"
            className="m-2 px-6" 
            disabled={!query.trim() || isLoading}
          >
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default SearchBar;
