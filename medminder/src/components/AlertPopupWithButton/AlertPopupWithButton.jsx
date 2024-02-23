import AlertPopup from "./AlertPopup.jsx"

function AlertPopupWithButton(props) {

    const buttonDesign = props.buttonDesign;
    const TextInButton = props.TextInButton;

  return (
    <>
      <AlertPopup timestamp={props.timestamp} medicineName={props.medicineName} dosageAmount={props.dosageAmount} 
        dosageUnits={props.dosageUnits} frequency={props.frequency} frequencyUnits={props.frequencyUnits}
        time={props.time} day={props.day} editing={props.editing} TextInButton={TextInButton} buttonDesign={buttonDesign}/>
    </>
  );
}

export default AlertPopupWithButton;
