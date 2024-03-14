import { getDatabase, ref, set } from 'firebase/database';

export const update = (name, sex, age, dob, email, userId, togglePopup) => {
    const database = getDatabase();
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
    const userPref = {
        Email: true,
      };
    const userRef_preferences = ref(database, `Users/${userId}/UserPref`);
    set(userRef_preferences, userPref);
    console.log("updated!")
    togglePopup()

};