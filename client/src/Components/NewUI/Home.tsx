import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import bg2 from '../../assets/bg2.webp';
import bg1 from '../../assets/bg1.avif';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import EmptyState from './EmptyState';
import SendMoneyModal from './SendMoneyModal';
import { Chat,Message } from '../../interfaces/types';
import fetchAllChats from '../../utility/fetchAllChats';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import fetchAllMessages from '../../utility/fetchAllMessages';



// const dummyChats: Chat[] = [
//   {
//     id: 1",
//     name: "Design Team",
//     lastMessage: "Let's finalize the UI design.",
//     timestamp: "2025-04-20T10:30:00Z",
//     unread: 2,
//     isGroup: true,
//     online: true,
//     avatar: "https://example.com/avatar1.png",
//   },
//   {
//     id: "2",
//     name: "John Doe",
//     lastMessage: "See you tomorrow!",
//     timestamp: "2025-04-20T09:15:00Z",
//     unread: 0,
//     isGroup: false,
//     online: false,
//     avatar: "https://example.com/avatar2.png",
//   },
//   {
//     id: "3",
//     name: "Marketing Team",
//     lastMessage: "Campaign launch is scheduled.",
//     timestamp: "2025-04-19T18:45:00Z",
//     unread: 5,
//     isGroup: true,
//     online: true,
//     avatar: "https://example.com/avatar3.png",
//   },
// ];

const dummyMessages: Message[] = [
  {
    id: 1101,
    from: "Alice",
    to: "Bob",
    content: "Let's create something amazing together! 🎨",
    timestamp: "2025-04-20T10:30:00Z",
    reactions: { "👍": 2, "❤️": 1 },
    encrypted: true,
  },
  {
    id: 102,
    from: "Bob",
    to: "Alice",
    content: "Sure, I'll handle the backend integration.",
    timestamp: "2025-04-20T10:32:00Z",
    reactions: { "👍": 1 },
    encrypted: true,
  },
  {
    id: 103,
    from: "Alice",
    to: "Bob",
    content: "Great! Let's sync up later today.",
    timestamp: "2025-04-20T10:35:00Z",
    reactions: {},
    encrypted: true,
  },
];

const  HomePage:React.FC = ()=> {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [chats, setChats] = useState<Chat[]>(); // Hardcoded chats
  const {token}=useSelector((state:RootState)=>state.auth)
  if(token ===null || token === undefined){
    window.location.href = '/login'
    return null
  }

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

    //function to fetch messages between current and selected chat user
    const fetchMessages = async (user:string) => {
      try {
        const res:Message[] = await fetchAllMessages(token,user);
        if (res && res.length > 0) {
          setCurrentMessages(res);
          console.log("teh current messages are",res);
          
        }
        //!handle the case when no messages are found(empty state)
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    useEffect(() => {   //!kaam kar ispe
  if(chats) {
    const chat=chats.find(c => c.id === selectedChatId)
    if(chat){
      setSelectedChat(chat)
      fetchMessages(chat.email)
    }
    //api call to get messages
//   const currentMessages = selectedChatId ? dummyMessages : [];
  }
}, [selectedChatId,chats]);
  

  const getAllChats=async()=>{
    const res:Chat[]=await fetchAllChats(token);
    if(res && res.length>0){
        setChats(res);
    }
  }

  useEffect(() => {
    getAllChats();
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]" style={{ backgroundImage: `url(${bg2})` }}>
      <div className="flex h-screen max-w-7xl mx-auto">


        {/* Left Sidebar */}
        <div className="w-96 pr-4 py-6 flex flex-col">
          <div className="paper-container p-6 rounded-sm flex-1 flex flex-col shadow-paper">
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

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search conversations.."
                className="paper-input pl-12 pr-4 py-3 font-crimson"
              />
              <MagnifyingGlassIcon className="absolute right-12 top-3.5 w-5 h-5 text-amber-700/80" />
              <DocumentTextIcon className="absolute right-4 top-3.5 w-5 h-5 text-amber-700/80" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 ">
              {chats && chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`paper-card hover:bg-amber-50 transition-all cursor-pointer p-4 ${
                    selectedChatId === chat.id ? 'bg-amber-100' : ''
                  }`}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                    
                  {/* Chat item content */}

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
                        {chat.username}
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


              {/*Left Bottom */}
            <div className="mt-4 paper-container font-crimson text-xl p-4 rounded-sm shadow-paper">
              <button className="paper-menu-item">
                <Cog6ToothIcon className="w-6 h-6 mr-3 text-amber-700" />
                <span className="text-amber-900">Settings</span>
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
        <div className="flex-1 flex flex-col py-6 pl-4">
          {selectedChat ? (
            <div className="paper-container h-full flex flex-col rounded-sm shadow-paper">
              <ChatHeader chat={selectedChat} />
              <div
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#faf8f3] bg-cover bg-center"
                style={{ backgroundImage: `url(${bg1})` }}
              >
                {currentMessages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
              <MessageInput
                value={messageInput}
                onChange={setMessageInput}
                onSend={handleSendMessage}
              />
            </div>
          ) : (
            <EmptyState onNewChat={() => setSelectedChatId(1)} />
          )}
          <SendMoneyModal show={showSendMoney} onClose={() => setShowSendMoney(false)} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;