// formHandlers.js
import { ref, set } from 'firebase/database';
import { database } from '../../utils/firebase.utils'; // Ensure this path is correct

export const handleSubmit = (formData, userId, clearForm, togglePopup) => {
    // Sanitize the timestamp by replacing invalid characters
    const timestamp = new Date().toISOString().replace(/[.:]/g, '_');
    
    // Adjust the database reference to include the userId in the path
    const dataRef = ref(database, `Users/${userId}/UserData/` + timestamp);

    set(dataRef, formData)
        .then(() => alert('Data sent to Firebase!'))
        .catch((error) => alert('Failed to send data: ' + error.message));

    clearForm();
    togglePopup();
};

