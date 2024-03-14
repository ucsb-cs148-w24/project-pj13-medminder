import { signInWithGooglePopup } from "../utils/firebase.utils";
import { getDatabase, ref, query, get, set } from 'firebase/database';
import React from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { GoogleAuthProvider } from "firebase/auth";
import "./AlertPopupWithButton/AlertPopup.css";

//import { useAuthContext } from "./AuthContext";
const SignIn = () => {
    
    const navigate = useNavigate();



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
                    

                    const userInfo = {
                        Name: response.user.displayName,
                        Email: email,
                        // default values, to be updated later
                        Sex: "F",
                        Age: "24",
                        DOB: "01/01/2000",
                    };

                    const userPref = {
                        Email: true,
                    };
            
                    // Store user data under "Users/{email}/UserInfo"
                    const userRef = ref(database, `Users/${userId}/UserInfo`);
                    set(userRef, userInfo);

                    const userRef_preferences = ref(database, `Users/${userId}/UserPref`);
                    set(userRef_preferences, userPref);
                    
                    

                    
                }
            }).catch((error) => {
                console.error('Error querying the database:', error);
            });

        }

        catch(err){
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