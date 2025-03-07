
import { motion, AnimatePresence } from 'framer-motion';
import { ResearchPaper } from '@/types';
import ResultCard from './ResultCard';
import { staggerContainer } from '@/lib/animations';

interface ResultsListProps {
  papers: ResearchPaper[];
  isLoading: boolean;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
}

export function ResultsList({ papers, isLoading, hasMore, total, loadMore }: ResultsListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">
      {papers.length > 0 && (
        <div className="text-sm text-muted-foreground mb-6">
          Showing {papers.length} of {total} results
        </div>
      )}
      
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="popLayout">
          {papers.map((paper, index) => (
            <ResultCard key={paper.id} paper={paper} index={index} />
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="py-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        
        {!isLoading && papers.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-muted-foreground">No results found. Try a different search query.</p>
          </motion.div>
        )}
        
        {!isLoading && hasMore && papers.length > 0 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={loadMore}
              className="px-6 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
            >
              Load more results
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-10 w-10">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-primary"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-background"></div>
        </div>
      </div>
    </div>
  );
}

export default ResultsList;
