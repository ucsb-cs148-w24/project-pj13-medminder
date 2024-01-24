import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwBQBL9TvaZP_eH6OduToJDo6JkxX7afU",
    authDomain: "medminder-412206.firebaseapp.com",
    projectId: "medminder-412206",
    storageBucket: "medminder-412206.appspot.com",
    messagingSenderId: "48920437462",
    appId: "1:48920437462:web:b7a5c762995a859b2c1f77"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);