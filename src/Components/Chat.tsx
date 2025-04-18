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

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    senderProfilePic?: string;
    message: string;
    timestamp: any; 
    fileUrl?: string;
}


const Chat: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const receiverObj: ReceiverObj = {
        // receiverProfileImg: location.state?.profile_image,
        // receiverUsername: location.state?.username,
    };

    const sendMessage = async () => {
        // Implement send message logic here
    };

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
                        <div className='relative z-20 h-full overflow-y-auto p-4 scroll-smooth'>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex items-start mb-4 ${msg.senderId === auth.currentUser?.uid ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <Avatar
                                        src={msg.senderProfilePic || 'default-avatar-url.jpg'}
                                        alt={msg.senderName}
                                        className={`w-8 h-8 ${msg.senderId === auth.currentUser?.uid ? 'ml-2' : 'mr-2'}`}
                                    />
                                    <div className={`max-w-[50%] ${msg.senderId === auth.currentUser?.uid ? 'bg-cyan-200 text-gray-700' : 'bg-slate-600 text-gray-200'} rounded-lg p-3 shadow-lg`}>
                                        <p className="font-semibold mb-1 ">
                                            {msg.senderName}
                                            <span className="text-xs ml-2">
                                                {format(msg.timestamp.toDate(), 'h:mm a')}
                                            </span>
                                        </p>
                                        <p className=''>{msg.message}</p>
                                        {msg.fileUrl && <img src={msg.fileUrl} alt="file" className="mt-2" />}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
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
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
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
