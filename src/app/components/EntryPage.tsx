"use client";

import EvenlopeImage from "./EvenlopeImage";
import LoadingPage from "./LoadingPage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AnimatedAstronaut from './AnimatedAstronaut';

export default function EntryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const duration = 10000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setLoadingProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        router.push("/content");
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading, router]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundColor: '#fff5f7'}}>
      <AnimatedAstronaut />
      {isLoading ? (
        <LoadingPage loadingProgress={loadingProgress} />
      ) : (
        <>
          <EvenlopeImage />
          <button 
            onClick={handleClick}
            className="text-2xl text-pink-600 mt-4 px-6 py-2 
            [font-family:'Press_Start_2P',cursive] 
            [image-rendering:pixelated]
            border-4 border-pink-600
            shadow-[4px_4px_0px_0px_rgba(219,39,119,1)]
            active:shadow-[0px_0px_0px_0px_rgba(219,39,119,1)]
            active:translate-x-[4px]
            active:translate-y-[4px]
            transition-all
            hover:bg-pink-100
            bg-white">
            Click to open
          </button>
        </>
      )}
    </div>
  );
} 