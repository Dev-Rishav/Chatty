import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar } from '@mui/material';
import { auth } from '../firebase/setup';
import "./Navbar.css"

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} sx={{backgroundColor:"#A855F7",height:"50px"}} position="static">
        <Toolbar variant="dense">
            <img referrerPolicy='no-referrer' className='profile-img' src={auth.currentUser?.photoURL}></img>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
