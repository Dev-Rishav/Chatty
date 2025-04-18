import React from 'react';
import chatBg from '../assets/Home.svg';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9E9E9] p-4 text-center">
            <img 
                src={chatBg} 
                className="hidden md:block w-full max-w-[500px] mb-8" 
                alt="Chat background" 
            />
            <h1 className="font-light text-4xl sm:text-5xl md:text-[58px] leading-tight mb-4">
                Welcome to Chatty
            </h1>
            <h4 className="font-light text-xl sm:text-2xl md:text-[25px]">
                The Pulse of Your Social Network
            </h4>
        </div>
    );
};

export default Home;
