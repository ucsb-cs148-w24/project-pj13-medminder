import React, { useEffect, useState } from "react";
import "./AlertPopup.css";
import "./ButtonStyles.css";
import { handleSubmit } from './formHandlers.js';
import { useUserId } from "../AuthContext";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useAuthContext } from '../AuthContext';
import { CiMicrophoneOn } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";



export default function AlertPopup(props) {
    const auth = useAuthContext();
    const userProfile = auth.currentProfile;
    
    const userId = useUserId();
    const [medicineName, setMedicineName] = useState("");
    const [dosageAmount, setDosageAmount] = useState("");
    const [time, setTime] = useState("");
    const [dosageUnits, setDosageUnits] = useState("-");
    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedMinute, setSelectedMinute] = useState("00");

    const [popup, setPopup] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
  
    const handleHourChange = (event) => {
      setSelectedHour(parseInt(event.target.value));
    };
  
    const handleMinuteChange = (event) => {
      setSelectedMinute(parseInt(event.target.value));
    };

    const togglePopup = () => {
        setPopup(!popup);
    };
    const toggleSunday = () => {
        setSunday(!sunday);
    };
    const toggleMonday = () => {
        setMonday(!monday);
    };
    const toggleTuesday = () => {
        setTuesday(!tuesday);
    };
    const toggleWednesday = () => {
        setWednesday(!wednesday);
    };
    const toggleThursday = () => {
        setThursday(!thursday);
    };
    const toggleFriday = () => {
        setFriday(!friday);
    };
    const toggleSaturday = () => {
        setSaturday(!saturday);
    };

    const togglePopup2 = () => {
        setPopup(!popup);

    
        

        setMedicineName(props.medicineName);
        setDosageAmount(props.dosageAmount);
        setTime(props.time);
        setDosageUnits(props.dosageUnits);
        setSelectedHour(props.selectedHour);
        setSelectedMinute(props.selectedMinute);

        setSunday(props.day['sunday']);
        setMonday(props.day['monday']);
        setTuesday(props.day['tuesday']);
        setWednesday(props.day['wednesday']);
        setThursday(props.day['thursday']);
        setFriday(props.day['friday']);
        setSaturday(props.day['saturday']);
    };

    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
        } = useSpeechRecognition();
    
    const clearForm = () => {
        setMedicineName("");
        setDosageAmount("");
        setTime("");
        setDosageUnits("");
        setSelectedHour("00");
        setSelectedMinute("00")

        setSunday(false);
        setMonday(false);
        setTuesday(false);
        setWednesday(false);
        setThursday(false);
        setFriday(false);
        setSaturday(false);
    }

    const submitForm = (event) => {
        event.preventDefault();

        if (medicineName==="") {
            alert("Please enter a medicine name")
        }
        else if (dosageAmount==="" || dosageUnits==="-") {
            alert("Please enter an amount or units for your dosage")
        }
        else if (time==="") {
            alert("Please enter a time to take your medicine")
        }
        else if (
            !sunday &&
            !monday &&
            !tuesday &&
            !wednesday &&
            !thursday &&
            !friday &&
            !saturday
        ) {
            alert("Please select a day to set the alert for")
        }

        else {
            const timestamp = props.editing ? props.timestamp : new Date().toISOString().replace(/[.:]/g, '_');

            const formData = {
                timestamp,
                medicineName,
                dosageAmount,
                dosageUnits,
                time,
                selectedHour,
                selectedMinute,
                day: {
                    sunday,
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday
                },
            };
    
            // Pass formData and other necessary arguments to handleSubmit
            handleSubmit(formData, userId, clearForm, togglePopup, timestamp, userProfile);
        }
    };

    if (popup) {
        document.body.classList.add("active-modal");
    }

    document.onkeydown = function (event) {
        if (event.key === "Escape") {
            setPopup(false);
        }
    };
    useEffect(() =>{
        setMedicineName(transcript)
    }, [transcript])

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
    
    return (
        <>
            <button onClick={props.editing ? togglePopup2 : togglePopup} className={props.buttonDesign} title="edit medicine">
                {props.TextInButton}
            </button>

            {popup && (
                <div className="modal">
                    <div onClick={togglePopup} className="overlay"></div>
                    <div className="modal-content">

                            <h1 className='main-header'>{props.editing ? `🦠 Edit a Medicine 💊` : `🦠 Add a Medicine 💊`}</h1>
                            
                            
                                <h4 className='header'>Medicine Name:</h4>
                                <div className="row">
                                <input className='textbox'
                                    placeholder="Enter the name of the medicine..."
                                    value={medicineName}
                                    onChange={(e) => setMedicineName(e.target.value)}
                                />
                                <p>   Mic: {listening ? 'on' : 'off'}</p>
                                <button
                                    className="mic"
                                    onTouchStart={startListening}
                                    onMouseDown={startListening}
                                    onTouchEnd={SpeechRecognition.abortListening}
                                    onMouseUp={SpeechRecognition.abortListening}
                                    title="hold mic icon to say medicine name"
                                    ><CiMicrophoneOn /></button>
                                <button className="reset" title="reset medicine name" onClick={resetTranscript}><GrPowerReset />
                                </button>
                                </div>
                                
                                
                                


                            


                                <h4 className='header'>Dosage Amount:</h4>
                                <input className='textbox-num'
                                    type="number"
                                    placeholder="Enter a number"
                                    value={dosageAmount}
                                    onChange={(e) => setDosageAmount(e.target.value)}
                                />

                                <select className='selector' value={dosageUnits} onChange={(e) => setDosageUnits(e.target.value)}>
                                    <option>-</option>
                                    <option>ml</option>
                                    <option>mg</option>
                                    <option>puffs</option>
                                    <option>tablets</option>
                                    <option>pills</option>
                                    <option>drops</option>
                                </select>




                            <h4 className='header'>Time for Upcoming Dose:</h4>
                            <input className='textbox'
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />




                            <h4 className='header'>Repeat Alarm Every:</h4>

                            <div className='row'>
                                <div className='random-text2'>
                                    Hours
                                </div>
                                <div className='random-text3'>
                                    Minutes
                                </div>
                            </div>

                            <div className='row'>
                                <select className='hour-selector' value={selectedHour} onChange={handleHourChange}>
                                    {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i < 10 ? `0${i}` : i}
                                    </option>
                                    ))}
                                </select>
                                <select className='minute-selector' value={selectedMinute} onChange={handleMinuteChange}>
                                    {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i * 5} value={i * 5}>
                                        {i * 5 < 10 ? `0${i * 5}` : i * 5}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="random-text">
                                Leave both fields above blank for non repeating alerts within one day
                            </div>



                            
                            <h4 className='header'>Day(s) Taking On:</h4>
                            <div className='row'>
                                <button 
                                    className='day-button' 
                                    style={{backgroundColor: sunday ? 'yellow' : 'white', marginLeft: '15px' }}
                                    onClick={toggleSunday}>
                                        S
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleMonday}
                                    style={{ backgroundColor: monday ? 'yellow' : 'white' }}>
                                        M
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleTuesday}
                                    style={{ backgroundColor: tuesday ? 'yellow' : 'white' }}>
                                        T
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleWednesday}
                                    style={{ backgroundColor: wednesday ? 'yellow' : 'white' }}>
                                        W
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleThursday}
                                    style={{ backgroundColor: thursday ? 'yellow' : 'white' }}>
                                        T
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleFriday}
                                    style={{ backgroundColor: friday ? 'yellow' : 'white' }}>
                                        F
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleSaturday}
                                    style={{ backgroundColor: saturday ? 'yellow' : 'white' }}>
                                        S
                                </button>
                            </div>



                            
                        <button className="submit-modal" onClick={(e) => submitForm(e)}>SUBMIT 🥳</button> 
                        <button className="clear-modal" onClick={clearForm}>CLEAR FORM 😖</button>
                        <button className="close-modal" onClick={togglePopup}>CLOSE 🥺</button>
                    </div>
                </div>
            )}
        </>
    );
}
