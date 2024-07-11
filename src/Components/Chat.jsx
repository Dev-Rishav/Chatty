import React, { useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import "./Chat.css";
import { LuPaperclip } from "react-icons/lu";
import { addDoc, collection, doc } from 'firebase/firestore';
import { database } from '../firebase/setup';
import { IoSendSharp } from "react-icons/io5";
import { auth } from '../firebase/setup';

function Chat() {

    const [msg,setMsg] = useState("")

    const location = useLocation();
    // console.log(location);

    const sendMsg =  async () => {
        const userDoc = doc(database,"Users",`${location.state.id}`);
        const messageDoc = doc(userDoc,"Message",`${location.state.id}`)
        const messageRef = collection(messageDoc,`Message-${auth.currentUser?.uid}`)
        try {
            await addDoc(messageRef,{
            message: msg,
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='chat'>
            <div className='chat-top'>
                <Navbar receiverUsername={location.state.username} receiverProfileImg={location.state.profile_image} />
            </div>
            <div className='chat-bottom'>
                <LuPaperclip className='clip-icon'/>
                <input onChange={(e) => setMsg(e.target.value)} className='chat-field' placeholder='Type a message'/>
                <IoSendSharp onClick={sendMsg} className='send-icon'/>
            </div>
        </div>
    )
}

export default Chat