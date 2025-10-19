import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MirrorViewer from "@/components/MirrorViewer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!isLoading && <MirrorViewer />}
    </>
  );
};

export default Index;
