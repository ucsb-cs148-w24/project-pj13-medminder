import { useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuthContext } from './AuthContext';
import Toastify from 'toastify-js';

const MedicineToast = (props) => {
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;

    useEffect(() => {
        // Run checkMedicationTime every 10 seconds
        const intervalId = setInterval(checkMedicationTime, 10000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
     }, [userId]); 
    

    const checkMedicationTime = async () => {
        try {
            const database = getDatabase();
            const dataRef = ref(database, 'Users/' + userId + '/UserData');
            let data = "";

            // Fetch the data
            onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                console.log("toast user id: " + userId);
            } else {
                console.log("No data available");
            }
            });
            const now = new Date();
            const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const currentDay = daysOfWeek[now.getDay()] || "unknown";
    
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const currentTime = `${hours}:${minutes}`;
            
            // For testing purposes, uncomment the code below and adjust to match 
            // your medicine day and medicine time
            // const currentDay = "friday";
            // const currentTime = "05:54";
  
            const filteredMedications = Object.values(data).filter(medication => {
                return medication.day[currentDay] && medication.time === currentTime;
              });
        
            const medicationDetails = filteredMedications.map(medication => ({
                medicineName: medication.medicineName,
                time: medication.time,
                days: medication.day
            }));
  
            console.log("currentTime: " + currentTime + " medicationTime: ", medicationDetails);
            
            medicationDetails.forEach(medication => {
                if (medication.time === currentTime && medication.days[currentDay]) {
        
                Toastify({
                    text: `It's time to take ${medication.medicineName}!`,
                    duration: 10000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom'
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
                }
            });
        } catch (error) {
            console.error('Error checking medication time:', error.message);
        }
    };

};

export default MedicineToast;
