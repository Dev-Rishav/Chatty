// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"
// // import {getStorage} from "firebase/storage"



// // const firebaseConfig = {
// //     apiKey: "AIzaSyBLKFCobpqlWFCTWK26HmvzT8-DgyNJnug",
// //     authDomain: "chatty-729a9.firebaseapp.com",
// //     projectId: "chatty-729a9",
// //     storageBucket: "chatty-729a9.appspot.com",
// //     messagingSenderId: "890501851854",
// //     appId: "1:890501851854:web:3f6c60be903beb38197e9f"
// // };
// // first account

// const firebaseConfig = {
//     apiKey: "AIzaSyD3blmzSPfZP41Yqs-iX-tnSUIEZEvKq-o",
//     authDomain: "chatty-5b1f5.firebaseapp.com",
//     projectId: "chatty-5b1f5",
//     storageBucket: "chatty-5b1f5.appspot.com",
//     messagingSenderId: "31278878178",
//     appId: "1:31278878178:web:9a3b6c1ff50aae2b0e7dbb"
// };
// //second account


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const googleProvider = new GoogleAuthProvider(app);
// export const database = getFirestore(app);
// // export const storage = getStorage(app);


import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"


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