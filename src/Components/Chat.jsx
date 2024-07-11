import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import "./Chat.css";
import { LuPaperclip } from "react-icons/lu";
import { addDoc, doc } from 'firebase/firestore';
import { database } from '../firebase/setup';

function Chat() {


    const location = useLocation();
    console.log(location);

    const sendMsg =  async () => {
        const userDoc = doc(database,"Users",`${location.state.id}`);
        try {
            await addDoc()
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
                <input className='chat-field' placeholder='Type a message'/>
            </div>
        </div>
    )
}

export default Chat