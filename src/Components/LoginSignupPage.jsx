import React, { useState } from 'react';
import illustration from '../assets/mp.svg'; 
import { FcGoogle } from 'react-icons/fc';

const LoginSignUpPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPhoneSignIn, setIsPhoneSignIn] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex max-w-4xl">
                <div className="p-10 flex-1">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">{isSignUp ? 'Sign Up' : 'Login'}</h1>
                    <button
                        className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded-lg shadow flex items-center justify-center hover:bg-gray-100 transition duration-300 mb-6"
                        onClick={() => { /* Add Google login logic here */ }}
                    >
                        <FcGoogle className="mr-2" /> {isSignUp ? 'Sign Up' : 'Login'} with Google
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300 mb-6"
                        onClick={() => setIsPhoneSignIn(true)}
                    >
                        {isSignUp ? 'Sign Up' : 'Login'} with Phone Number
                    </button>
                    {isPhoneSignIn && (
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                            >
                                Send OTP
                            </button>
                            <div>
                                <label className="block text-gray-700">OTP</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}
                    <p className="mt-4 text-gray-600">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setIsPhoneSignIn(false); }}
                            className="text-blue-500 hover:underline focus:outline-none"
                        >
                            {isSignUp ? 'Login' : 'Sign Up'}
                        </button>
                    </p>
                </div>
                <div className="flex-1 flex items-center justify-center p-10 bg-gray-100">
                    <img src={illustration} alt="Illustration" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default LoginSignUpPage;