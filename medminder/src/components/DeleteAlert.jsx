import React from 'react';
import { ref, remove } from 'firebase/database';
import { database } from '../utils/firebase.utils';
import { useAuthContext } from './AuthContext';
import { AiFillRest } from "react-icons/ai";
import '../Dash-style.css';

export default function DeleteAlert(props) {
    const { onDelete, timestamp } = props; // Destructure props for easier access
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const dataRef = ref(database, 'Users/' + userId + '/UserData/' + timestamp);

    const deleteAlert = async () => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to remove this medicine?');
        
        // If the user confirms, proceed with the delete operation
        if (isConfirmed) {
            try {
                await remove(dataRef);
                console.log('Data deleted successfully');
                if (onDelete) {
                    onDelete(timestamp); // Call the onDelete callback function passed via props
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };

    return (
        <button className="delete" onClick={deleteAlert}><AiFillRest data-testid="delete-icon"/></button>
    );
}
