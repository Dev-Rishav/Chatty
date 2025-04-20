import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuPaperclip } from "react-icons/lu";
import { IoSendSharp } from "react-icons/io5";
import { format } from 'date-fns';
import { Avatar } from '@mui/material';
import chatBackgroundSvg from '../assets/chatBG2.svg';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ReceiverObj } from '../interfaces/types';
import {Message} from '../interfaces/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import fetchAllMessages from '../utility/fetchAllMessages';
import { formatDistanceToNow } from "date-fns";
import stompService from '../services/stompService';
import toast from 'react-hot-toast';


const Chat: React.FC = () => {
    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[] | null>([]);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const currentUser=useSelector((state:RootState) => state.auth.userDTO);
    const token=useSelector((state:RootState)=>state.auth.token);
    if(token===null || currentUser===null){
        console.log("Token not found");
        navigate("/auth");
        return;
    }

    //store state
    const receiverObj: ReceiverObj = {
        receiverProfileImg: location.state?.profile_image,
        receiverUsername: location.state?.username,
        receiverId: location.state?.id,
    };

    //chat history
    const fetchPreviousMessages = async () => {
        try {
          const msgArray: Message[] | null = await fetchAllMessages(token, receiverObj.receiverId);
          setMessages(msgArray);
        //   console.log("Messages:", JSON.stringify(msgArray, null, 2));
        //   console.log("Receiver ID:", msgArray[0]?.receiver);
          
        } catch (error) {
          console.error("❌ Failed to fetch messages:", error);
        }
      };

    useEffect(() => {
        fetchPreviousMessages();
    },[receiverObj.receiverId]);

    // console.log(receiverObj);
    
    //send message
    const sendMessage = async () => {
        // Implement send message logic here
        if (newMessage.trim() === "" ) return;
        stompService.send("/app/private-message", {
            content: newMessage,
            to: receiverObj.receiverId,
        });
        setNewMessage("");
        setFile(null);
        const messageToSend: Message = {
            id: Date.now(), // Temporary ID until the backend sends a real one
            content: newMessage,
            from: currentUser.email,
            to: receiverObj.receiverId,
            timestamp: new Date().toISOString(),
          };
          setMessages((prevMessages) => [...prevMessages,messageToSend]);

    };

    //event listeners for new messages
    useEffect(() => {
      
        if (!stompService.isConnected()) {
          stompService.connect(token, () => {
            stompService.subscribe("/user/queue/messages", (payload:any) => {
            console.log("Message received:", payload);
            if(payload.from === receiverObj.receiverId){ 
            setMessages((prevMessages) => {
                const message: Message = {
                    id: Date.now(), // Temporary ID until the backend sends a real one
                    content: payload.content,
                    from: payload.from,
                    to: payload.to,
                    timestamp: new Date().toISOString(),
                };
                // console.log("Message received:", message);
                return [...(prevMessages || []), message];

            });
        }
            });
        
          });
        } else {
          stompService.subscribe("/user/queue/messages", (payload:any) => {
            if(payload.from === receiverObj.receiverId){    //bind it with the current message only if the sender is the current receiver
            setMessages((prevMessages) => {
                const message: Message = {
                    id: Date.now(), // Temporary ID until the backend sends a real one
                    content: payload.content,
                    from: payload.from,
                    to: payload.to,
                    timestamp: new Date().toISOString(),
                };
                console.log("Message received:", message);
                return [...(prevMessages || []), message];


            });     
        }      
            // const message = JSON.parse(payload.body);
            toast.success("💬 Got message:",payload.content);
          });
        }
      
        return () => {
          stompService.unsubscribe("/user/queue/messages");
        };
      }, []);
      



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col h-screen'>
            <Navbar
                title={receiverObj}
                showSidebarToggle={true}
                onSidebarToggle={() => setShowSidebar(!showSidebar)}
                className="sticky top-0 z-20"
            />
            <div className="flex flex-1 overflow-hidden">
                <div className={`transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out fixed z-10 inset-y-0 left-0 w-80 bg-gray-800 text-white`}>
                    <Sidebar />
                </div>
                <div className={`flex flex-col ${showSidebar ? 'ml-80' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
                    <div className='flex-1 relative overflow-hidden'>
                        <div
                            className='absolute inset-0 z-0 opacity-10 blur-sm'
                            style={{
                                backgroundImage: `url(${chatBackgroundSvg})`,
                                backgroundRepeat: 'repeat',
                                backgroundSize: '400px 300px',
                                opacity: 0.5,
                            }}
                        ></div>
                        {/* chat block */}
                        <div className='relative z-20 h-full overflow-y-auto p-4 scroll-smooth '>
                        {(!messages || messages.length === 0) ? (
        <p className="text-center text-gray-700 italic mt-4 ">Start a conversation...</p>
                            ):(
                            <>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex items-start mb-4 ${msg.from === currentUser?.email ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <Avatar
                                        src={(msg.from === currentUser?.email ? currentUser?.ProfilePic : receiverObj.receiverProfileImg) || 'default-avatar-url.jpg'}
                                        alt={msg.from}
                                        className={`w-8 h-8 ${msg.from === currentUser?.email ? 'ml-2' : 'mr-2'}`}
                                    />
                                    <div className={`max-w-[50%] ${msg.from === currentUser?.email ? 'bg-cyan-200 text-gray-700' : 'bg-slate-600 text-gray-200'} rounded-lg p-3 shadow-lg`}>
                                        <p className="font-semibold mb-1 ">
                                            {msg.from === currentUser?.email ? currentUser?.username : receiverObj.receiverUsername}
                                            <span className="text-xs ml-2">
                                            {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                                            </span>
                                        </p>
                                        <p className=''>{msg.content}</p>
                                        {msg.fileUrl && <img src={msg.fileUrl} alt="file" className="mt-2" />}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                            </>)}
                        </div>
                    </div>

                      {/* send message box      */}
                    <div className='relative z-20 p-4 bg-gray-100'>
                        <div className='flex items-center'>
                            <button 
                                onClick={() => fileRef.current?.click()} 
                                className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                <LuPaperclip className='w-6 h-6 text-gray-700' />
                            </button>
                            <input 
                                type="file" 
                                ref={fileRef} 
                                className='hidden' 
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
                            />
                            <input 
                                type="text" 
                                className='flex-1 mx-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                                placeholder='Type a message...' 
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)} 
                                onKeyUp={(e) => e.key === 'Enter' && sendMessage()} 
                            />
                            <button 
                                onClick={sendMessage} 
                                className='p-2 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                <IoSendSharp className='w-6 h-6 text-white' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
