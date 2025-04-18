import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import {  useSelector } from 'react-redux';
import { useAppDispatch } from "../redux/hooks";
import man from '../assets/man.png';
import { logoutUser } from '../redux/actions/authActions';
import { RootState } from '../redux/store';
import { ReceiverObj } from '../types/ReceiverObj'; 


//? while on a chat, the navbar shows the receiver's name and profile picture
interface NavbarProps {
  title: ReceiverObj;
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
  className?:string
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userDTO } = useSelector((state: RootState) => state.auth);

  const Logout = () => {
    dispatch(logoutUser());
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <nav className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate('/Main')}
            >
              {props.title && <IoMdArrowBack className="w-5 h-5" />}
            </button>
            {props.showSidebarToggle && (
              <button onClick={props.onSidebarToggle} className="mr-4">
                <IoMenuOutline className="text-2xl" />
              </button>
            )}
            <div className="flex-shrink-0 flex items-center">
              {(props.title?.receiverUsername ?? userDTO?.username) && (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={props.title?.receiverProfileImg ?? userDTO?.name ?? man}
                  alt="Profile"
                />
              )}
              <h3 className="md:block hidden ml-3 font-medium text-gray-800 text-sm">
                {(props.title?.receiverUsername ?? userDTO?.username) || ''}
              </h3>
            </div>
          </div>
          <div className="absolute inset-x-0 flex justify-center pointer-events-none">
            <h1
              className="text-3xl font-bold text-[#002D74] pointer-events-auto cursor-pointer"
              onClick={handleLogoClick}
            >
              Chatty
            </h1>
          </div>
          <div className="flex items-center">
            {(props.title?.receiverUsername ?? userDTO) && (
              <button
                onClick={Logout}
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LuLogOut className="w-5 h-5" />
                <span className="sm:block hidden">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
