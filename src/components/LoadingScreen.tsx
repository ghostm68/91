import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isRoaring, setIsRoaring] = useState(false);

  useEffect(() => {
    const roarTimer = setTimeout(() => {
      setIsRoaring(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(roarTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black via-cinematic-black to-black"
      >
        {/* Film grain effect */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')] animate-[film-grain_0.5s_infinite]" />
        
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(45_100%_55%_/_0.15)_0%,transparent_70%)]" />
        
        {/* MGM Shield with Lion */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isRoaring ? [1, 1.05, 1] : 1, 
              opacity: 1 
            }}
            transition={{ 
              scale: { duration: 0.5, repeat: isRoaring ? 3 : 0 },
              opacity: { duration: 0.5 }
            }}
            className="relative"
            style={{
              filter: isRoaring ? 'drop-shadow(0 0 40px hsl(45 100% 55% / 0.8))' : 'drop-shadow(0 0 20px hsl(45 100% 55% / 0.5))'
            }}
          >
            {/* Shield background */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Shield shape */}
                <path
                  d="M100 10 L160 40 L180 100 L160 160 L100 190 L40 160 L20 100 L40 40 Z"
                  fill="url(#goldGradient)"
                  stroke="hsl(45 100% 70%)"
                  strokeWidth="3"
                />
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(45 100% 65%)" />
                    <stop offset="50%" stopColor="hsl(45 100% 55%)" />
                    <stop offset="100%" stopColor="hsl(45 100% 45%)" />
                  </linearGradient>
                </defs>
                
                {/* Film ribbon */}
                <path
                  d="M60 80 Q100 70 140 80 L140 120 Q100 130 60 120 Z"
                  fill="hsl(0 0% 5%)"
                  opacity="0.3"
                />
                
                {/* Lion head silhouette */}
                <circle cx="100" cy="100" r="35" fill="hsl(0 0% 5%)" opacity="0.7" />
                <circle cx="90" cy="95" r="3" fill="hsl(45 100% 70%)" />
                <circle cx="110" cy="95" r="3" fill="hsl(45 100% 70%)" />
                <path
                  d="M100 105 Q95 110 90 108 M100 105 Q105 110 110 108"
                  stroke="hsl(45 100% 70%)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Mane rays */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180);
                  const x1 = 100 + Math.cos(angle) * 35;
                  const y1 = 100 + Math.sin(angle) * 35;
                  const x2 = 100 + Math.cos(angle) * 45;
                  const y2 = 100 + Math.sin(angle) * 45;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(0 0% 5%)"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <h1 className="text-4xl font-bold text-primary mb-2 tracking-wider">
              INKREALM
            </h1>
            <p className="text-sm text-muted-foreground tracking-[0.3em] uppercase">
              Mirror • 1991
            </p>
          </motion.div>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Film strip borders */}
        <div className="absolute left-0 top-0 bottom-0 w-8 border-l-4 border-r-4 border-primary/20 bg-black/50">
          <div className="flex flex-col h-full justify-around py-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-full h-3 bg-primary/10" />
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 border-l-4 border-r-4 border-primary/20 bg-black/50">
          <div className="flex flex-col h-full justify-around py-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-full h-3 bg-primary/10" />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
