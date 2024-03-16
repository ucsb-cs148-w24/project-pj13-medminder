import { ref, set } from 'firebase/database';

import Toastify from 'toastify-js';


export const Update = (name, sex, age, dob, userId,email,  togglePopup, database, numProfile) => {
    const userRef = ref(database, `Users/${userId}/UserInfo`);
    const updateInfo = {
        Name: name,
        Email: email,
        Sex: sex,
        Age: age,
        DOB: dob,
        numProfiles: numProfile
        }
    set(userRef, updateInfo).then(() => Toastify({
        text: "Updated profile!",
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
    .catch((error) => Toastify({
        text: "Update failed!",
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
    
    console.log("updated!")
    togglePopup()

};