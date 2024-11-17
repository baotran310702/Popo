'use client';
import { useState } from 'react';
import ChatBox from './components/ChatBox';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewMessage = () => {
    // Handle new message notification
  };

  const handleInteraction = () => {
    // Handle interaction
  };

  return (
    <ChatBox 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => setIsOpen(false)}
      onNewMessage={handleNewMessage}
      onInteraction={handleInteraction}
    />
  );
}
