import React from 'react';
import { useAuthContext } from './AuthContext';
import { ref, remove } from 'firebase/database';
import { database } from '../utils/firebase.utils';
import { AiFillRest } from "react-icons/ai";
import '../Dash-style.css';

export default function DeleteAlert(props) {
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const userProfile = auth.currentProfile;
    const dataRef = ref(database, 'Users/' + userId + '/' + userProfile + '/' + props.timestamp);

    const deleteAlert = async () => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to remove this medicine?');
        
        // If the user confirms, proceed with the delete operation
        if (isConfirmed) {
            try {
                await remove(dataRef);
                console.log('Data deleted successfully');
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    }

    return (
        <button className="delete" title="delete medicine" onClick={deleteAlert}><AiFillRest data-testid="delete-icon"/></button>
    );
}
