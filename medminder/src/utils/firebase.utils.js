import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAQY8aYUAdOB_0GkktSfBjUJA9QIwjstQI",
  authDomain: "med--minder.firebaseapp.com",
  databaseURL: "https://med--minder-default-rtdb.firebaseio.com",
  projectId: "med--minder",
  storageBucket: "med--minder.appspot.com",
  messagingSenderId: "1084517488012",
  appId: "1:1084517488012:web:417e34cddb7b6b440e72a9",
  measurementId: "G-NTZ1316XFS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
export const database = getDatabase(firebaseApp);
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);