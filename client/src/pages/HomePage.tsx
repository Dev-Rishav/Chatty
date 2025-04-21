import { useState } from 'react';
import {
  LockClosedIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import bg2 from '../assets/bg2.webp';
import bg1 from '../assets/bg1.avif';


interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  reactions?: Record<string, number>;
  encrypted?: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp: string;
  unread?: number;
  isGroup?: boolean;
  online?: boolean;
  avatar: string;
}

const dummyChats: Chat[] = [
  {
    id: "1",
    name: "Design Team",
    lastMessage: "Let's finalize the UI design.",
    timestamp: "2025-04-20T10:30:00Z",
    unread: 2,
    isGroup: true,
    online: true,
    avatar: "https://example.com/avatar1.png",
  },
  {
    id: "2",
    name: "John Doe",
    lastMessage: "See you tomorrow!",
    timestamp: "2025-04-20T09:15:00Z",
    unread: 0,
    isGroup: false,
    online: false,
    avatar: "https://example.com/avatar2.png",
  },
  {
    id: "3",
    name: "Marketing Team",
    lastMessage: "Campaign launch is scheduled.",
    timestamp: "2025-04-19T18:45:00Z",
    unread: 5,
    isGroup: true,
    online: true,
    avatar: "https://example.com/avatar3.png",
  },
];

const dummyMessages: Message[] = [
  {
    id: "101",
    sender: "Alice",
    content: "Let's create something amazing together! 🎨",
    timestamp: "2025-04-20T10:30:00Z",
    reactions: { "👍": 2, "❤️": 1 },
    encrypted: true,
  },
  {
    id: "102",
    sender: "Bob",
    content: "Sure, I'll handle the backend integration.",
    timestamp: "2025-04-20T10:32:00Z",
    reactions: { "👍": 1 },
    encrypted: true,
  },
  {
    id: "103",
    sender: "Alice",
    content: "Great! Let's sync up later today.",
    timestamp: "2025-04-20T10:35:00Z",
    reactions: {},
    encrypted: true,
  },
];

export default function HomePage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState<Chat[]>(dummyChats); // Hardcoded chats
  const [messages, setMessages] = useState<Message[]>(dummyMessages); // Hardcoded messages
  const [isDarkMode, setIsDarkMode] = useState(false);
const [showSendMoney, setShowSendMoney] = useState(false);


