import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuthContext } from './AuthContext';
import "./MedicineModal.css";

const MedicineModal = (props) => {
    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const [modalOpen, setModalOpen] = useState(false);
    const [medicationDetails, setMedicationDetails] = useState([]);
    
    useEffect(() => {
        // Run checkMedicationTime every 10 seconds
        const intervalId = setInterval(checkMedicationTime, 10000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
        // eslint-disable-next-line
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
                  
                if (filteredMedications.length > 0) {
                    setModalOpen(true);
                    setMedicationDetails(filteredMedications);
                }
            } else {
                console.log("No data available");
            }
            });
        } catch (error) {
            console.error('Error checking medication time:', error.message);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
      };
    
      return (
        <div>
          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                {medicationDetails.map(medication => (
                  <div key={medication.medicineName}>
                    <h2> Reminder to take {medication.dosageAmount} {medication.dosageUnits} of {medication.medicineName}! </h2>
                  </div>
                ))}
                <button className="button" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      );
};

export default MedicineModal;