import React, { useState, useEffect, useRef } from 'react';
import './Alert-style.css'; 
import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx";
import DeleteAlert from './DeleteAlert.jsx';
import MedicineInfoButton from './MedicineInfoButton.jsx';
import CreateGCalEvent from './AddAlertToGCal.jsx';

const Alert = ({ alert, displayTime, dateObj }) => {
    const [isComplete, setIsComplete] = useState(false);
    const [showMoreActions, setShowMoreActions] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowMoreActions(false);
            }
        };

        if (showMoreActions) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showMoreActions]);

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = hours >= 12;
        const convertedHours = hours % 12 || 12;
        return `${convertedHours.toString()}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    };

    return (
        <div className={`alert-container ${isComplete ? 'complete' : ''}`}>
            <div className={`complete-button ${isComplete ? 'filled' : ''}`} onClick={() => setIsComplete(!isComplete)}></div>
            <div className="alert-details">
                <p className="alert-detail">{alert.medicineName}</p>
                <p className="alert-detail">{alert.dosageAmount + " " + alert.dosageUnits}</p>
                <p className="alert-detail">{convertTo12HourFormat(displayTime)}</p>
            </div>
            <div>
                <div className="more-actions" onClick={(e) => { e.stopPropagation(); setShowMoreActions(!showMoreActions); }}>
                    ...
                </div>
                {showMoreActions && (
                    <div className="popup" ref={popupRef}>
                        <MedicineInfoButton className="action-item" medicineName={alert.medicineName}>Info</MedicineInfoButton>
                        <AlertPopupWithButton className="action-item" timestamp={alert.timestamp} medicineName={alert.medicineName} dosageAmount={alert.dosageAmount}
                            dosageUnits={alert.dosageUnits} selectedHour={alert.selectedHour} selectedMinute={alert.selectedMinute}
                            time={alert.time} day={alert.day} editing={true} TextInButton="Edit" buttonDesign={"edit"}>Edit</AlertPopupWithButton>
                        <CreateGCalEvent className="action-item" alert={alert} dateObj={dateObj}>Add to Calendar</CreateGCalEvent>
                        <DeleteAlert className="action-item" timestamp={alert.timestamp} date={dateObj}>Delete</DeleteAlert>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alert;
