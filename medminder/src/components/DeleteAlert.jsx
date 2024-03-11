import React from 'react';
import { useAuthContext } from './AuthContext';
import { ref, remove, set, onValue } from 'firebase/database';
import { database } from '../utils/firebase.utils';
import { AiFillRest } from "react-icons/ai";
import '../Dash-style.css';

export default function DeleteAlert(props) {

    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const userProfile = auth.currentProfile;
    const dataRef = ref(database, 'Users/' + userId + '/' + userProfile + '/' + props.timestamp);

    const current_day = props.date.getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayToRemove = days[current_day]
    // file path to set a specific day to false
    const dataRef2 = ref(database, 'Users/' + userId + '/' + userProfile + '/' + props.timestamp + '/day/' + dayToRemove);
    // file path to access all the other days and check if they're false, if so delete the entire medicine object
    const dataRef3 = ref(database, 'Users/' + userId + '/' + userProfile + '/' + props.timestamp + '/day/');




    const deleteAlert = async () => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to remove this medicine?');

        // If the user confirms, proceed with the delete operation
        if (isConfirmed) {
            try {

                let data="";
                let allDaysFalse = true;

                await set(dataRef2, false);
                console.log('Set', dayToRemove, 'to false');

                onValue(dataRef3, (snapshot) => {
                    if (snapshot.exists()) {
                        data = snapshot.val();
                        if (data.sunday === true || data.monday === true || data.tuesday === true || data.wednesday === true 
                            || data.thursday === true || data.friday === true || data.saturday === true) {
                                allDaysFalse = false;
                        }
                    }
                });
                if (allDaysFalse) {
                    await remove(dataRef);
                    console.log('All days of the medicine have been set to false, remove the entire medicine')
                };

            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    }

    return (
        <button className="delete" title="delete medicine" onClick={deleteAlert}><AiFillRest data-testid="delete-icon"/></button>
    );
}
