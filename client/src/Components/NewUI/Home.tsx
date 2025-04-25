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
import store, { RootState } from "../../redux/store";
import fetchAllMessages from "../../utility/fetchAllMessages";
import stompService from "../../services/stompService";
import toast from "react-hot-toast";
import uploadFile from "../../utility/uploadFile";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserPresence } from "../../redux/actions/presenceActions";
import ChatList from "./ChatList";
import Navbar from "./Navbar";
import { addNotification } from "../../redux/reducers/notificationReducer";
import SideBarHeader from "./SideBarHeader";

const HomePage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [allChats, setAllChats] = useState<Chat[]>();
  const { token, userDTO } = useSelector((state: RootState) => state.auth);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onlineUsers = useSelector(
    (state: RootState) => state.presence.onlineUsers
  );
  const onlineUsersArray = Object.keys(onlineUsers).filter(
    (email) => onlineUsers[email]
  );
  const dispatch = useAppDispatch();

  if (token === null || token === undefined) {
    window.location.href = "/login";
    return null;
  }

  useEffect(() => {
    const connectStomp = () => {
      try {
        stompService.connect(token, () => {
          //subscribe to the presence updates (to get updates on online users)
          stompService.subscribe("/topic/presence", (message) => {
            const { email, online } = message;
            dispatch(updateUserPresence(email, online)); // Dispatch presence updates to Redux
          });
        });
      } catch (error) {
        console.error("Error connecting to STOMP:", error);
        throw error;
      }
    };

    connectStomp();
  }, [token]);

  //function to fetch messages between current and selected chat user
  const fetchMessages = async (user: string) => {
    try {
      const res: Message[] = await fetchAllMessages(token, user);
      if (res && res.length > 0) {
        setCurrentMessages(res);
        // console.log("teh current messages are", res);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //fetch message on selected chat
  useEffect(() => {
    if (allChats && selectedChatId) {
      const chat = allChats.find((c) => c.id === selectedChatId);
      if (chat) {
        setSelectedChat(chat);
        fetchMessages(chat.email);
      }
    }
  }, [selectedChatId]);

  const getAllChats = async () => {
    const res: Chat[] = await fetchAllChats(token);

    if (res && res.length > 0) {
      setAllChats(res);
    }
  };
  useEffect(() => {
    getAllChats();
  }, []);

  //send message function
  const handleSendMessage = async () => {
    if ((!messageInput.trim() && !selectedFile) || !selectedChat || !userDTO)
      return;

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
    if (!stompService.isConnected()) return;
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
    // }

    return () => {
      stompService.unsubscribe("/user/queue/messages");
    };
  }, [selectedChat]);

  //* fetch notifications
  useEffect(() => {
    if (!token) return;

    stompService.connect(token, () => {
      // subscribe to notifications topic
      stompService.subscribe("/user/queue/notifications", (payload) => {
        dispatch(
          addNotification({
            id: payload.id || Date.now().toString(),
            text: payload.message || "New Notification",
            read: payload.read || false,
          })
        );
      });
    });

    return () => {
      stompService.unsubscribe("/user/queue/notifications");
    };
  }, [token, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [currentMessages]);

  //handle file upload
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  // console.log("curent user", userDTO);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-[#f5f1e8]"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="flex h-screen max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="w-96 pr-4 py-6 flex flex-col">
            <div className="paper-container p-6 rounded-sm flex-1 flex flex-col shadow-paper">
              {/* Left Top */}
              <SideBarHeader isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

              {/* Left Mid */}
              <ChatList
                allChats={allChats}
                selectedChatId={selectedChatId}
                setSelectedChatId={setSelectedChatId}
                onlineUsersArray={onlineUsersArray}
              />

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
    </>
  );
};

export default HomePage;
