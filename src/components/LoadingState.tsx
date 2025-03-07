
import { motion } from 'framer-motion';

export function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-card rounded-xl overflow-hidden shadow-subtle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <div className="flex gap-2 mb-4">
                    <div className="h-5 w-16 bg-gray-200 animate-shimmer rounded-full" 
                      style={{ backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundSize: '800px 104px' }}
                    />
                    <div className="h-5 w-24 bg-gray-200 animate-shimmer rounded-full" 
                      style={{ backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundSize: '800px 104px' }}
                    />
                  </div>
                  
                  <div className="h-7 w-3/4 bg-gray-200 animate-shimmer rounded mb-3" 
                    style={{ backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundSize: '800px 104px' }}
                  />
                  
                  <div className="flex gap-4 mb-4">
                    <div className="h-4 w-32 bg-gray-200 animate-shimmer rounded" 
                      style={{ backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundSize: '800px 104px', animationDelay: '0.1s' }}
                    />
                    <div className="h-4 w-48 bg-gray-200 animate-shimmer rounded" 
                      style={{ backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundSize: '800px 104px', animationDelay: '0.2s' }}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {[...Array(2)].map((_, j) => (
                      <div
                        key={j}
                        className="h-6 w-32 bg-gray-200 animate-shimmer rounded-full"
                        style={{ backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)', backgroundSize: '800px 104px', animationDelay: `${0.3 + j * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LoadingState;
