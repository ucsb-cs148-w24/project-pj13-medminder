import React from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import '../Dash-style.css';

export default function CreateGCalEvent(props) {
    const accessToken = localStorage.getItem("accessToken"); //useAccessToken();

    const alertTime = "" + props.alert.time;
    const hours = Number(alertTime.substring(0, alertTime.indexOf(':')));
    const minutes = Number(("" + alertTime).substring(alertTime.indexOf(':') + 1));

    const date_target = props.dateObj;
    date_target.setHours(hours, minutes);


    const otherNotes = props.alert.otherNotes.length > 0 ? props.alert.otherNotes : 'none';
    const createEvent = () => {
        var event = {
          'summary': 'take ' + props.alert.medicineName + ' | reminder by MedMinder',
          'description': 'Dosage amount: ' + props.alert.dosageAmount + props.alert.dosageUnits + "\nOther notes: " + otherNotes,
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
    
        fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Event created: ', data);
        })
        .catch((error) => {
          console.error('Error creating event: ', error);
        });
    }

    return (
        <button className="addToCalendar" onClick={createEvent}>
            <AiFillCalendar/>
        </button>
    )
}