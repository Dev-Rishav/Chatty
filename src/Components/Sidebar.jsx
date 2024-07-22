import { Paper, Avatar, List, ListItem, ListItemText } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database, auth } from '../firebase/setup'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

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
            console.error(error);
        }
    }



    //TODO[Done]: is this component stuck in a loop? find out why it repaints multiple times until firebase quota exceeds.
    //This was happening because of the useEffect hook continuously updating whenever changes performed over users, setting the dependency array empty fixes the issue for now.
    // useEffect(() => { getUser() }, [users])
    useEffect(() => { getUser() }, [])



    //todo[DONE]: add filter function so that the current user  does not shows up 

    return (
        <div className="bg-gray-50 shadow-md h-full overflow-y-auto">
            <div className='pt-4 font-bold text-2xl text-[#002D74] text-center'>
                <h2>Friends</h2>
            </div>
            <div className="flex items-center p-4 border-b border-gray-200 ">
                <input
                    type="text"
                    placeholder="Search"
                    className="ml-0 p-1 w-80 h-8 rounded-xl bg-gray-100 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaMagnifyingGlass className="text-gray-500 w-6 h-6 ml-4 cursor-pointer" />
            </div>

            {users
                .filter(user => user.id !== auth.currentUser?.uid)
                .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                    <div className='mt-3 w-50' key={user.id}>
                        <Link
                            to='/ChatLayout'
                            className='block px-3 text-gray-700 hover:scale-105 duration-300 '
                            state={{
                                id: user.id,
                                username: user.username,
                                profile_image: user.profile_image
                            }}
                        >
                            <Paper elevation={0} sx={{ border: "2px solid #3d85c6" }}>
                                <List>
                                    <ListItem>
                                        <Avatar src={user.profile_image} />
                                        <ListItemText primary={user.username} sx={{ marginLeft: "8px" }} className='md:block hidden' />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Sidebar
//TODO[DONE]: write searching logic for to find the chats.