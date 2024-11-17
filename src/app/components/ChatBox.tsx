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
  onNewMessage: () => void;
  onInteraction: () => void;
  setIsOpen: (isOpen: boolean) => void;
}



// Predefined messages list
const BOT_MESSAGES = {
  INITIAL: "Hiii, em bé, ngày cụa emm hnayy thế nào dza. Coá chiện gì buần vui thì nói anh nghe với nhaaa",
  RESPONSES: [
    "Hì, bíc òiii, cho dù là mệt mỏi hay là vui vẻ, thì cũmm hong nói cho anh.",
    "Nhmaaa anh mún kể chiệnnnnnnnnnnnn",
    "Hong mún nghe, cũmm hong thèm nghe, thì thuiii, anh vẫn cứ kể đấyyy, nàm gì đcccc",
    "Coá một thằng cu, yêu cô gáiii đó, òii tỏ tìnnn, hôm sauuu dc cổ chấpp nhậnnnn, ý là phải voice cơơơơơơơơơơ",
    "Cu cậu đoá iu cổ lắmmmm....",
    "Cu cậu đó lo lắng cho cổ, ăn gì chưa, nghỉ ngơiii chưa, nàm việc mệt nắm mà đúng honggg?",
    "Cu cậu đó si nghĩ về cổ, hong quan tâm ngày đêmm, nắng mưaaa, cố gắng chiều chuộng cổ hét sức có thể, như công chúa của cu đóooo...",
    "Cu cậu đó iu nhìuu quá, đến mức có nhiều si nghĩ bao biện tới ngu siiiii...............",
    "Ý nàaaaa, anh coá một câu hỏiii nèk...............",
    "Nếu coá ngừiii iu emm như z, emm sẽ đối xử với họ như nàooooooo",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Có người vì đau lòng mà rời đi....",
    "Có người sau khi người ta rời đi rồi mới cảm thấy đau lòng....  💔",
    "",
  ],
  RESPONSE_ICON: [
    "🥰",
    "😊",
    "💝",
    "💬",
    "💕",
    "💞",
    "💖",
    "💗",
    "💓",
    "💟",
    "😈",
    "😏",
    "🫦",
    "👀",
    "🥵",
    "😋",
    "🤤",
    "🤭",
    "🤫",
    "🤥",
    "🤠",
    "🤡",
    "🤢",
  ],

};

// Add this near the BOT_MESSAGES constant
const HIDDEN_MESSAGES = [
  "Em ơi, anh có điều muốn nói...",
  "Anh buồn với mệt quá ak...",
  "Than vãn hơi nhìu nhỉ... ý là... anh hong hỉu sao... nàm với cố nz rùi... mà em vẫn buần í...",
  "Hong phải anh hong thấy re-up của em trên toàn bộ nik tiktok đâu...",
  "Hong phải anh hong thấy các note, các bio trên fb, ig và cả threads đâu...",
  "Anh xin lỗi... nhiều lúc làm em buồn rùi...",
  "Có thể cố gắng cùng nhau nữa không... có thể tiếp tục nổi nữa không... khi mà một người luôn cố gắng, thứ họ luôn nhận lại là những phủ nhận, những hành động như vậy...",
  "Anh đã suy nghĩ hồi lâu... nghĩ lại từ ngày đầu ta gặp nhau tới bây giờ... lục tung hàng trăm ký ức... để tìm lại những lý do để tiếp tục....",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ h���i lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu...",
  "Anh đã suy nghĩ hồi lâu... em vẫn tiếp tục đợi tin nhắn chứ...",
  "ERR!404 - Not found 💔",
];

export default function ChatBox({ isOpen, onClose, onNewMessage, onInteraction, setIsOpen }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [autoMessageStarted, setAutoMessageStarted] = useState(false);
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

  // Add this function to start the hidden messages sequence
  const startHiddenMessages = async () => {
    setAutoMessageStarted(true);
    if (setIsOpen) {
      setIsOpen(true);
    }
    setHasUnread(true);

    // Clear existing messages and send initial message
    setMessages([{
      text: BOT_MESSAGES.INITIAL,
      timestamp: new Date(),
      isSender: false
    }]);

    // Wait for 2 seconds before starting hidden messages
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Send each hidden message with delay
    for (let i = 0; i < HIDDEN_MESSAGES.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setMessages(prev => [...prev, {
        text: HIDDEN_MESSAGES[i],
        timestamp: new Date(),
        isSender: false
      }]);
      onNewMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { 
        text: inputText, 
        timestamp: new Date(),
        isSender: true
      }]);
      setInputText('');
      
      const currentCount = messageCount + 1;
      setMessageCount(currentCount);
      
      setTimeout(() => {
        const responseIndex = (currentCount - 1) % BOT_MESSAGES.RESPONSES.length;
        const responseText = currentCount > BOT_MESSAGES.RESPONSES.length ? "Cảm ơn em..." : BOT_MESSAGES.RESPONSES[responseIndex];
        const iconIndex = (currentCount - 1) % BOT_MESSAGES.RESPONSE_ICON.length;
        const responseIcon = BOT_MESSAGES.RESPONSE_ICON[iconIndex];  
        
        setMessages(prev => [...prev, {
          text: responseText + responseIcon,
          timestamp: new Date(),
          isSender: false
        }]);
        onNewMessage();
      }, 2000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInteraction();
    setInputText(e.target.value);
  };

  const handleChatBoxClick = () => {
    onInteraction();
    scrollToBottom();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Add Start Hidden Messages button */}
      {/* {!autoMessageStarted && (
        <button
          onClick={startHiddenMessages}
          className="fixed bottom-[120px] right-[52px] bg-rose-500 text-white 
            px-4 py-2 rounded-full z-[1002] hover:bg-rose-600 transition-colors"
        >
          Start Story
        </button>
      )}
       */}
      {/* Message Button with Notification */}
      {!isOpen && hasUnread && (
        <div className="fixed bottom-[52px] right-[52px] bg-red-500 text-white 
          w-5 h-5 rounded-full flex items-center justify-center text-xs z-[1002]">
          1
        </div>
      )}
      
      <div className={`fixed right-0 bottom-0 w-96 h-[600px] bg-white shadow-lg 
        flex flex-col rounded-3xl mr-12 transition-all duration-300 z-50 
        ${isOpen ? 'mb-10 translate-y-0' : 'mb-0 translate-y-full'}`}>
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
          <div 
            className="flex items-center gap-2 bg-rose-50 rounded-full px-4 py-2 border border-rose-100 cursor-text"
            onClick={(e) => {
              const input = e.currentTarget.querySelector('input');
              if (input) {
                input.focus();
              }
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={handleInput}
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