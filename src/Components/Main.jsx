import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home'
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
                <Grid item xs={12} sm={4} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Home/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Main;

//TODO: Implement search logic