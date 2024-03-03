import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Dash-style.css';

const SignOut = () => {
    const auth = getAuth()
    const user = auth.currentUser
    const [isLoggedIn, setIsLoggedIn] = useState(user)
    const navigate = useNavigate();

    // onAuthStateChanged triggers whenever a login/logout happens
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, [auth]);

    // this uses firebase's user logout logic
    const logOutGoogleUser = async (name) => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("successfully logged out.")
            navigate("/")
        }).catch((error) => {
            console.log("error on logout!")
        });
    }

    return (
        <button className="sign-out" onClick={logOutGoogleUser}>
            {isLoggedIn? 'Sign Out' : 'not signed in'}
        </button>
    )
}

export default SignOut;
