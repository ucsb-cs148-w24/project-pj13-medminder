import { signInWithGooglePopup } from "../utils/firebase.utils";
import { getDatabase, ref, query, get, set } from 'firebase/database';
import React from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import "./AlertPopupWithButton/AlertPopup.css";

//import { useAuthContext } from "./AuthContext";

const SignIn = () => {
    
    const navigate = useNavigate();
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");

    const signInheader = () =>{
        <div className="modal-content">
                    <h3>Welcome to medminder!</h3>
                    <input className='textbox'
                    placeholder="What is your sex?"
                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                />
                    <input className='textbox'
                    placeholder="What is your age?"
                    value={sex}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                </div>
    }

    //const setAccessToken = useAuthContext();
    const logGoogleUser = async (name) => {
        try{
            const response = await signInWithGooglePopup();
            console.log(response);
            navigate("/dashboard");

            const userId = response.user.uid;
            const email = response.user.email;
            

            const apiAuth = GoogleAuthProvider.credentialFromResult(response);
            const accessToken = apiAuth.accessToken;
            console.log("calling..." + accessToken);
            //setAccessToken(accessToken);
            localStorage.setItem("accessToken", accessToken);

            const database = getDatabase();

            const userRef = ref(database, `Users/${userId}`);
            const check = query(userRef);



            get(check).then((snapshot) => {
                if (snapshot.exists()) {
                    // The user exists
                    console.log('Returning User.');
                } else {
                    console.log('New User.');
                    signInheader()
                    

                    const userInfo = {
                        Name: response.user.displayName,
                        Email: email,
                        // default values, to be updated later
                        Sex: sex,
                        Age: age,
                        DOB: "01/01/2000",
                    };

            
                    // Store user data under "Users/{email}/UserInfo"
                    const userRef = ref(database, `Users/${userId}/UserInfo`);
                    set(userRef, userInfo);
                }
            }).catch((error) => {
                console.error('Error querying the database:', error);
            });
        }catch(err){
            console.log("Caught Error: Firebase: Error (auth/popup-closed-by-user)");
        }

    }

    return (
        <div>
            <button onClick={logGoogleUser} className="signin">Sign In</button>
        </div>
        
    )
}

export default SignIn;