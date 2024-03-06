import React, { useState, useEffect  } from "react";
import { useAuthContext } from "./AuthContext";
import { getDatabase, ref, get, set } from 'firebase/database';
import "@material/react-switch/dist/switch.css";
import Switch from "@material/react-switch";

const EmailToggle = () => {
    const auth = useAuthContext();
    const userID = auth.currentUser.uid;
    const database = getDatabase();
    const dataRef = ref(database, `Users/${userID}/UserPref/Email`);
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        // Fetch the initial value when the component mounts
        const fetchPrefs = async () => {
            try {
                const notifVal = (await get(dataRef)).val();
                setChecked(notifVal);
            } catch (error) {
                console.error("Error fetching email notifications:", error);
            }
        };

        fetchPrefs();
    });

    const handleToggle = async () => {
        try {
            // Toggle the value
            const newVal = !checked;

            // Update value in the database
            await set(dataRef, newVal);

            // Update the local state
            setChecked(newVal)

            // console.log("Email Notifications toggled successfully.");
        } catch (error) {
            console.error("Error toggling email notifications:", error);
        }
    };

    return (
        <React.Fragment>
            <Switch
                nativeControlId="toggle"
                checked={checked}
                onChange={handleToggle}
            />
            <label htmlFor="toggle">Email Notifications</label>
        </React.Fragment>
    );

}

export default EmailToggle;