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
    

    // Get the day of the week as a number (0-6)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {data ? data.filter(alert => alert.day[days[props.date]] === true).map((alert) => ( 
                <Alert key={alert.timestamp} alert={alert}/>
            )) : 'Loading or no data...'}
        </div>
    );
};

export default DataDisplay;
