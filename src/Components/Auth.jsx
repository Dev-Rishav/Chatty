import React, { useEffect, useRef, useState } from 'react';
import SignIn from '../assets/SignIn.png';
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {loginUser,registerUser} from "../redux/actions/authActions"

const Auth = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    
    const [isSignUp, setIsSignUp] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // const formRef=useRef(null);

    const {signupSuccess,error,isAuthenticated}=useSelector(state=>state.auth);


    useEffect(() => {
        if(isAuthenticated){
            navigate('/Main');
        }
    }, [isAuthenticated,navigate]);


    useEffect(() => {
        if (signupSuccess) {
            setIsSignUp(false);
        }
    }, [signupSuccess]);


    useEffect(() => {
        if(error){
            toast.error(error);
            console.error(error);
            
        }
    }, [error]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(registerUser(user));
        } else {
            dispatch(loginUser(user));
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
      //TODO: Implement password reset functionality
    };

    return (
        <>
        <Navbar/>
        <section className='bg-cyan-100 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center'>
                <div className='md:w-1/2 px-16 '>
                    <h2 className='font-bold text-2xl text-[#002D74] text-center'>
                        {isResetPassword ? 'Reset Password' : (isSignUp ? 'Sign Up' : 'Login')}
                    </h2>

                    {error && (
                        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {isResetPassword ? (
                        <form onSubmit={handlePasswordReset} className='flex flex-col gap-4'>
                            <input  
                                className='p-2 mt-8 rounded-xl border' 
                                type='email' 
                                name='email' 
                                placeholder='Email' 
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                            <button type="submit" className='bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300'>
                                Send Reset Email
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setIsResetPassword(false)}
                                className='text-[#002D74] text-sm'
                            >
                                Back to Login
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <input  
                                className='p-2 mt-8 rounded-xl border' 
                                type='email' 
                                name='email' 
                                placeholder='Email' 
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                            <div className='relative'>
                                <input 
                                    className='w-full p-2 rounded-xl border' 
                                    type={showPassword ? 'text' : 'password'} 
                                    name='password' 
                                    placeholder='Password' 
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                />
                                <button 
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500'
                                >
                                    {showPassword ? <PiEyeSlash /> : <PiEye />}
                                </button>
                            </div>
                            <button type="submit" className='bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300'>
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </button>
                        </form>
                    )}

                    <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='border-gray-400' />
                        <p className='text-center text-sm'>OR</p>
                        <hr className='border-gray-400' />
                    </div>

                    <button 
                        className='bg-white border w-full rounded-xl mt-5 py-2 flex justify-center items-center text-sm hover:scale-105 duration-300'
                        
                    >
                        <FcGoogle className='w-5 h-5 mr-2' />
                        {isSignUp ? 'Sign up' : 'Login'} with Google
                    </button>

                    {!isSignUp && !isResetPassword && (
                        <div 
                            className='mt-2 text-xs border-b py-4 border-gray-400 cursor-pointer text-center'
                            onClick={() => setIsResetPassword(true)}
                        >
                            Forgot your password?
                        </div>
                    )}

                    <div className='mt-3 text-xs flex justify-between items-center'>
                        <p>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</p>
                        <button 
                            className='py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300'
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Login' : 'Register'}
                        </button>
                    </div>
                </div>
                <div className='md:block hidden w-1/2'>
                    <img className="rounded-2xl px-2" src={SignIn} alt="Sign In" />
                </div>
            </div>
        </section>
        </>
    );
};

export default Auth;