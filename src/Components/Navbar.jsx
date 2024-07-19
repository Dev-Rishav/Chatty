import React from 'react';
import { auth } from '../firebase/setup';
import { LuLogOut } from "react-icons/lu";
import { IoArrowBackSharp } from "react-icons/io5";


export default function Navbar(props) {
  const handleLogoClick= ()=>{
    window.location.reload();
  };
  console.log(props);
    return (
        <nav className="bg-gray-100 shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-12">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={props.title?.receiverProfileImg ?? auth.currentUser?.photoURL}
                            alt="Profile"
                        />
                        <h3 className=" sm:block hidden ml-3 font-medium text-gray-800 text-sm">
                            {props.title?.receiverUsername ?? auth.currentUser.displayName}
                        </h3>
                    </div>
                    <div className="absolute inset-x-0 flex justify-center">
                        <h1 className="text-3xl font-bold text-[#002D74] cursor-pointer " onClick={handleLogoClick} >Chatty
                        </h1>
                    </div>
                     <div className="flex-shrink-0 w-24"> {/* This is a placeholder to balance the layout */} 
                    </div>
                    <div className="flex items-center ml-auto">
                    <LuLogOut className='mr-2'/>
                    <div className='sm:block hidden'>Logout</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}