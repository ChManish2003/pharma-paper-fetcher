
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/animations';

interface ExportButtonProps {
  onExport: () => void;
  disabled?: boolean;
}

export function ExportButton({ onExport, disabled = false }: ExportButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-10"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.7 }}
    >
      <Button
        onClick={onExport}
        disabled={disabled}
        className="rounded-full shadow-elevation w-14 h-14 p-0 flex items-center justify-center relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="sr-only">Export to CSV</span>
        <Download className="w-5 h-5" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-primary"
          initial={{ y: 60 }}
          animate={{ y: isHovered ? 0 : 60 }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 30 
          }}
        >
          <Download className="w-5 h-5 text-primary-foreground" />
        </motion.div>
      </Button>
      
      <motion.div
        className="absolute -top-10 right-0 bg-foreground text-white text-sm px-3 py-1.5 rounded shadow-md"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10, 
          scale: isHovered ? 1 : 0.9 
        }}
        transition={{ duration: 0.2 }}
      >
        Export to CSV
        <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-foreground rotate-45"></div>
      </motion.div>
    </motion.div>
  );
}

export default ExportButton;
