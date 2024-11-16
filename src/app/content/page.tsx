'use client';
import { useState } from "react";
import ContentPage from "../components/ContentPage";
import TabPage from "../components/TabPage";
import SliderPage from "../components/SliderPage";
import NavigationButtons from "../components/NavigationButtons";
import ChatBox from "../components/ChatBox";

export default function Content() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="content-wrapper">
      <button 
        className="message-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <ChatBox 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <div className="content-layout no-gap">
        <NavigationButtons />
        <div className="top-section">
          <TabPage position="left" />
          <ContentPage />
          <TabPage position="right" />
        </div>
        <SliderPage />
      </div>
    </div>
  );
} 