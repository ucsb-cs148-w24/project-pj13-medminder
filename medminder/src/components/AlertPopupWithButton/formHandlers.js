// formHandlers.js
import { ref, set } from 'firebase/database';
import { database } from '../../utils/firebase.utils'; // Ensure this path is correct

export const handleSubmit = (formData, userId, clearForm, togglePopup, timestamp, userProfile) => {
    // Adjust the database reference to include the userId in the path
    const dataRef = ref(database, `Users/${userId}/${userProfile}/` + timestamp);

    set(dataRef, formData)
        .then(() => alert('Alert has been successfully created!'))
        .catch((error) => alert('Failed to send data: ' + error.message));

    clearForm();
    togglePopup();
};

