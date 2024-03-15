import { ref, set } from 'firebase/database';

export const update = (name, sex, age, dob, userId,email,  togglePopup, database) => {
    const userRef = ref(database, `Users/${userId}/UserInfo`);
    const updateInfo = {
        Name: name,
        Email: email,
        Sex: sex,
        Age: age,
        DOB: dob,
        }
    set(userRef, updateInfo).then(() => alert('Information updated!'))
    .catch((error) => alert('Failed to send data: ' + error.message));
    
    console.log("updated!")
    togglePopup()

};