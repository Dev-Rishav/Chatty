import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import "./Chat.css";
import { LuPaperclip } from "react-icons/lu";
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { database,auth} from '../firebase/setup';
import { IoSendSharp } from "react-icons/io5";
import { List, ListItem, ListItemText, Paper } from '@mui/material';

function Chat() {

    const [msg,setMsg] = useState("")
    const [msgData,setMsgData]= useState([])

    const location = useLocation();
    // console.log(location);

    const addMessage = async () => {
        const userDoc = doc(database,"Users",`${auth.currentUser?.uid}}`);
        const messageDoc = doc(userDoc,"Message",`${auth.currentUser?.uid}}`)
        const messageRef = collection(messageDoc,`Message-${location.state.id}`)
        try {
            await addDoc(messageRef,{
            message: msg,
            })
        } catch (error) {
            console.log(error);
        }

    }

    const sendMsg =  async () => {
        const userDoc = doc(database,"Users",`${location.state.id}`);
        const messageDoc = doc(userDoc,"Message",`${location.state.id}`)
        const messageRef = collection(messageDoc,`Message-${auth.currentUser?.uid}`)
        try {
            await addDoc(messageRef,{
            message: msg,
            })
            addMessage();
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(location.state.id);
    //TODO [Broken] {Sometimes working}: showMessage() cant fetch messages from DB.
    //* A solution found to the above problem: if msgData is passed over the dependency array of the useEffect hook then the msg shows up but it falls in an infinite loop resulting in exhausting firebase quota

    const showMessage = async()=> {
        const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`);
        const messageDoc = doc(userDoc,"Message",`${auth.currentUser?.uid}`)
        const messageRef = collection(messageDoc,`Message-${location.state.id}`)
        try {
            const data = await getDocs(messageRef)
            const  filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
            }))
            // console.log(filteredData);
            setMsgData(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        showMessage()
    },[])

        console.log(msgData);

    return (
        <div className='chat'>
            <div className='chat-top'>
                <Navbar receiverUsername={location.state.username} receiverProfileImg={location.state.profile_image} />
            </div>
            <div className='chat-middle'>
                {msgData.map((data)=>{
                    return <>
                    <Paper sx={{marginTop:"10px", width:"max-component"}}>
                        <List>
                            <ListItem>
                                <ListItemText primary={data.message}/>
                            </ListItem>
                        </List>
                    </Paper>
                    </>
                })}
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