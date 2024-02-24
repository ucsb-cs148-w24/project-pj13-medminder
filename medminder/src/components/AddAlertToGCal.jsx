import React from 'react';

export default function CreateGCalEvent(props) {
    const accessToken = localStorage.getItem("accessToken"); //useAccessToken();

    const createEvent = () => {
        console.log(accessToken);
        var event = {
          'summary': props.alert.medicineName,
          'description': 'dummy medicine alert to be updated',
          'start': {
            'dateTime': '2024-02-25T12:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': '2024-02-25T12:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10},
            ],
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
          console.log('access token: ', accessToken);
        })
        .catch((error) => {
          console.error('Error creating event: ', error);
        });
        console.log("completed");
    }

    return (
        <button className="createGEvent" onClick={createEvent}>
            Add to Gcal
        </button>
    )
}