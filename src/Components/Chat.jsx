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
import "./Chat.css"
import chatBackgroundSvg from '../assets/chatBG2.svg';
import Navbar from './Navbar';

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const fileRef = useRef(null);

    // console.log(location.state || {});
    
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
            return () => {};
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
            // console.log('Fetching messages for id:', location.state.id);
            const unsubscribe = fetchMessages();
            return () => unsubscribe();
        }
    }, [loading, location.state, fetchMessages]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col h-screen">
    {/* <div className="bg-gray-100 text-gray-800 p-4 flex items-center">
        <img src={location.state?.profile_image} className="h-8 w-8 rounded-full object-cover mr-4" />
        <h1 className="text-xl">{location.state?.username || "Chat"}</h1>
    </div> */}
    <Navbar />
            <div className='flex-1 relative overflow-hidden'>
                <div 
                    className='absolute inset-0 z-0 opacity-10'
                    style={{
                        backgroundImage: `url(${chatBackgroundSvg})`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '400px 300px',
                        opacity:0.4,
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
                                <p className="font-semibold mb-1">{msg.senderName}</p>
                                <p>{msg.message}</p>
                                {msg.fileUrl && <img src={msg.fileUrl} alt="attachment" className='mt-2 max-w-xs rounded-md' />}
                                <p className={`text-xs mt-1 ${msg.senderId === auth.currentUser?.uid ? 'text-gray-700' : 'text-gray-200'}`}>
                                    {format(msg.timestamp.toDate(), 'h:mm a')}
                                </p>
                            </div>
                        </div>
                    ))}
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
    );
}

export default Chat;

//TODO[DONE]: Exporting files is broken for now.
//TODO: props are not being passed to the navbar that's why the sender profile being rendered.
//TODO: Add a return arrow to the navbar to go through pages easily.