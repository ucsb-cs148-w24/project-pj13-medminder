import React from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import '../Dash-style.css';

export default function CreateGCalEvent(props) {
    const accessToken = localStorage.getItem("accessToken"); //useAccessToken();

    const alertTime = "" + props.alert.time;
    const hours = Number(alertTime.substring(0, alertTime.indexOf(':')));
    const minutes = Number(("" + alertTime).substring(alertTime.indexOf(':') + 1));

    const date_target = props.dateObj;
    try {date_target.setHours(hours, minutes);}
    catch {console.error('problem setting hours for gcal date');}

    const createEvent = async () => {
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
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          }
        })
        .then(response => response.json())
        .then(events => {
          retrievedEvents = events.items;
          console.log('Events retrieved: ', events.items);
        })
        .catch((error) => {
          console.error('Error retrieving events: ', error);
        });

        // looks at event, if event starts at the exact time of the current event + has the same description we consider it a dupe
        let dupeEvent = false;
        retrievedEvents.forEach((event) =>  {
            if(event.summary === 'take ' + props.alert.medicineName + ' | reminder by MedMinder')
              dupeEvent = true;
          }
        );
        
        if (!dupeEvent) {
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
        else {
          console.log('Event already exists!')
        }
    }

    return (
        <button title="add notification to google calendar" className="addToCalendar" onClick={createEvent}>
            <AiFillCalendar/>
        </button>
    )
}