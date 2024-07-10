import React from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "./Main.css";

const Main = () => {
  return (
    <div>
        <Grid container>
            <Grid item xs={12}>
                <Navbar/>
            </Grid>
            <Grid item xs={5}>
                <Sidebar/>
            </Grid>
            <Grid item xs={7}>
                <div className='main-right'>
                    hello
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Main