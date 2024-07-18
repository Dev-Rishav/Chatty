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
            <h2 onClick={googleSignIn} >Click me</h2>
        </div>
    );
}
