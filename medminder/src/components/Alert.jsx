import React, { useState, useEffect, useRef } from 'react';
import './Alert-style.css'; 
import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx";
import DeleteAlert from './DeleteAlert.jsx';
import MedicineInfoButton from './MedicineInfoButton.jsx';
import CreateGCalEvent from './AddAlertToGCal.jsx';
import Toastify from 'toastify-js';

const Alert = ({ alert, displayTime, dateObj, causedByDelete, setCausedByDelete, deletingTimestamp}) => {
    const [isComplete, setIsComplete] = useState(false);
    const [showMoreActions, setShowMoreActions] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
      return () => {
        const deleteOnDismount = async () => {
          console.log("HOOOOKAH HOOOKAH POOOKAH");
          const accessToken = localStorage.getItem("accessToken");


          const alertTime = "" + displayTime;
          const hours = Number(alertTime.substring(0, alertTime.indexOf(':')));
          const minutes = Number(("" + alertTime).substring(alertTime.indexOf(':') + 1));

          const date_target = dateObj;
          try {date_target.setHours(hours, minutes);}
          catch {console.error('problem setting hours for gcal date');}
          
          let oneMin = 60000;

          const timeMin = new Date(date_target.getTime() - oneMin);
          const timeMax = new Date(date_target.getTime() + oneMin);
          const params = new URLSearchParams({
            'calendarId': 'primary',
            'timeMin': timeMin.toISOString(),
            'timeMax': timeMax.toISOString()
          })


          let retrievedEvents = [];
          let sessionExpired = false;
          await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
            }
          })
          .then(response => response.json())
          .then(events => {
            if (events.error) {
              Toastify({
                text: "Google auth session expired, please login again to use google calendar",
                duration: 3000,
                newWindow: false,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "#000000",
                },
                offset: {
                  y: 95
                },
              }).showToast();
              sessionExpired = true;
              return;
            }
            else {
              retrievedEvents = events.items;
            }
          })
          .catch((error) => {
            console.error('Error retrieving events: ', error);
          });
          console.log(retrievedEvents);
          let trueEvent = false;
          if (sessionExpired || retrievedEvents.length === 0) {
            console.log("session expired or no gcal event");
            return;
          }
          else {
            retrievedEvents.forEach((event) =>  {
                if(event.summary === 'take ' + alert.medicineName + ' | reminder by MedMinder')
                  trueEvent = true;
              }
            );
          }

          if (trueEvent) {
            // delete first and make notification
            const eventId = retrievedEvents[0].id;
            const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              }
            })
            if (res.status === 204) {
              Toastify({
                text: "Google calendar event deleted for " + alert.medicineName + " at " + convertTo12HourFormat(displayTime),
                duration: 3000,
                newWindow: false,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "#00b09b",
                },
                offset: {
                  y: 95
                },
              }).showToast();
              console.log("Event deleted on calendar: " + alert.medicineName + " at " + convertTo12HourFormat(displayTime));
            }
            else {
              const error = await res.text;
              Toastify({
                text: "Alert deleted but calendar event deletion failed.",
                duration: 3000,
                newWindow: false,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "#b50505",
                },
                offset: {
                  y: 95
                },
              }).showToast();
              console.error('Error deleting event: ', error);
            }
          }
        }

        if (causedByDelete && deletingTimestamp === alert.timestamp)
          deleteOnDismount();
      };
    }, [causedByDelete]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <div className="popup-alerts" ref={popupRef}>
                        <MedicineInfoButton className="action-item" medicineName={alert.medicineName}>Info</MedicineInfoButton>
                        <AlertPopupWithButton className="action-item" timestamp={alert.timestamp} medicineName={alert.medicineName} dosageAmount={alert.dosageAmount}
                            dosageUnits={alert.dosageUnits} selectedHour={alert.selectedHour} selectedMinute={alert.selectedMinute}
                            time={alert.time} day={alert.day} editing={true} TextInButton="Edit" buttonDesign={"edit"}>Edit</AlertPopupWithButton>
                        <CreateGCalEvent className="action-item" alert={alert} dateObj={dateObj} time={displayTime}>Add to Calendar</CreateGCalEvent>
                        <DeleteAlert className="action-item" timestamp={alert.timestamp} date={dateObj} onCalendarDelete={setCausedByDelete}>Delete</DeleteAlert>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alert;
