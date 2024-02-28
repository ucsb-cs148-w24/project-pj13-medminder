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
          const fdaGenericMedicineResponse = await fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name:%22${props.medicineName}%22&count=patient.reaction.reactionmeddrapt.exact`);
          const fdaBrandMedicineResponse = await fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:%22${props.medicineName}%22&count=patient.reaction.reactionmeddrapt.exact`);
          const fdaGenericMedicineData = await fdaGenericMedicineResponse.json();
          const fdaBrandMedicineData = await fdaBrandMedicineResponse.json();
          
          let terms = ""

          if (fdaBrandMedicineData.results === undefined && fdaGenericMedicineData.results === undefined){
            setMedicineInfo('Error fetching info');

          }else if (fdaGenericMedicineData.results === undefined){
            terms = fdaBrandMedicineData.results.slice(0, 6).map(entry => entry.term.toLowerCase());

          }else if (fdaBrandMedicineData.results === undefined){
            terms = fdaGenericMedicineData.results.slice(0, 6).map(entry => entry.term.toLowerCase());
            
          }else{
            const generic_count = fdaGenericMedicineData.results.slice(0, 1).map(entry => entry.count)
            const brand_count = fdaBrandMedicineData.results.slice(0, 1).map(entry => entry.count)
             
            if (generic_count > brand_count){
              terms = fdaGenericMedicineData.results.slice(0, 6).map(entry => entry.term.toLowerCase());
            
            }else{
              terms = fdaBrandMedicineData.results.slice(0, 6).map(entry => entry.term.toLowerCase());
            }
          }

          const filteredTerms = terms.filter(term => term !== 'drug ineffective');
         
          if (filteredTerms.length > 0) {
            setMedicineInfo('Most common side effects for ' + props.medicineName + ": " + filteredTerms.join(', '));
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
