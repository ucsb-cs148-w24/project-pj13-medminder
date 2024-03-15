import React from 'react';
import '../Dash-style.css';
import { useState } from 'react';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { nanoid } from 'nanoid';


export default function CreateGCalEvent(props) {
    const [disableButton, setDisableButton] = useState(false);
    const accessToken = localStorage.getItem("accessToken"); //useAccessToken();

    

    const createEvent = async () => {
      const alertTime = "" + props.time;
      const hours = Number(alertTime.substring(0, alertTime.indexOf(':')));
      const minutes = Number(("" + alertTime).substring(alertTime.indexOf(':') + 1));

      const date_target = props.dateObj;
      try {date_target.setHours(hours, minutes);}
      catch {console.error('problem setting hours for gcal date');}

      setDisableButton(true);
        let event = {
          'summary': 'take ' + props.alert.medicineName + ' | reminder by MedMinder',
          'description': 'Dosage amount: ' + props.alert.dosageAmount + props.alert.dosageUnits,
          'start': {
            'dateTime': date_target.toISOString(),
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': date_target.toISOString(),
            'timeZone': 'America/Los_Angeles',
          },
          'reminders': {
            'useDefault': true
          },
        };
        
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

        if (sessionExpired) {
          setDisableButton(false);
          return;
        }

        // looks at event, if event starts at the exact time of the current event + has the same description we consider it a dupe
        let dupeEvent = false;
        retrievedEvents.forEach((event) =>  {
            if(event.summary === 'take ' + props.alert.medicineName + ' | reminder by MedMinder')
              dupeEvent = true;
          }
        );
        
        if (!dupeEvent) {
          await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
          })
          .then(response => response.json())
          .then(data => {
            setDisableButton(false);
            Toastify({
              text: "Event created for " + props.alert.medicineName + " at " + props.time,
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
            console.log('Event created: ', data);
          })
          .catch((error) => {
            Toastify({
              text: "An internal error occurred",
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
            setDisableButton(false);
            console.error('Error creating event: ', error);
          });
        }
        else {
          Toastify({
            text: "Event already exists!",
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
          setDisableButton(false);
        }
    }

    return (
      <button title="add notification to google calendar" className="addToCalendar" onClick={createEvent} disabled={disableButton} key={nanoid()}>
          Add to Cal
      </button>
    )
}