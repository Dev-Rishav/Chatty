import React from 'react';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Main = () => {
  return (
    <div>
        <Grid container>
            <Grid item xs={12}>
                <Navbar/>
            </Grid>
            <Grid xs={5}>
                <Sidebar/>
            </Grid>
            <Grid xs={7}>
                <div>
                    hello
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Main