import * as React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, database } from '../firebase/setup';
import { doc, setDoc } from 'firebase/firestore';

export default function SignIn() {

    const addUser = async () => {
        console.log("addUser() invoked");
        if (auth.currentUser) {
            const userDoc = doc(database, "Users", `${auth.currentUser.uid}`);
            try {
                await setDoc(userDoc, {
                    id: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                    profile_image: auth.currentUser.photoURL
                });
                console.log("User added to Firestore");
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            console.error("No user is signed in");
        }
    };

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            await addUser();
            console.log("User signed in and added to Firestore");
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };

    console.log("Component rendered");

    return (
        <div className=''>
            <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
                <div class="max-w-4xl bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] flex flex-col md:flex-row overflow-hidden transform hover:scale-105 transition duration-300">
                    <div class="w-full md:w-1/2 p-8 bg-white">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                        <form class="mb-4">
                            <div class="mb-4">
                                <input class="shadow-inner border-2 border-gray-200 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" id="email" type="email" placeholder="Email"/>
                            </div>
                            <div class="mb-6">
                                <input class="shadow-inner border-2 border-gray-200 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" id="password" type="password" placeholder="Password"/>
                            </div>
                            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200" type="button">
                                Sign In
                            </button>
                        </form>

                        <div class="relative mb-4">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div class="flex space-x-2 mb-4">
                            <button class="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button class="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Phone
                            </button>
                        </div>

                        <p class="text-center text-sm text-gray-600">
                            Don't have an account?
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Sign up</a>
                        </p>
                    </div>

                    <div class="w-full md:w-1/2 bg-gray-50 p-8 border-l border-gray-200">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Our Project</h2>
                        <p class="text-gray-600 mb-4">
                            Our innovative platform is designed to revolutionize the way you work. With cutting-edge features and a user-friendly interface, we aim to boost your productivity and streamline your workflow.
                        </p>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Key features include:</h3>
                        <ul class="list-disc list-inside text-gray-600 mb-4">
                            <li>Advanced task management</li>
                            <li>Real-time collaboration tools</li>
                            <li>Intuitive data visualization</li>
                            <li>Seamless integration with popular apps</li>
                        </ul>
                        <p class="text-gray-600 font-semibold">
                            Join us today and experience the future of work!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
