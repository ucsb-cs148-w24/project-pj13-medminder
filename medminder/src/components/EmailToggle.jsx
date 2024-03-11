import React, { useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { getDatabase, ref, get, set } from 'firebase/database';
import "../Dash-style.css";
import { CiBellOn } from "react-icons/ci";
import { CiBellOff } from "react-icons/ci";

const EmailToggle = () => {
    const auth = useAuthContext();
    const userID = auth.currentUser.uid;
    const database = getDatabase();
    const dataRef = ref(database, `Users/${userID}/UserPref/Email`);
    const [checked, setChecked] = useState(true);
    const [buttonText, setButtonText] = useState(<CiBellOn size={30}/>);

    useEffect(() => {
        // Fetch the initial value when the component mounts
        const fetchPrefs = async () => {
            try {
                const notifVal = (await get(dataRef)).val();
                setChecked(notifVal);
                if (!notifVal) setButtonText(<CiBellOff size={30}/>);
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
            setChecked(newVal);

            if (newVal) {
                setButtonText(<CiBellOn size={30}/>);
            } else {
                setButtonText(<CiBellOff size={30}/>);
            }

            console.log("Email Notifications toggled successfully.");
        } catch (error) {
            console.error("Error toggling email notifications:", error);
        }
    };

    return (
        <button
            className='notifButton'
            onClick={handleToggle}
            >
            {buttonText}
        </button>
    );

}

export default EmailToggle;