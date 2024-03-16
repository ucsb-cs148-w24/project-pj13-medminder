// formHandlers.js
import { ref, set } from 'firebase/database';
import { database } from '../../utils/firebase.utils'; // Ensure this path is correct
import Toastify from 'toastify-js';

export const handleSubmit = (formData, userId, clearForm, togglePopup, timestamp, userProfile) => {
    // Adjust the database reference to include the userId in the path
    const dataRef = ref(database, `Users/${userId}/${userProfile}/` + timestamp);

    set(dataRef, formData)
        .then(() => 
        Toastify({
        text: "Alert created!",
        duration: 3000,
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "#00b09b",
        },
        offset: {
        y: 95
        },
    }).showToast())
        .catch((error) => 
        Toastify({
        text: "Failed to send data.",
        duration: 3000,
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "#b50505",
        },
        offset: {
        y: 95
        },
    }).showToast());

    clearForm();
    togglePopup();
};

