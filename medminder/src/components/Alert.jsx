import React from 'react';
import DeleteAlert from './DeleteAlert';
import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx"

// import { AiFillRest } from "react-icons/ai";
// import { AiFillEdit} from "react-icons/ai";
// import '../Dash-style.css';

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
      
    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = hours >= 12;
        const convertedHours = hours % 12 || 12;
        return `${convertedHours.toString()}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    };

      
    return (
        <div style={styles.container}>
            <p style={styles.detail}>{alert.medicineName}</p>
            <p style={styles.detail}>{alert.dosageAmount + " " + alert.dosageUnits}</p>
            <p style={styles.detail}>{convertTo12HourFormat(alert.time)}</p>
            <DeleteAlert timestamp={alert.timestamp} />
            <AlertPopupWithButton timestamp={alert.timestamp} medicineName={alert.medicineName} dosageAmount={alert.dosageAmount} 
              dosageUnits={alert.dosageUnits} frequency={alert.frequency} frequencyUnits={alert.frequencyUnits} otherNotes={alert.otherNotes} 
              time={alert.time} repeatWeek={alert.repeatWeek} day={alert.day} editing={true}/>
            

            {/* <button className="edit"><AiFillEdit /></button>
            <button className="delete"><AiFillRest /></button> */}
        </div>
    );
};

export default Alert;
