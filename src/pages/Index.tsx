
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useSearch } from '@/hooks/useSearch';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ResultsList from '@/components/ResultsList';
import LoadingState from '@/components/LoadingState';
import ExportButton from '@/components/ExportButton';

const Index = () => {
  const { searchParams, results, search, loadMore, exportToCsv } = useSearch();
  const [initialLoad, setInitialLoad] = useState(true);

  // Initial empty search to load some results
  useEffect(() => {
    search({ query: '' });
    
    // Simulate initial loading state for better UX
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    search({ query });
  };

  const showLoading = initialLoad || (results.isLoading && searchParams.page === 1);
  const showResults = !initialLoad && (!results.isLoading || searchParams.page > 1);
  const hasResults = results.papers.length > 0;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-accent/50 to-background pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-[300px] bg-gradient-to-t from-accent/20 to-background pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <motion.div
        className="relative z-10 py-6 min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        
        <div className="py-6">
          <SearchBar 
            onSearch={handleSearch} 
            initialQuery={searchParams.query} 
            isLoading={results.isLoading} 
          />
        </div>
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {showLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingState />
              </motion.div>
            )}
            
            {showResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ResultsList 
                  papers={results.papers}
                  isLoading={results.isLoading && searchParams.page > 1}
                  hasMore={results.hasMore}
                  total={results.total}
                  loadMore={loadMore}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <ExportButton 
          onExport={exportToCsv} 
          disabled={!hasResults}
        />
      </motion.div>
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
