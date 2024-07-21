import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/setup'
import Chat from './Chat'


const Chat2 = () => {


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authListener = onAuthStateChanged(auth, (user) => {
            setLoading(false);
        });
        return () => authListener();
    }, [])

    if (loading) return <div>Loading</div>

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
                    <Chat />
                </Grid>
            </Grid>
        </div>
    )
}

export default Chat2