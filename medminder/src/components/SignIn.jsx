import { signInWithGooglePopup } from "../utils/firebase.utils";
import { getDatabase, ref, query, get, set } from 'firebase/database';
import React from 'react';
import { useUserId } from './UserIdContext';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const { updateUserId } = useUserId();
    const logGoogleUser = async (name) => {
        const response = await signInWithGooglePopup();
        console.log(response);
        navigate("/dashboard");

        const userId = response.user.uid;
        const email = response.user.email;

        // set userId
        updateUserId(userId);

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
                    Sex: "X",
                    Age: 24,
                    DOB: "01/01/2000",
                };
        
                // Store user data under "Users/{email}/UserInfo"
                const userRef = ref(database, `Users/${userId}/UserInfo`);
                set(userRef, userInfo);
            }
        }).catch((error) => {
            console.error('Error querying the database:', error);
        });

    }

    return (
        <div>
            <button onClick={logGoogleUser}>Sign In</button>
        </div>
    )
}

export default SignIn;