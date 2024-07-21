import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuPaperclip } from "react-icons/lu";
import { IoSendSharp } from "react-icons/io5";
import { addDoc, collection, query, orderBy, onSnapshot, where, or, and } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database, storage } from '../firebase/setup';
import { format } from 'date-fns';
import { Avatar } from '@mui/material';
import chatBackgroundSvg from '../assets/chatBG2.svg';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const receiverObj = {
        receiverProfileImg: location.state?.profile_image,
        receiverUsername: location.state?.username,
    }

    const sendMessage = async () => {
        if (message.trim() === "" && !file) return;
        // console.log(message);

        try {
            let fileUrl = "";
            if (file) {
                const storageRef = ref(storage, `chat_files/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                fileUrl = await getDownloadURL(storageRef);
            }

            const messageData = {
                message,
                fileUrl,
                senderName: auth.currentUser?.displayName,
                senderId: auth.currentUser?.uid,
                senderProfilePic: auth.currentUser?.photoURL,
                receiverId: location.state?.id,
                timestamp: new Date()
            };
            // console.log(messageData);
            await addDoc(collection(database, "Messages"), messageData);
            setMessage("");
            setFile(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const fetchMessages = useCallback(() => {
        if (!auth.currentUser || !location.state?.id) {
            console.log('Missing current user or receiver id');
            return () => { };
        }

        const messagesRef = collection(database, "Messages");
        const q = query(
            messagesRef,
            or(
                and(
                    where('senderId', '==', auth.currentUser.uid),
                    where('receiverId', '==', location.state.id)
                ),
                and(
                    where('senderId', '==', location.state.id),
                    where('receiverId', '==', auth.currentUser.uid)
                )
            ),
            orderBy("timestamp", "asc")
        );

        return onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            // console.log('Fetched messages:', fetchedMessages);
            setMessages(fetchedMessages);
        }, (error) => {
            console.error("Error fetching messages:", error);
        });
    }, [location.state?.id]);

    useEffect(() => {
        if (!loading && auth.currentUser && location.state?.id) {
            const unsubscribe = fetchMessages();
            return () => unsubscribe();
        }
    }, [loading, location.state, fetchMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen">
            {showSidebar && (
                <div className="w-1/4 min-w-[250px]">
                    <Sidebar />
                </div>
            )}
            <div className={`flex flex-col ${showSidebar ? 'w-3/4' : 'w-full'}`}>
                <Navbar
                    title={receiverObj}
                    showSidebarToggle={true}
                    onSidebarToggle={() => setShowSidebar(!showSidebar)}
                />
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
                                <div className={`max-w-[70%] ${msg.senderId === auth.currentUser?.uid ? 'bg-cyan-200 text-gray-700' : 'bg-slate-600 text-gray-200'} rounded-lg p-3 shadow-md`}>
                                    <p className="font-semibold mb-1">
                                        {msg.senderName}
                                        <span className="text-xs ml-2">
                                            {format(msg.timestamp.toDate(), 'h:mm a')}
                                        </span>
                                    </p>
                                    <p>{msg.message}</p>
                                    {msg.fileUrl && <img src={msg.fileUrl} alt="attachment" className='mt-2 max-w-xs rounded-md' />}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className='flex items-center p-4 bg-white border-t border-gray-300 z-30'>
                    <button onClick={() => fileRef.current.click()} className='p-2'>
                        <LuPaperclip className='text-2xl text-cyan-700' />
                    </button>
                    <input
                        type='file'
                        ref={fileRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        className='hidden'
                    />
                    <input
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='flex-1 p-2 mx-2 border rounded-lg'
                        placeholder='Type a message...'
                    />
                    {file && <p className='mx-2'>{file.name}</p>}
                    <button onClick={sendMessage} className='p-2'>
                        <IoSendSharp className='text-2xl text-cyan-700' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;