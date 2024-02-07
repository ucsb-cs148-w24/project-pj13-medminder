import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useUserId } from './UserIdContext';
import Alert from './Alert';

const DataDisplay = (props) => {
    const [data, setData] = useState([]);
    const { userId } = useUserId();
    const [localUserId, setLocalUserId] = useState();
    
    useEffect(() => { 
        if (userId != null){
            localStorage.setItem("localUserId", userId);
        }
        setLocalUserId(localStorage.getItem("localUserId"));
    }, [userId]);

    useEffect(() => {
        const database = getDatabase();

        const dataRef = ref(database, 'Users/' + localUserId + '/UserData');

        // Fetch the data
        onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
            setData(snapshot.val());
            console.log(data);
        } else {
            console.log("No data available");
        }
        },);
    }, [localUserId, data]);
    

    // Get the day of the week as a number (0-6)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return (
        <div style={{ textAlign: 'center', marginTop: '20px'  }}>
            {data ? Object.values(data).filter(alert => alert.day[days[props.date]] === true).map((alert) => ( 
                <Alert key={alert} alert={alert}/>
            )) : 'Loading or no data...'}
        </div>
    );
};

export default DataDisplay;
