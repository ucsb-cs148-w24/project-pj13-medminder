import React, { useState } from "react";
import "./AlertPopup.css";
import "./ButtonStyles.css";
import { handleSubmit } from './formHandlers.js';
import { useUserId } from "../AuthContext";

export default function AlertPopup(props) {
    const userId = useUserId();
    const [medicineName, setMedicineName] = useState("");
    const [dosageAmount, setDosageAmount] = useState("");
    const [frequency, setFrequency] = useState("");
    const [time, setTime] = useState("");
    const [dosageUnits, setDosageUnits] = useState("");
    const [frequencyUnits, setFrequencyUnits] = useState("");

    const [popup, setPopup] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);

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
        setFrequency(props.frequency);
        setTime(props.time);
        setDosageUnits(props.dosageUnits);
        setFrequencyUnits(props.frequencyUnits);

        setSunday(props.day['sunday']);
        setMonday(props.day['monday']);
        setTuesday(props.day['tuesday']);
        setWednesday(props.day['wednesday']);
        setThursday(props.day['thursday']);
        setFriday(props.day['friday']);
        setSaturday(props.day['saturday']);
    };


    

    const clearForm = () => {
        setMedicineName("");
        setDosageAmount("");
        setFrequency("");
        setTime("");
        setDosageUnits("");
        setFrequencyUnits("");

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

        const timestamp = props.editing ? props.timestamp : new Date().toISOString().replace(/[.:]/g, '_');

        const formData = {
            timestamp,
            medicineName,
            dosageAmount,
            dosageUnits,
            time,
            frequency,
            frequencyUnits,
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
        handleSubmit(formData, userId, clearForm, togglePopup, timestamp);
    };

    if (popup) {
        document.body.classList.add("active-modal");
    }

    document.onkeydown = function (event) {
        if (event.key === "Escape") {
            setPopup(false);
        }
    };

    return (
        <>
            <button onClick={props.editing ? togglePopup2 : togglePopup} className={props.buttonDesign}>
                {props.TextInButton}
            </button>

            {popup && (
                <div className="modal">
                    <div onClick={togglePopup} className="overlay"></div>
                    <div className="modal-content">

                            <h1 className='main-header'>{props.editing ? `🦠 Edit a Medicine 💊` : `🦠 Add a Medicine 💊`}</h1>

                                <h4 className='header'>Medicine Name:</h4>
                                <input className='textbox'
                                    placeholder="Enter the name of the medicine..."
                                    value={medicineName}
                                    onChange={(e) => setMedicineName(e.target.value)}
                                />


                            


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
                            <input className='textbox-num'
                                type="number"
                                placeholder="Enter a number"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                            <select className='selector' value={frequencyUnits} onChange={(e) => setFrequencyUnits(e.target.value)}>
                                <option>-</option>
                                <option>Hours</option>
                            </select>



                            
                            <h4 className='header'>Day(s) Taking On:</h4>
                            <div className='row'>
                                <button 
                                    className='day-button' 
                                    style={{backgroundColor: sunday ? 'blue' : 'white', marginLeft: '15px' }}
                                    onClick={toggleSunday}>
                                        S
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleMonday}
                                    style={{ backgroundColor: monday ? 'blue' : 'white' }}>
                                        M
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleTuesday}
                                    style={{ backgroundColor: tuesday ? 'blue' : 'white' }}>
                                        T
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleWednesday}
                                    style={{ backgroundColor: wednesday ? 'blue' : 'white' }}>
                                        W
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleThursday}
                                    style={{ backgroundColor: thursday ? 'blue' : 'white' }}>
                                        T
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleFriday}
                                    style={{ backgroundColor: friday ? 'blue' : 'white' }}>
                                        F
                                </button>
                                <button 
                                    className='day-button' 
                                    onClick={toggleSaturday}
                                    style={{ backgroundColor: saturday ? 'blue' : 'white' }}>
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