return (
  <div className="min-h-screen 
   bg-[#f5f1e8]
  "
  style={{ backgroundImage: `url(${bg2})` }}
  >

    

    <div className="flex h-screen max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-96 pr-4 py-6 flex flex-col">
        <div className="paper-container p-6 rounded-sm flex-1 flex flex-col shadow-paper">
          {/* Top  Section */}
          <div className="flex items-center justify-between mb-8 border-b border-amber-900/20 pb-4">
            <h1 className="text-3xl tracking-wide font-playfair font-bold text-amber-900">
              Chatty
              <span className="text-amber-700 text-2xl ml-2">🕊️</span>
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="paper-button p-2"
              >
                {isDarkMode ? (
                  <SunIcon className="w-6 h-6 text-amber-700" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-amber-700" />
                )}
              </button>
              <button className="paper-button">
                <PlusCircleIcon className="w-7 h-7 text-amber-700" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6 ">
            <input
              type="text"
              placeholder="Search conversations.."
              className="paper-input pl-12 pr-4 py-3 font-crimson "
            />
            <MagnifyingGlassIcon className="absolute right-12 top-3.5 w-5 h-5 text-amber-700/80" />
            <DocumentTextIcon className="absolute right-4 top-3.5 w-5 h-5 text-amber-700/80" />
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="paper-card hover:bg-amber-50 transition-all cursor-pointer p-4"
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
                      <span className="text-amber-700 text-xl">📬</span>
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 rounded-full border-2 border-amber-100" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg font-playfair text-amber-900">
                        {chat.name}
                      </p>
                      <span className="text-sm text-amber-700/80">
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700/80 mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Functionality Card */}
          <div className="mt-4 paper-container  font-crimson text-xl p-4 rounded-sm shadow-paper">
            <button className="paper-menu-item">
              <Cog6ToothIcon className="w-6 h-6 mr-3 text-amber-700" />
              <span className="text-amber-900 ">Settings</span>
            </button>
            <button 
              className="paper-menu-item"
              onClick={() => setShowSendMoney(true)}
            >
              <CurrencyDollarIcon className="w-6 h-6 mr-3 text-green-700" />
              <span className="text-amber-900">Send Money</span>
            </button>
            <button className="paper-menu-item">
              <UserGroupIcon className="w-6 h-6 mr-3 text-stone-600" />
              <span className="text-amber-900">New Group</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col py-6 pl-4 ">
        {selectedChat ? (
          <div className="paper-container h-full flex flex-col rounded-sm shadow-paper">
            {/* Chat Header */}
            <div className="bg-amber-50 p-6 border-b border-amber-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
                  <span className="text-amber-700 text-xl">📨</span>
                </div>
                <div>
                  <h2 className="text-2xl tracking-wide font-playfair text-amber-900">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </h2>
                  <p className="text-sm text-amber-700/80 flex items-center">
                    <LockClosedIcon className="w-4 h-4 mr-2" />
                    Secured with wax seal
                  </p>
                </div>
              </div>
              <button className="paper-button">
                <PuzzlePieceIcon className="w-6 h-6 text-amber-700" />
              </button>
            </div>

            {/* Messages */}
            <div
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#faf8f3] bg-cover bg-center"
            style={{ backgroundImage: `url(${bg1})` }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "You" ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="paper-message max-w-md p-4 relative">
                    <div className="absolute top-2 right-2 w-4 h-4 bg-amber-100/50 rounded-full" />
                    <p className="text-amber-900 font-crimson font-medium text-lg">
                      {message.content}
                    </p>
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-sm italic font-crimson  text-amber-700/80">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      {message.encrypted && (
                        <LockClosedIcon className="w-3 h-3 text-amber-700/80"  />
                      )}
                      <div className="flex space-x-1 ml-2">
                        {message.reactions &&
                          Object.entries(message.reactions).map(
                            ([emoji, count]) => (
                              <button
                                key={emoji}
                                className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200"
                              >
                                {emoji} {count}
                              </button>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-amber-50 p-6 border-t border-amber-200">
              <div className="flex items-center space-x-4">
                <button className="paper-button">
                  <FaceSmileIcon className="w-6 h-6 text-amber-700" />
                </button>
                <input
                  type="text"
                  placeholder="Write your message..."
                  className="paper-input flex-1 py-3 px-4"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="paper-send-button">
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="paper-container h-full flex flex-col items-center justify-center rounded-sm shadow-paper bg-amber-50">
            <div className="text-center max-w-md space-y-4">
              <div className="inline-flex p-6 rounded-full bg-amber-100">
                <SparklesIcon className="w-12 h-12 text-amber-700 animate-pulse" />
              </div>
              <h2 className="text-2xl font-playfair tracking-wide text-amber-900">
                Welcome to Chatty
              </h2>
              <p className="text-amber-700/80 font-crimson text-lg">
                Begin your parchment-bound conversation.
                Messages sealed with care and tradition.
              </p>
              <button className="paper-send-button mt-6">
                Start New Chat
              </button>
            </div>
          </div>
        )}

        {/* Send Money Modal */}
        {showSendMoney && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
            <div className="paper-container p-8 rounded-sm w-[480px] relative shadow-paper-deep">
              <div className="absolute top-4 right-4 w-8 h-8 bg-red-100/50 rounded-full" />
              <h3 className="text-2xl font-serif text-amber-900 mb-6 border-b border-amber-200 pb-2">
                💰 Money Transfer
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="paper-input-label">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="paper-money-input pl-8"
                    />
                    <span className="absolute left-3 top-3 text-amber-700">$</span>
                  </div>
                </div>
                <div>
                  <label className="paper-input-label">To Recipient</label>
                  <input
                    type="text"
                    placeholder="Name or @username"
                    className="paper-input"
                  />
                </div>
                <div>
                  <label className="paper-input-label">Note</label>
                  <textarea
                    placeholder="Add a secret message..."
                    className="paper-input h-24"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowSendMoney(false)}
                  className="paper-cancel-button"
                >
                  Cancel
                </button>
                <button className="paper-send-money-button">
                  Seal & Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  </div>
);
}