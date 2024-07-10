import React from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "./Main.css";
import chatBg from "../assets/chatBg.svg"

const Main = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={5}>
                    <Sidebar />
                </Grid>
                <Grid item xs={7}>
                    <div className='main-right'>
                        <img src={chatBg} className='chat-bg'></img>
                        <h1 className='chat-bg-tagLine'>Welcome to Chatty</h1>
                        <h4 className='chat-bg-tagLine-2'>where your closed ones meet</h4>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Main