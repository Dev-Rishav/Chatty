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
            console.log('Fetched messages:', fetchedMessages);
            setMessages(fetchedMessages);
        }, (error) => {
            console.error("Error fetching messages:", error);
        });
    }, [location.state?.id]);

    useEffect(() => {
        if (!loading && auth.currentUser && location.state?.id) {
            console.log('Fetching messages for id:', location.state.id);
            const unsubscribe = fetchMessages();
            return () => unsubscribe();
        }
    }, [loading, location.state, fetchMessages]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col h-screen'>
            <div className='bg-gray-800 text-white p-4'>
                <h1 className='text-xl'>{location.state?.username || "Chat"}</h1>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
            {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start mb-4 ${msg.senderId === auth.currentUser?.uid ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar
                    src={msg.senderProfilePic || 'default-avatar-url.jpg'}
                    alt={msg.senderName}
                    className={`w-8 h-8 ${msg.senderId === auth.currentUser?.uid ? 'ml-2' : 'mr-2'}`}
                />
                    <div className={`p-2 m-2 rounded-lg ${msg.senderId === auth.currentUser?.uid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                        <p>{msg.senderName}: {msg.message}</p>
                        {msg.fileUrl && <img src={msg.fileUrl} alt="attachment" className='mt-2 max-w-xs' />}
                        <p className={`text-xs mt-1 ${msg.senderId === auth.currentUser?.uid ? 'text-blue-200' : 'text-gray-600'}`}>
                            {format(msg.timestamp.toDate(), 'MMM d, yyyy h:mm a')}
                        </p>
                    </div>
                </div>
            ))}
        </div>
            <div className='flex items-center p-4 border-t border-gray-300'>
                <button onClick={() => fileRef.current.click()} className='p-2'>
                    <LuPaperclip className='text-2xl text-gray-600' />
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
                    <IoSendSharp className='text-2xl text-blue-500' />
                </button>
            </div>
        </div>
    );
}

export default Chat;

//TODO: Exporting files is broken for now.