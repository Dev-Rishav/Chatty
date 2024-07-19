import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import chatBg from "../assets/chatBg.svg";
import { auth } from '../firebase/setup';
import { onAuthStateChanged } from 'firebase/auth';

const Main = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authListener = onAuthStateChanged(auth, (user) => {
            setLoading(false);
        });
        return () => authListener();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9}>
                    <div className="flex flex-col items-center justify-center h-screen bg-[#E9E9E9] relative">
                        <img src={chatBg} className="md:block hidden w-[500px] bg-aquamarine absolute left-1/2 top-50 transform -translate-x-1/2 -translate-y-[30%]" />
                        <h1 className="absolute top-200 transform -translate-y-[-130%]  text-center font-light text-[58px]">Welcome to Chatty</h1>
                        <h4 className="absolute text-center font-light text-[25px] transform -translate-y-[-450%]">where your closed ones meet</h4>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Main;

//TODO: Implement TODO logic
//TODO: Beautify Sidebar users
//TODO: on clicking on link, change the state to which the chat component on the place of logo
