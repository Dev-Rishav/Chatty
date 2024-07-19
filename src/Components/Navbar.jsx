import React from 'react';
import { auth } from '../firebase/setup';
import { LuLogOut } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export default function Navbar(props) {

    const navigate=useNavigate();


    const handleLogoClick = () => {
        window.location.reload();
    };
    console.log(props);
    return (
        <nav className="bg-gray-100 shadow-md">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
                <button 
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => navigate('/Main')}
                >
                    <IoMdArrowBack className='w-5 h-5' />
                </button>
                <div className="flex-shrink-0 flex items-center">
                    <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={props.title?.receiverProfileImg ?? auth.currentUser?.photoURL}
                        alt="Profile"
                    />
                    <h3 className="sm:block hidden ml-3 font-medium text-gray-800 text-sm">
                        {props.title?.receiverUsername ?? auth.currentUser.displayName}
                    </h3>
                </div>
            </div>
            <div className="absolute inset-x-0 flex justify-center pointer-events-none">
                <h1 className="text-3xl font-bold text-[#002D74] pointer-events-auto cursor-pointer" onClick={handleLogoClick}>
                    Chatty
                </h1>
            </div>
            <div className="flex items-center">
                <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <LuLogOut className='w-5 h-5' />
                    <span className='sm:block hidden'>Logout</span>
                </button>
            </div>
        </div>
    </div>
</nav>
    );
}