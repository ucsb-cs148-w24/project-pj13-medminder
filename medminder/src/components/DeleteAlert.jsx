import React from 'react';
import { useAuthContext } from './AuthContext';
import { ref, remove } from 'firebase/database';
import { database } from '../utils/firebase.utils';
import { AiFillRest } from "react-icons/ai";
import '../Dash-style.css';

export default function DeleteAlert(props) {
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const dataRef = ref(database, 'Users/' + userId + '/UserData/' + props.timestamp);

    const deleteAlert = () => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to remove this medicine?');
        
        // If the user confirms, proceed with the delete operation
        if (isConfirmed) {
            remove(dataRef)
                .then(() => {
                    console.log('Data deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting data:', error);
                });
        }
    }

    return (
        <button className="delete" onClick={deleteAlert}><AiFillRest/></button>
    );
}
