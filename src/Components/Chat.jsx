import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'

function Chat() {


    const location = useLocation();

    return (
        <div>
            <Navbar receiverUsername={location.state.username} receiverProfileImg={location.state.profile_image} />
        </div>
    )
}

export default Chat