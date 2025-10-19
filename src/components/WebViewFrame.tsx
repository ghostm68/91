import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink, ArrowLeft } from 'lucide-react';

interface WebViewFrameProps {
  url: string;
  title: string;
}

export const WebViewFrame = ({ url, title }: WebViewFrameProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [currentUrl]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Force iframe reload by changing src
    const iframe = document.getElementById('webview-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleExternalLink = () => {
    window.open(currentUrl, '_blank');
  };

  const handleBack = () => {
    setCurrentUrl('https://inkrealm.info');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Mobile Navigation Bar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="text-primary hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
            className="text-primary hover:bg-secondary"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleExternalLink}
            className="text-primary hover:bg-secondary"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="p-8 text-center shadow-glow border-primary/20">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Loading InkRealm
              </h2>
              <p className="text-muted-foreground">
                Connecting to creative realm...
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* WebView Content */}
      <div className="flex-1 relative">
        <iframe
          id="webview-iframe"
          src={currentUrl}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-downloads"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};