import React, { useState } from 'react';
import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx"
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import DeleteAlert from './DeleteAlert.jsx';
import MedicineInfoButton from './MedicineInfoButton.jsx';

const Alert = ({alert, displayTime}) => {
    const [opacity, setOpacity] = useState(1);

    const styles = {
        container: {
          opacity: opacity,
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
            <p style={styles.detail}>{convertTo12HourFormat(displayTime)}</p>
            <DeleteAlert timestamp={alert.timestamp}/>
            <AlertPopupWithButton timestamp={alert.timestamp} medicineName={alert.medicineName} dosageAmount={alert.dosageAmount} 
              dosageUnits={alert.dosageUnits} selectedHour={alert.selectedHour} selectedMinute={alert.selectedMinute}
              time={alert.time} day={alert.day} editing={true} TextInButton={<AiFillEdit />} buttonDesign={"edit"}/>
            <button className="complete" onClick={() => opacity === 1? setOpacity(.3) : setOpacity(1)}><AiFillCheckCircle/></button>
            <MedicineInfoButton medicineName={alert.medicineName}></MedicineInfoButton>
        </div>
    );
};

export default Alert;
