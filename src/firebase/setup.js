import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyBLKFCobpqlWFCTWK26HmvzT8-DgyNJnug",
    authDomain: "chatty-729a9.firebaseapp.com",
    projectId: "chatty-729a9",
    storageBucket: "chatty-729a9.appspot.com",
    messagingSenderId: "890501851854",
    appId: "1:890501851854:web:3f6c60be903beb38197e9f"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const googleProvider = new GoogleAuthProvider(app);
export const database= getFirestore(app);