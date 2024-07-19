import { Paper, Avatar, List, ListItem, ListItemText } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database, auth } from '../firebase/setup'
import { FaMagnifyingGlass } from "react-icons/fa6";
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
            // console.log(filteredData);
            setUsers(filteredData);
        } catch (error) {
            console.error(error);
        }

    }

    //TODO[Done]: is this component stuck in a loop? find out why it repaints multiple times until firebase quota exceeds.
    //This was happening because of the useEffect hook continuously updating whenever changes performed over users, setting the dependency array empty fixes the issue for now.
    // useEffect(() => { getUser() }, [users])
    useEffect(() => { getUser() }, [])


    //todo[DONE]: add filter function so that the current user  does not shows up 
    // console.log(users);
    return (
        <div className="bg-gray-50 shadow-md h-screen w-96">
            <div className="flex items-center p-4 border-b border-gray-200">
                <FaMagnifyingGlass className="text-gray-500 w-5 h-5 ml-6" />
                <input
                    type="text"
                    placeholder="Search"
                    className="ml-2 p-2 w-80 h-8 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {users.filter(user => user.id !== auth.currentUser?.uid).map((user) => {
                return <div className='mt-4'>
                    <Link
                        key={user.id}
                        to='/Chat'
                        className='block px-3 text-gray-700 rounded-lg hover:scale-105 duration-300'
                        state={{
                            id: user.id,
                            username: user.username,
                            profile_image: user.profile_image
                        }} >
                        <Paper elevation={0} sx={{ border: "1px solid #D4D4D4" }}>
                            <List>
                                <ListItem>
                                    <Avatar src={user.profile_image} />
                                    <ListItemText primary={user.username} sx={{ marginLeft: "8px" }} />
                                </ListItem>
                            </List>
                        </Paper>
                    </Link>
                </div>
            })}

        </div>
    )
}

export default Sidebar