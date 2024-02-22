import React, { useState, useEffect } from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { getDatabase, ref, onValue } from 'firebase/database';
import './MedicineInfoButton.css';

const MedicineInfoButton = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const database = getDatabase();
            const dataRef = ref(database, `Medicines/${props.medicineName}`);
            let description = "";

            onValue(dataRef, (snapshot) => {    
                if (snapshot.exists()) {
                    description = snapshot.val();
                    // console.log(`Description for ${props.medicineName}: ${description}`);
                    setMedicineInfo(description);
                }else {
                    // console.log(`No information found for ${props.medicineName}`);
                    setMedicineInfo('No info :(');
                }
            });
        } catch (error) {
            console.error('Error fetching medicine information:', error);
            setMedicineInfo('Error fetching info');
        }   
    };

    if (showPopup) {
      fetchData();
    }
  }, [props.medicineName, showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  document.onkeydown = function (event) {
    if (event.key === 'Escape') {
      setShowPopup(false);
    }
  };

  return (
    <div>
      <button className="complete" onClick={openPopup}>
        <BsFillInfoCircleFill />
      </button>

      {showPopup && (
        <div className="info-modal">
          <div className="info-modal-content">
            <p>{medicineInfo}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineInfoButton;
