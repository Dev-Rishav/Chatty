import { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import bg2 from "../../assets/bg2.webp";
import bg1 from "../../assets/bg1.avif";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import SendMoneyModal from "./SendMoneyModal";
import { Chat, Message } from "../../interfaces/types";
import fetchAllChats from "../../utility/fetchAllChats";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import fetchAllMessages from "../../utility/fetchAllMessages";
import stompService from "../../services/stompService";
import toast from "react-hot-toast";
import uploadFile from "../../utility/uploadFile";

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

const HomePage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [allChats, setAllChats] = useState<Chat[]>(); 
  const { token, userDTO } = useSelector((state: RootState) => state.auth);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  if (token === null || token === undefined) {
    window.location.href = "/login";
    return null;
  }

  //function to fetch messages between current and selected chat user
  const fetchMessages = async (user: string) => {
    try {
      const res: Message[] = await fetchAllMessages(token, user);
      if (res && res.length > 0) {
        setCurrentMessages(res);
        // console.log("teh current messages are", res);
      }
      //!handle the case when no messages are found(empty state)
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //fetch message on selected chat
  useEffect(() => {
    if (allChats && selectedChatId) {
      const chat = allChats.find((c) => c.id === selectedChatId); //!idhar
      if (chat) {

        setSelectedChat(chat);
        fetchMessages(chat.email);
      }
      //api call to get messages
      //   const currentMessages = selectedChatId ? dummyMessages : [];
      console.log("Selected chat:", selectedChat, "selectedChatId:", selectedChatId, "chat",chat );
    }
    // console.log("Selected chat:", selectedChat); slect chat is null, chat ko dekh
    
    
  }, [selectedChatId]);

  const getAllChats = async () => {
    const res: Chat[] = await fetchAllChats(token);
    // console.log("All chats:", res);
    
    if (res && res.length > 0) {
      setAllChats(res);
    }
  };
  useEffect(() => {
    getAllChats();
  }, []);

  //send message function
  const handleSendMessage = async () => {
    if ((!messageInput.trim() && !selectedFile) || !selectedChat || !userDTO) return;
  
    const pushMessageToUI = (fileUrl: string | null = null) => {
      const messageToSend: Message = {
        id: Date.now(),
        content: messageInput,
        from: userDTO.email,
        to: selectedChat.email,
        timestamp: new Date().toISOString(),
        fileUrl: fileUrl || undefined,
      };
  
      setCurrentMessages((prev) => [...prev, messageToSend]);
      setMessageInput("");
      setSelectedFile(null);
    };
  
    const payload: any = {
      to: selectedChat.email,
      from: userDTO.email,
      content: messageInput || "", // fallback to empty string if file only
    };
  
    if (selectedFile) {
      try {
        const data = await uploadFile(selectedFile, token);
        payload.fileUrl = data.url;
        stompService.send("/app/private-message", payload);
        pushMessageToUI(data.url);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    } else {
      stompService.send("/app/private-message", payload);
      pushMessageToUI();
    }
  };
  


  //event listeners for new messages
  useEffect(() => {
    if (!stompService.isConnected()) {
      stompService.connect(token, () => {
        stompService.subscribe("/user/queue/messages", (payload: any) => {
          console.log("Message received:", payload);
          console.log("payload from:", payload.from," selectedChat email:", selectedChat?.email);
          
          if (payload.from === selectedChat?.email) {
            console.log("adadadadacacadad");
            
            setCurrentMessages((prevMessages) => {
              const message: Message = {
                id: Date.now(), // Temporary ID until the backend sends a real one
                content: payload.content,
                from: payload.from,
                to: payload.to,
                timestamp: payload.timestamp,
                fileUrl: payload.fileUrl ? payload.fileUrl : null,
                reactions: payload.reactions ? payload.reactions : {},
                encrypted: payload.encrypted ? payload.encrypted : false,
              };
              console.log("Message received and bindec:", message);
              return [...(prevMessages || []), message];
            });
          }
        });
      });
    } else {
      stompService.subscribe("/user/queue/messages", (payload: any) => {
        if (payload.from === selectedChat?.email) {
          //bind it with the current message only if the sender is the current receiver
          setCurrentMessages((prevMessages) => {
            const message: Message = {
              id: Date.now(), // Temporary ID until the backend sends a real one
              content: payload.content,
              from: payload.from,
              to: payload.to,
              timestamp: new Date().toISOString(),
              fileUrl: payload.fileUrl ? payload.fileUrl : null,
              reactions: payload.reactions ? payload.reactions : {},
              encrypted: payload.encrypted ? payload.encrypted : false,
            };
            console.log("Message received:", message);
            return [...(prevMessages || []), message];
          });
        }
        // const message = JSON.parse(payload.body);
        toast.success("💬 Got message:", payload.content);
      });
    }

    return () => {
      stompService.unsubscribe("/user/queue/messages");
    };
  }, [selectedChat]);

  const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
  
  useEffect(scrollToBottom, [currentMessages]);


  //handle file upload
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };  
  




  return (
    <div
      className="min-h-screen bg-[#f5f1e8]"
      style={{ backgroundImage: `url(${bg2})` }}
    >
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
              {allChats &&
                allChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`paper-card hover:bg-amber-50 transition-all cursor-pointer p-4 ${
                      selectedChatId === chat.id ? "bg-amber-100" : ""
                    }`}
                    onClick={() => setSelectedChatId(chat.id)
                    }
                  
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
                )
              )}
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
                <div ref={messagesEndRef} />
              </div>
              <MessageInput
                value={messageInput}
                onChange={setMessageInput}
                onSend={handleSendMessage}
                onFileSelect={handleFileSelect}
              />
            </div>
          ) : (
            <EmptyState onNewChat={() => setSelectedChatId(1)} />
          )}
          <SendMoneyModal
            show={showSendMoney}
            onClose={() => setShowSendMoney(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
