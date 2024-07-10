import { Paper, Avatar, List, ListItem, ListItemText } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database, auth } from '../firebase/setup'
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Sidebar.css"
import { Link } from 'react-router-dom';



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
      setUsers(filteredData);
    } catch (error) {
      console.log(error);
    }

  }

  //TODO[Done]: is this component stuck in a loop? find out why it repaints multiple times until firebase quota exceeds.
  //This was happening because of the useEffect hook continuously updating whenever changes performed over users, setting the dependency array empty fixes the issue for now.
  // useEffect(() => { getUser() }, [users])
  useEffect(() => { getUser() }, [])


  //todo[DONE]: add filter function so that the current user  does not shows up 

  return (
    <div>
      <div className='search'>
        <FaMagnifyingGlass className='search-icon' />
        <input className='search-field' placeholder='Search for new chat' />
      </div>
      {users.filter(user => user.id !== auth.currentUser?.uid).map((user) => {
        return <>
          <Link to='/Chat' className='chat-link'>
            <Paper elevation={0} sx={{ border: "1px solid #D4D4D4" }}>
              <List>
                <ListItem>
                  <Avatar src={user.profileImg} />
                  <ListItemText primary={user.username} />
                </ListItem>
              </List>
            </Paper>
          </Link>
        </>
      })}

    </div>
  )
}

export default Sidebar