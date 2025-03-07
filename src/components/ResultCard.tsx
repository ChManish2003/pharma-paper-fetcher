
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail, Building, Calendar } from 'lucide-react';
import { ResearchPaper } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cardAnimation } from '@/lib/animations';

interface ResultCardProps {
  paper: ResearchPaper;
  index: number;
}

export function ResultCard({ paper, index }: ResultCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const nonAcademicAuthors = paper.authors.filter(author => author.isNonAcademic);
  const correspondingAuthor = paper.authors.find(author => author.isCorresponding);
  
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden"
      variants={cardAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: index * 0.05 }}
      layout
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-medium">
                ID: {paper.id}
              </Badge>
              
              {paper.journal && (
                <Badge variant="secondary" className="text-xs font-medium">
                  {paper.journal}
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-balance leading-tight">
              {paper.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>{paper.publicationDate}</span>
              </div>
              
              {correspondingAuthor?.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1.5" />
                  <span className="truncate max-w-[180px]">
                    {correspondingAuthor.email}
                  </span>
                </div>
              )}
            </div>
            
            {nonAcademicAuthors.length > 0 && (
              <div className="my-3">
                <div className="text-sm font-medium mb-1">Company Affiliations:</div>
                <div className="flex flex-wrap gap-2">
                  {nonAcademicAuthors.map((author, idx) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center px-3 py-1 bg-accent rounded-full text-xs"
                    >
                      <Building className="w-3 h-3 mr-1.5 text-primary" />
                      {author.affiliation}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-full hover:bg-accent text-muted-foreground transition-colors"
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t"
          >
            {paper.abstract && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-1">Abstract:</div>
                <p className="text-sm text-muted-foreground">{paper.abstract}</p>
              </div>
            )}
            
            <div className="mb-4">
              <div className="text-sm font-medium mb-1">All Authors:</div>
              <div className="space-y-2">
                {paper.authors.map((author, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      {author.isCorresponding && (
                        <Mail className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium">{author.name}</span>
                      <div className="text-xs text-muted-foreground">
                        {author.affiliation}
                        {author.isNonAcademic && (
                          <Badge variant="outline" className="ml-2 text-[10px]">
                            Non-Academic
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {paper.keywords && paper.keywords.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-1">Keywords:</div>
                <div className="flex flex-wrap gap-1.5">
                  {paper.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ResultCard;
