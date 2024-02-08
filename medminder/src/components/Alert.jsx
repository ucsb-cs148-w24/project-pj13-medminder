import React from 'react';
import { AiFillEdit } from "react-icons/ai";
import { AiFillRest } from "react-icons/ai";
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


      // TODO: implement edit and delete button functionality based on key of Alert component
    return (
        <div style={styles.container}>
            <p style={styles.detail}>{alert.medicineName}</p>
            <p style={styles.detail}>{alert.dosageAmount + " " + alert.dosageUnits}</p>
            <p style={styles.detail}>{alert.time}</p>
            <button className="edit"><AiFillEdit /></button>
            
            <button className="delete"><AiFillRest /></button>
        </div>
    );
};

export default Alert;
