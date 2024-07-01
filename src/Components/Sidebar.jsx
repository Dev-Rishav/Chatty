import { Paper, Avatar, List, ListItem, ListItemText } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { database } from '../firebase/setup'

const Sidebar = () => {

  const getUser = async () => {
    const userRef=collection(database,"Users")
    try {
      const data=await getDocs(userRef)
      const filteredData = data.docs
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(()=>{getUser()})

  return (
    <div>
      <Paper elevation={0} sx={{ border: "1px solid #D4D4D4" }}>
        <List>
          <ListItem>
            <Avatar />
            <ListItemText />
          </ListItem>
        </List>
      </Paper>
    </div>
  )
}

export default Sidebar