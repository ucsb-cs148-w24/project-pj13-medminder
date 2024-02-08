import React, { useState } from 'react';
import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx"
import { useAuthContext } from './AuthContext';
import { ref, remove } from 'firebase/database';
import { database } from '../utils/firebase.utils';

import { AiFillEdit } from "react-icons/ai";
import '../Dash-style.css';

const Alert = ({alert}) => {

    const styles = {
        container: {
          padding: '0px',
          margin: '15px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        detail: {
          margin: '0 50px',
          fontSize: '17px',
          fontFamily: 'Bahnschrift',
        },
        button: {
          margin: '0 5px',
          fontSize: '15px',
          fontFamily: 'Bahnschrift',
        }
      };


      const auth = useAuthContext();
      const userId = auth.currentUser.uid;
      const dataRef = ref(database, 'Users/' + userId + '/UserData/' + alert.timestamp);
      const [deleted, setDeleted] = useState(false);

      const deleteAlert = () => {
        remove(dataRef)
          .then(() => {
            console.log('Data deleted successfully');
            setDeleted(true);
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }

      if (deleted) {
        return null;
      }


      
    return (
        <div style={styles.container}>
            <p style={styles.detail}>{alert.medicineName}</p>
            <p style={styles.detail}>{alert.dosageAmount + " " + alert.dosageUnits}</p>
            <p style={styles.detail}>{alert.time}</p>
            <button onClick={deleteAlert}>DeleteAlert</button>
            <AlertPopupWithButton timestamp={alert.timestamp} medicineName={alert.medicineName} dosageAmount={alert.dosageAmount} 
              dosageUnits={alert.dosageUnits} frequency={alert.frequency} frequencyUnits={alert.frequencyUnits} otherNotes={alert.otherNotes} 
              time={alert.time} repeatWeek={alert.repeatWeek} day={alert.day} editing={true} TextInButton={<AiFillEdit />} buttonDesign={"edit"}/>
            

            {/* <button className="edit"><AiFillEdit /></button>
            <button className="delete"><AiFillRest /></button> */}
        </div>
    );
};

export default Alert;
