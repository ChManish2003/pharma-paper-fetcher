
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <motion.header
      className={cn(
        "w-full py-8 relative z-10 overflow-hidden",
        "flex flex-col items-center justify-center"
      )}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <motion.div 
        className="container max-w-4xl px-6 text-center"
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        <motion.div 
          className="inline-block mb-3 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Pharmaceutical Paper Fetcher
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          Research Paper Search
        </motion.h1>
        
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          Search for research papers with authors affiliated with pharmaceutical or biotech companies
        </motion.p>
      </motion.div>
    </motion.header>
  );
}

export default Header;
