import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <Card className="p-12 text-center shadow-glow border-primary/30 bg-card/50 backdrop-blur-sm max-w-sm w-full">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo/Icon placeholder */}
          <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-creative">
            <span className="text-3xl font-bold text-primary-foreground">IR</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InkRealm
            </h1>
            <p className="text-muted-foreground text-sm">
              writer.musician.visual-artist.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="h-2 bg-gradient-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Loading creative content...
          </p>
        </div>
      </Card>
    </div>
  );
};