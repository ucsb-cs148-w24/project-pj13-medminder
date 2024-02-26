import React, { useState, useEffect } from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import './MedicineInfoButton.css';

const MedicineInfoButton = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {  
            // Make API request to FDA API
            const fdaApiResponse = await fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name:%22${props.medicineName}%22&count=patient.reaction.reactionmeddrapt.exact`);
            const fdaApiData = await fdaApiResponse.json();
            const terms = fdaApiData.results.slice(0, 5).map(entry => entry.term.toLowerCase());
      
            if (terms.length > 0) {
              setMedicineInfo('Most common side effects for ' + props.medicineName + ": " + terms.join(', '));
            } else {
              setMedicineInfo('Medicine Side Effects not found');
            }

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
