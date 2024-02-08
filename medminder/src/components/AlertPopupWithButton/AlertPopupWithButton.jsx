import AlertPopup from "./AlertPopup.jsx"

function AlertPopupWithButton(props) {

    const buttonDesign = props.buttonDesign;
    const TextInButton = props.TextInButton;

  return (
    <>
      <AlertPopup timestamp={props.timestamp} medicineName={props.medicineName} dosageAmount={props.dosageAmount} 
        dosageUnits={props.dosageUnits} frequency={props.frequency} frequencyUnits={props.frequencyUnits} otherNotes={props.otherNotes} 
        time={props.time} repeatWeek={props.repeatWeek} day={props.day} editing={props.editing} TextInButton={TextInButton} buttonDesign={buttonDesign}/>
    </>
  );
}

export default AlertPopupWithButton;
