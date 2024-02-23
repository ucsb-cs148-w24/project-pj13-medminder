import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Alert from './Alert';
import { useAuthContext } from './AuthContext';

const DataDisplay = (props) => {
    const [data, setData] = useState([]);
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const database = getDatabase();
        const dataRef = ref(database, 'Users/' + userId + '/UserData');

        // Fetch the data
        onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
            setData(Object.values(snapshot.val()).sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)));
            console.log(userId);
        } else {
            console.log("No data available");
        }
        },);
    }, [userId]);
    
    const addHoursToTime = (timeString, hoursToAdd) => {
        let [hours, minutes] = timeString.split(':').map(Number);

        let totalMinutes = hours * 60 + minutes;
        totalMinutes += hoursToAdd * 60;
        
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        if (newHours > 24 || (newHours === 24 && newMinutes > 0)){
            return -1;
        }
        const formattedHours = newHours.toString().padStart(2, '0');
        const formattedMinutes = newMinutes.toString().padStart(2, '0');
        
        return `${formattedHours}:${formattedMinutes}`;
    }

    // Get the day of the week as a number (0-6)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    // Array of Alerts to be rendered
    let alertArray = [];

    // Filter for alerts that will be displayed today
    const currentData = data.filter(alert => alert.day[days[props.date]] === true);

    // Push Alerts to aray based on frequency
    for (let i = 0; i < currentData.length; i++) {
        // If frequenmcy is not valid or evals to <= 0 push base time with no repeats
        if (isNaN(Number(currentData[i].frequency)) || Number(currentData[i].frequency) <= 0){
            alertArray.push(<Alert key={currentData[i].time} alert={currentData[i]} displayTime={currentData[i].time}/>);
            continue;
        }

        // Push Alerts to array based on frequency while updatedTime <= 24:00
        let j = 0;
        let updatedTime = 0;
        while(updatedTime !== -1){
            updatedTime = addHoursToTime(currentData[i].time, Number(currentData[i].frequency) * j);
            if (updatedTime !== -1){
                alertArray.push(<Alert key={updatedTime} alert={currentData[i]} displayTime={updatedTime}/>);
            }
            j++;
        }
    }

    // Sort array of Alerts by displayTime
    alertArray.sort((a,b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0));

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {data ? alertArray : 'Loading or no data...'}
        </div>
    );
};

export default DataDisplay;
