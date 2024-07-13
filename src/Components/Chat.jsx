import React, { useEffect, useReducer, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import "./Chat.css";
import { LuPaperclip } from "react-icons/lu";
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { database, auth } from '../firebase/setup';
import { IoSendSharp } from "react-icons/io5";
import { List, ListItem, ListItemText, Paper } from '@mui/material';

function Chat() {

    const fileRef= useReducer(null);

    const [msg, setMsg] = useState("")
    const [msgData, setMsgData] = useState([])
    const [file,setFile]=useState("")

    const location = useLocation();
    // console.log(location);

    const addMessage = async () => {
        const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
        const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`)
        const messageRef = collection(messageDoc, `Message-${location.state.id}`)
        try {
            await addDoc(messageRef, {
                message: msg,
                file:file
            })
        } catch (error) {
            console.log(error);
        }

    }

    const sendMsg = async () => {
        const userDoc = doc(database, "Users", `${location.state.id}`);
        const messageDoc = doc(userDoc, "Message", `${location.state.id}`)
        const messageRef = collection(messageDoc, `Message-${auth.currentUser?.uid}`)
    
        try {
            await addDoc(messageRef, {
                message: msg,
                file:file,
                name:auth.currentUser?.displayName
            })
            addMessage();
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(location.state.id);
    //TODO [Broken] {Sometimes working}: showMessage() cant fetch messages from DB.
    //* A solution found to the above problem: if msgData is passed over the dependency array of the useEffect hook then the msg shows up but it falls in an infinite loop resulting in exhausting firebase quota

    const showMessage = async () => {
        const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
        const messageDoc = doc(userDoc, "Message", `${auth.currentUser?.uid}`)
        const messageRef = collection(messageDoc, `Message-${location.state.id}`)
        try {
            const data = await getDocs(messageRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            // console.log(filteredData);
            setMsgData(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        showMessage();
        // console.log(msgData);
    }, [])

    console.log(msgData);

    return (
        <div className='chat'>
            <div className='chat-top'>
                <Navbar receiverUsername={location.state.username} receiverProfileImg={location.state.profile_image} />
            </div>
            <div className='chat-middle'>
                {msgData.map((data) => {
                    return <>
                    <h5 style={{fontWeight:"200px"}}>{data.name}</h5>
                        <Paper sx={{ marginTop: "10px", width: "200px" }}>
                            <List>
                                <ListItem>
                                    <ListItemText primary={data.message} />
                                    {data.file !== "" && <img src={data.file} className='chat-img' />}
                                </ListItem>
                            </List>
                        </Paper>
                    </>
                })}
            </div>
            <div className='chat-bottom'>
                <LuPaperclip className='clip-icon' onClick={() => fileRef.current.click()}/>
                <input accept='image/*' onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} ref={fileRef} type='file' className='clip-file'/>
                <input onChange={(e) => setMsg(e.target.value)} className='chat-field' placeholder='Type a message' />
                {file && <Paper>
                    <img style={{width:"70px",padding:"3px"}} src={file}/>
                </Paper>}
                <IoSendSharp onClick={sendMsg} className='send-icon' />
            </div>
        </div>
    )
}
//TODO find an alternative of input onChange

export default Chat