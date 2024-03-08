import React, { useState } from 'react';
import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx"
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
import DeleteAlert from './DeleteAlert.jsx';
import MedicineInfoButton from './MedicineInfoButton.jsx';
import CreateGCalEvent from './AddAlertToGCal.jsx';

const Alert = ({alert, displayTime, dateObj}) => {
  const [opacity, setOpacity] = useState(1);

  const styles = {
      container: {
        background: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Optional: add shadow for depth
        borderRadius: '10px', // Optional: round the corners
        padding: '15px', // Add padding to prevent content from touching the edges
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacity, // Keep your dynamic opacity
        transition: 'opacity 0.3s ease', // Smooth transition for opacity change
        width: '80%', // Changed width to 80% of the parent container
          maxWidth: '800px',
      },
      detail: {
        margin: '0 50px',
        fontSize: '25px',
      },
      
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
            <DeleteAlert timestamp={alert.timestamp} date={dateObj}/>
            <AlertPopupWithButton timestamp={alert.timestamp} medicineName={alert.medicineName} dosageAmount={alert.dosageAmount} 
              dosageUnits={alert.dosageUnits} selectedHour={alert.selectedHour} selectedMinute={alert.selectedMinute}
              time={alert.time} day={alert.day} editing={true} TextInButton={<AiFillEdit />} buttonDesign={"edit"}/>
            <button className="complete" onClick={() => opacity === 1? setOpacity(.3) : setOpacity(1)}><AiFillCheckCircle/></button>
            <MedicineInfoButton medicineName={alert.medicineName}></MedicineInfoButton>
            <CreateGCalEvent alert={alert} dateObj={dateObj}/>
        </div>
    );
};

export default Alert;
