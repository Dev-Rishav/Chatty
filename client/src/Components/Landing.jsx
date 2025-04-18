import React, { useState } from 'react';
import SignIn from '../assets/SignIn.png';
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, database, googleProvider } from "../firebase/setup";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Landing = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const addUser = async () => {
        const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
        try {
            await setDoc(userDoc, {
                id: auth.currentUser?.uid,
                username: auth.currentUser?.displayName || email.split('@')[0],
                profile_image: auth.currentUser?.photoURL || null
            });
        } catch (error) {
            console.error(error);
        }
    };

    const emailSignin = async (props) => {
        const { email, password, isSignUp } = props;
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
                await addUser();
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate("/Main");
        } catch (error) {
            console.error("Full error object:", error);
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);

            switch(error.code) {
                case 'auth/user-not-found':
                    setErrorMessage('No account found with this email. Please sign up.');
                    break;
                case 'auth/wrong-password':
                    setErrorMessage('Incorrect password. Please try again.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('Invalid email address. Please check and try again.');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMessage('An account with this email already exists. Please log in.');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('Password is too weak. Please use a stronger password.');
                    break;
                case 'auth/network-request-failed':
                    setErrorMessage('Network error. Please check your internet connection and try again.');
                    break;
                default:
                    setErrorMessage(`An error occurred: ${error.message}`);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
        emailSignin({ email, password, isSignUp });
    };

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            await addUser();
            navigate("/Main");
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred with Google Sign-In. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setErrorMessage('');
            setIsResetPassword(false);
            alert(`Password reset email sent to ${email}. Please check your inbox and spam folder.`);
        } catch (error) {
            console.error("Password reset error:", error);
            switch(error.code) {
                case 'auth/user-not-found':
                    setErrorMessage('No account found with this email.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('Invalid email address. Please check and try again.');
                    break;
                case 'auth/too-many-requests':
                    setErrorMessage('Too many password reset attempts. Please try again later.');
                    break;
                default:
                    setErrorMessage(`An error occurred: ${error.message}`);
            }
        }
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

                    {errorMessage && (
                        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errorMessage}
                        </div>
                    )}

                    {isResetPassword ? (
                        <form onSubmit={handlePasswordReset} className='flex flex-col gap-4'>
                            <input  
                                className='p-2 mt-8 rounded-xl border' 
                                type='email' 
                                name='email' 
                                placeholder='Email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className='relative'>
                                <input 
                                    className='w-full p-2 rounded-xl border' 
                                    type={showPassword ? 'text' : 'password'} 
                                    name='password' 
                                    placeholder='Password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        onClick={googleSignIn}
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

export default Landing;