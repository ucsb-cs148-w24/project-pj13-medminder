import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Alert from './Alert';
import { useAuthContext } from './AuthContext';

const DataDisplay = (props) => {
    const [data, setData] = useState([]);
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const fetchData = () => {
            const database = getDatabase();
            const dataRef = ref(database, 'Users/' + userId + '/UserData');

            onValue(dataRef, (snapshot) => {
                if (snapshot.exists()) {
                    const newData = Object.values(snapshot.val()).map((item, index) => ({
                        ...item,
                        id: Object.keys(snapshot.val())[index] // Assuming each item's key is its id
                    })).sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));

                    setData(newData);
                } else {
                    console.log("No data available");
                }
            });
        };

        fetchData(); // Call fetchData within useEffect
    }, [userId]);

    // Handler to be called when an alert is deleted
    const handleAlertDelete = (deletedAlertId) => {
        setData(currentData => currentData.filter(alert => alert.id !== deletedAlertId));
    };

    // Rendering logic remains mostly unchanged
    // The key change is passing handleAlertDelete down to each Alert component
    const alertComponents = data.map((alert) => (
        <Alert 
            key={alert.id}
            alert={alert}
            displayTime={alert.time} // Or any other logic you use to determine displayTime
            dateObj={props.dateObj}
            onDelete={() => handleAlertDelete(alert.id)} // Passing the delete handler down
        />
    ));

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {alertComponents.length > 0 ? alertComponents : 'Create an alert!'}
        </div>
    );
};

export default DataDisplay;
