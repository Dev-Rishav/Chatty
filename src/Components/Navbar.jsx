import React from 'react';
import { auth } from '../firebase/setup';
import { LuLogOut } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { IoMenuOutline } from 'react-icons/io5';


export default function Navbar(props) {

    const navigate=useNavigate();

    const Logout = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.error("Unable to Logout", error);
        });
    }


    const handleLogoClick = () => {
        window.location.reload();
    };
    // console.log(auth.currentUser);
    return (
        <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        
        <div className="relative flex items-center justify-between h-12">
            
            <div className="flex items-center space-x-4">
                <button 
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => navigate('/Main')}
                >
                    {/* { (props.title?.receiverUsername ?? auth.currentUser?.displayName) && <IoMdArrowBack className='w-5 h-5' />} */}
                    { props.title && <IoMdArrowBack className='w-5 h-5' />}
                </button>
                {props.showSidebarToggle && (
                <button onClick={props.onSidebarToggle} className="mr-4">
                    <IoMenuOutline className="text-2xl" />
                </button>
            )} 
                <div className="flex-shrink-0 flex items-center">
                {(props.title?.receiverUsername ?? auth.currentUser?.displayName ) &&<img
                        className="h-8 w-8 rounded-full object-cover"
                        src={props.title?.receiverProfileImg ?? auth.currentUser?.photoURL}
                        alt="Profile"
                    />}
                    <h3 className="md:block hidden ml-3 font-medium text-gray-800 text-sm">
                        {(props.title?.receiverUsername ?? auth.currentUser?.displayName ?? auth.currentUser?.email) || ""}
                    </h3>
                </div>
            </div>
            <div className="absolute inset-x-0 flex justify-center pointer-events-none">
                <h1 className="text-3xl font-bold text-[#002D74] pointer-events-auto cursor-pointer" onClick={handleLogoClick}>
                    Chatty
                </h1>
            </div>
            <div className="flex items-center">
                { (props.title?.receiverUsername ?? auth.currentUser) && <button onClick={Logout} className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <LuLogOut className='w-5 h-5'  />
                    <span className='sm:block hidden'>Logout</span>
                </button>}
            </div>
        </div>
    </div>
</nav>
    );
}

//TODO[DONE]: search logic
//TODO: Phone number login