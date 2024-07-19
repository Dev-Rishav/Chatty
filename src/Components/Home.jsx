import React from 'react'
import chatBg from '../assets/chatBg.svg'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#E9E9E9] relative">
            <img src={chatBg} className="md:block hidden w-[500px] bg-aquamarine absolute left-1/2 top-50 transform -translate-x-1/2 -translate-y-[30%]" />
            <h1 className="absolute top-200 transform -translate-y-[-130%]  text-center font-light text-[58px]">Welcome to Chatty</h1>
            <h4 className="absolute text-center font-light text-[25px] transform -translate-y-[-450%]">where your closed ones meet</h4>
        </div>
    )
}

export default Home