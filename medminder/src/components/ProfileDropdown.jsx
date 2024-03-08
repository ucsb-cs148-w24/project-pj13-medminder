import React, { useState, useContext, useEffect } from 'react';
import { useAuthContext, AuthContext } from './AuthContext';
import { ref, set, onValue, query, get, } from 'firebase/database';
import { database } from '../utils/firebase.utils';

function ProfileDropdown() {
  const auth = useAuthContext();
  const userId = auth.currentUser.uid;
  const { setCurrentProfile } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [numProfiles, setNumProfiles] = useState(1);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const userRef = ref(database, `Users/${userId}/UserInfo/numProfiles`);
    const check = query(userRef);
    // Check if numProfiles exists and set it
    get(check).then((snapshot) => {
      if (snapshot.exists()) {
        console.log('Has numProfiles');
        setNumProfiles(snapshot.val()); // Update state if numProfiles exists
      } else {
        console.log('Updates');
        set(userRef, 1); // Initialize numProfiles in the database if it doesn't exist
      }
    }).catch((error) => {
        console.error('Error querying the database:', error);
    });
  }, [userId]); // This effect should run only once or when userId changes

  useEffect(() => {
    const userRef = ref(database, `Users/${userId}/UserInfo/numProfiles`);
    // Listen for real-time updates to numProfiles
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
          const currentNumProfiles = snapshot.val();
          setNumProfiles(currentNumProfiles); // Update state with the current value
          let profileArray = [];
          for (let i = 1; i <= currentNumProfiles; i++) {
            profileArray.push('Profile ' + i);
          }
          setProfiles(profileArray);
      } else {
          console.log("No data available");
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [userId]);

  // Function to handle adding a new item
  const handleAddProfile = () => {
    const isConfirmed = window.confirm("Are you sure you want to add a new profile?");
    if (isConfirmed){
      const userRef = ref(database, `Users/${userId}/UserInfo/numProfiles`);
      const newNumProfiles = numProfiles + 1;
      setNumProfiles(newNumProfiles); // Update state
      set(userRef, newNumProfiles); // Update database
    }
  };

  const handleSelectChange = (event) => {
    let selectedProfile = String(event.target.value).replace("Profile ", "UserData");
    if (selectedProfile === "UserData1"){
      selectedProfile = "UserData";
    }
    setCurrentProfile(selectedProfile);
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <select onChange={handleSelectChange} value={selectedItem}>
        {profiles.map((profile, index) => (
          <option key={index} value={profile}>{profile}</option>
        ))}
      </select>
      <button onClick={handleAddProfile}>Add A Profile</button>
    </div>
  );
}

export default ProfileDropdown;