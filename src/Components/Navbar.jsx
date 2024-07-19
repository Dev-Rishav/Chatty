import React from 'react';
import { auth } from '../firebase/setup';

export default function Navbar(props) {
    return (
        <nav className="bg-gray-100 shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-12">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={props.receiverProfileImg ?? auth.currentUser?.photoURL}
                            alt="Profile"
                        />
                        <h3 className="ml-3 font-medium text-gray-800 text-sm">
                            {auth.currentUser.displayName ?? props.receiverUsername}
                        </h3>
                    </div>
                    <div className="absolute inset-x-0 flex justify-center">
                        <h1 className="text-3xl font-bold text-[#002D74] cursor-pointer" onClick={`/Main`} >Chatty
                        </h1>
                    </div>
                    <div className="flex-shrink-0 w-24"> {/* This is a placeholder to balance the layout */}
                    </div>
                </div>
            </div>
        </nav>
    );
}