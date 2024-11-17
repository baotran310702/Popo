'use client';
import { useState, useEffect } from "react";
import ContentPage from "../components/ContentPage";
import TabPage from "../components/TabPage";
import SliderPage from "../components/SliderPage";
import NavigationButtons from "../components/NavigationButtons";
import ChatBox from "../components/ChatBox";
import '../styles/chat.css';

export default function Content() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isShaked, setIsShaked] = useState(false);

  // Set initial message notification when component mounts
  useEffect(() => {
    setHasNewMessage(true);
  }, []);

  const handleMessageClick = () => {
    setIsChatOpen(!isChatOpen);
    setHasNewMessage(false);
    setIsShaked(true);
  };

  const handleNewMessage = () => {
    setHasNewMessage(true);
    setIsShaked(false);
  };

  const handleChatInteraction = () => {
    setHasNewMessage(false);
    setIsShaked(false);
  };

  return (
    <div className="content-wrapper">
      <button 
        className={`message-button ${hasNewMessage && !isShaked ? 'message-notification' : ''}`}
        onClick={handleMessageClick}
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
        {hasNewMessage && <span className="notification-dot"></span>}
      </button>

      <ChatBox 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onNewMessage={handleNewMessage}
        onInteraction={handleChatInteraction}
        setIsOpen={setIsChatOpen}
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