import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBm3Bld7iYnce7Hzk8gW66ohTFQ8ue0Kls",
    authDomain: "chatty-v2-756af.firebaseapp.com",
    projectId: "chatty-v2-756af",
    storageBucket: "chatty-v2-756af.appspot.com",
    messagingSenderId: "164211176544",
    appId: "1:164211176544:web:97402fc5dd8cbee085ff05"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app);
export const storage= getStorage(app);

