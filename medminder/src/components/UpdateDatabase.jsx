import React from 'react';
import "./AlertPopupWithButton/AlertPopup.css";
import { getDatabase, ref, update } from 'firebase/database';
import { useAuthContext } from './AuthContext';
import { useState } from 'react';

const UpdateDatabase = (props) => {
  const newUser = props.user;
  const auth = useAuthContext();
  const [sex, setSex] = useState("")
  const[age, setAge] = useState(0)
  const[dob, setDob] = useState("00/00/0000")
  const handleSexChange = (e) => {
    setSex(e.target.value)
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value)
  };
  const handleDobChange = (e) => {
    setDob(e.target.value)
  };
  const handleDone = (e) =>{
    const userId = auth.currentUser.uid;
    const database = getDatabase();
    const userRef = ref(database, `Users/${userId}/UserInfo`);
    const updateInfo = {
      Sex: sex,
      Age: age,
      DOB: dob,
    };
  
    update(userRef, updateInfo).then(() => {
      console.log("User info updated successfully!");
    // You can redirect the user or do something else here
    }).catch((error) => {
      console.error("Error updating user info:", error);
    });
    e.preventDefault();
    

  }

  if(newUser){
    return (
      <div>
        <form>
      <input
        type="text"
        name="sex"
        placeholder="sex"
        value={sex}
        onChange={handleSexChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={age}
        onChange={handleAgeChange}
      />

      <input
        type="date"
        name="DOB"
        placeholder="Date of Birth"
        value={dob}
        onChange={handleDobChange}
      />
      <button type="submit" onClick={handleDone}>
        Done
      </button>
    </form>
          
      </div>
    );
  }
  };
  
  export default UpdateDatabase;