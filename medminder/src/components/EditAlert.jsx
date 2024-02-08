import AlertPopupWithButton from "./AlertPopupWithButton/AlertPopupWithButton.jsx"


export default function EditAlert(props) {



    return (
        <AlertPopupWithButton timestamp={props.timestamp} medicineName={props.medicineName} dosageAmount={props.dosageAmount} 
              dosageUnits={props.dosageUnits} frequency={props.frequency} frequencyUnits={props.frequencyUnits} otherNotes={props.otherNotes} 
              time={props.time} repeatWeek={props.repeatWeek} day={props.day} editing={true}/>
    )
}