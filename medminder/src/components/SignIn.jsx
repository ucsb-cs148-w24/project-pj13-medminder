import { signInWithGooglePopup } from "../utils/firebase.utils";
import { getDatabase, ref, query, get, set, orderByChild, equalTo } from 'firebase/database';

const SignIn = () => {
    const logGoogleUser = async (name) => {
        const response = await signInWithGooglePopup();
        console.log(response);

        const userId = response.user.uid;
        const database = getDatabase();
        const usersRef = ref(database, 'Users');
        const nameQuery = query(usersRef, orderByChild('Name'), equalTo(response.user.displayName));

        const snapshot = await get(nameQuery);

        if (snapshot.exists()) {
            console.log('Returning User.');
        } else {
            console.log('New User.');
            const userData = {
                Name: response.user.displayName,
                //email: response.user.email,
                Sex: "X",
                Age: 24,
                DOB: "01/01/2000",
                // default values, to be updated later
            };
      
            // Store user data under "Users/{userId}"
            const userRef = ref(database, `Users/${userId}`);
            set(userRef, userData);
        }
    }

    return (
        <div>
            <button onClick={logGoogleUser}>Sign In</button>
        </div>
    )
}

export default SignIn;