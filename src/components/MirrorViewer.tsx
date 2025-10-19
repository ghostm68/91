import { useEffect, useState, useRef } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TARGET_URL = "https://inkrealm.info/1991";
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

const MirrorViewer = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back online", {
        description: "Content will sync automatically",
      });
      refreshContent();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Offline mode", {
        description: "Showing cached content",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Auto-refresh interval
    const interval = setInterval(() => {
      if (isOnline) {
        refreshContent();
      }
    }, REFRESH_INTERVAL);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [isOnline]);

  const refreshContent = () => {
    if (!isOnline) {
      toast.info("Offline", {
        description: "Cannot refresh while offline",
      });
      return;
    }

    setIsRefreshing(true);
    
    if (iframeRef.current) {
      iframeRef.current.src = TARGET_URL + "?t=" + Date.now();
    }

    setLastUpdate(new Date());
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Content updated");
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-current" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-primary tracking-wide">INKREALM</h1>
                <p className="text-xs text-muted-foreground">Mirror • 1991</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-primary" />
              ) : (
                <WifiOff className="w-4 h-4 text-destructive" />
              )}
              <span className="hidden sm:inline">
                {formatTime(lastUpdate)}
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={refreshContent}
              disabled={!isOnline || isRefreshing}
              className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content Viewer */}
      <div className="flex-1 relative overflow-hidden">
        {!isOnline && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 backdrop-blur-sm">
            <div className="text-center space-y-4 p-8">
              <WifiOff className="w-16 h-16 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground">Offline Mode</h2>
              <p className="text-muted-foreground max-w-md">
                You're currently offline. Please check your internet connection to view live content.
              </p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={TARGET_URL}
          className="w-full h-full border-0"
          title="InkRealm Mirror"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default MirrorViewer;
