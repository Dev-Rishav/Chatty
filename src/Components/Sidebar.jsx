import { Paper, Avatar, List, ListItem, ListItemText } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/setup'

const Sidebar = () => {



  const [users, setUsers] = useState([])


  const getUser = async () => {
    const userRef = collection(database, "Users")
    try {
      const data = await getDocs(userRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      // console.log(filteredData);
      setUsers(filteredData);
    } catch (error) {
      console.log(error);
    }

  }

  //todo add filter function so that the current user  does not shows up 

  useEffect(() => { getUser() }, [users])

// console.log(users);

  return (
    <div>
      {users.map((user) => {    
        return <>
          <Paper elevation={0} sx={{ border: "1px solid #D4D4D4" }}>
            <List>
              <ListItem>
                <Avatar src={user.profileImg} />
                <ListItemText primary={user.username}/>
              </ListItem>
            </List>
          </Paper>
        </>
      })}

    </div>
  )
}

export default Sidebar