import { useState } from 'react';
import { WebViewFrame } from '@/components/WebViewFrame';
import { SplashScreen } from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <WebViewFrame 
      url="https://inkrealm.info" 
      title="InkRealm" 
    />
  );
};

export default Index;
