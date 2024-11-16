'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface Message {
  text: string;
  timestamp: Date;
  isSender: boolean;
}

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

// Predefined messages list
const BOT_MESSAGES = {
  INITIAL: "Hello, how is your day now? I am here to listen to you.",
  RESPONSES: [
    "Oh, I understand, that must be a hard and tired day, so don't worry, I still here.(*＾ω＾*)",
    "No matter what you say, I will told you a story. (≧ ◡ ≦)",
    "There is a story about a girl who loves a boy so much, one day the boy asked the girl to marry him, the girl said yes. Wowowowow(* ^ ω ^)",
    "And they lived happily ever after, moa moa,(*＾ω＾*)",
  ]
};

export default function ChatBox({ isOpen, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle first open
  useEffect(() => {
    if (isOpen && isFirstOpen) {
      setIsFirstOpen(false);
      setHasUnread(false);
      setMessages([{
        text: BOT_MESSAGES.INITIAL,
        timestamp: new Date(),
        isSender: false
      }]);
    }
  }, [isOpen, isFirstOpen]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { 
        text: inputText, 
        timestamp: new Date(),
        isSender: true
      }]);
      setInputText('');
      
      // Get next response from the list
      const currentCount = messageCount + 1;
      setMessageCount(currentCount);
      
      setTimeout(() => {
        // Get response from list, cycling through responses
        const responseIndex = (currentCount - 1) % BOT_MESSAGES.RESPONSES.length;
        const responseText = BOT_MESSAGES.RESPONSES[responseIndex];

        setMessages(prev => [...prev, {
          text: responseText,
          timestamp: new Date(),
          isSender: false
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Message Button with Notification */}
      {!isOpen && hasUnread && (
        <div className="fixed bottom-[52px] right-[52px] bg-red-500 text-white 
          w-5 h-5 rounded-full flex items-center justify-center text-xs z-[1002]">
          1
        </div>
      )}
      
      <div className={`fixed right-0 bottom-0 w-96 h-[600px] bg-white shadow-lg 
        flex flex-col rounded-3xl mr-12 transition-all duration-300 z-50 ${
          isOpen ? 'mb-10 translate-y-0' : 'mb-0 translate-y-full'
        }`}>
        <div className="flex items-center px-4 py-3 bg-white border-b rounded-t-3xl">
          <div className="flex items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-rose-200 mr-3"></div>
            <div className="flex items-center">
              <div>
                <h3 className="font-semibold text-gray-800">blue_love</h3>
                <span className="text-xs text-rose-500">Active now</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
            </div>
          </div>
          <button 
            className="text-rose-400 hover:text-rose-600 text-2xl leadi ng-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-rose-50 scrollbar-thin scrollbar-thumb-rose-200 
          hover:scrollbar-thumb-rose-300 scrollbar-track-transparent scroll-smooth">
          {messages.length === 0 ? (
            <div className="text-rose-400 text-center mt-8">
              Send a message to start the conversation...
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={index} 
                  className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${
                    message.isSender 
                      ? 'bg-rose-400 text-white rounded-3xl rounded-br-lg' 
                      : 'bg-white text-gray-800 rounded-3xl rounded-bl-lg shadow-sm'
                  } px-4 py-2 transition-all duration-200 ease-out`}>
                    <p>{message.text}</p>
                    <span className={`text-xs ${
                      message.isSender ? 'text-rose-100' : 'text-rose-300'
                    } block mt-1`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t rounded-b-3xl">
          <div className="flex items-center gap-2 bg-rose-50 rounded-full px-4 py-2 border border-rose-100">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-rose-300"
            />
            <button
              onClick={handleSendMessage}
              className={`text-rose-500 font-semibold hover:text-rose-600 ${!inputText.trim() && 'opacity-50'}`}
              disabled={!inputText.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 