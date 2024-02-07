import React, { useState } from "react";
import "./AlertPopup.css";
import "./ButtonStyles.css";
import { handleSubmit } from './formHandlers.js';
import { useUserId } from '../UserIdContext';

export default function AlertPopup(props) {
    const { userId } = useUserId();
    const [medicineName, setMedicineName] = useState("");
    const [otherNotes, setOtherNotes] = useState("");
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
    const [repeatWeek, setRepeatWeek] = useState(false);

    const togglePopup = () => {
        setPopup(!popup);
    };

    

    const clearForm = () => {
        setMedicineName("");
        setOtherNotes("");
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
        setRepeatWeek(false);
    }

    const submitForm = (event) => {
        event.preventDefault();

        const timestamp = new Date().toISOString();

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
            repeatWeek,
            otherNotes
        };

        // Pass formData and other necessary arguments to handleSubmit
        handleSubmit(formData, userId, clearForm, togglePopup);
    };

    if (popup) {
        document.body.classList.add("active-modal");
    }

    return (
        <>
            <button onClick={togglePopup} className={props.buttonDesign}>
                {props.TextInButton}
            </button>

            {popup && (
                <div className="modal">
                    <div onClick={togglePopup} className="overlay"></div>
                    <div className="modal-content">
                        <form className="form">
                            <h1 className="header">🦠 Add a Medicine 💊</h1>

                                <h4>Medicine Name:</h4>
                                <input
                                    placeholder="Enter the name of the medicine..."
                                    value={medicineName}
                                    onChange={(e) => setMedicineName(e.target.value)}
                                />
                            


                            <div className="row">
                                <h4>Dosage Amount:</h4>
                                <input
                                    type="number"
                                    placeholder="enter a number"
                                    value={dosageAmount}
                                    onChange={(e) => setDosageAmount(e.target.value)}
                                />

                                <h4>Dosage Units:</h4>
                                <select value={dosageUnits} onChange={(e) => setDosageUnits(e.target.value)}>
                                    <option>-</option>
                                    <option>ml</option>
                                    <option>mg</option>
                                    <option>puffs</option>
                                    <option>tablets</option>
                                    <option>pills</option>
                                    <option>drops</option>
                                </select>
                            </div>




                            <h4>Time for Upcoming Dose:</h4>
                            <input
                                type="time"
                                placeholder="select the time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />




                            <div className="row">
                                <h4>Repeat Alarm Every:</h4>
                                <input
                                    type="number"
                                    placeholder="enter a number"
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                />

                                <h4>Frequency Units:</h4>
                                <select value={frequencyUnits} onChange={(e) => setFrequencyUnits(e.target.value)}>
                                    <option>-</option>
                                    <option>Minutes</option>
                                    <option>Hours</option>
                                </select>
                            </div>




                            <h4>Day(s) Taking On:</h4>
                            <div className="row">
                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={sunday}
                                        onChange={(e) => setSunday(e.target.checked)}
                                    />
                                    Sunday
                                </label>
                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={monday}
                                        onChange={(e) => setMonday(e.target.checked)}
                                    />
                                    Monday
                                </label>                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={tuesday}
                                        onChange={(e) => setTuesday(e.target.checked)}
                                    />
                                    Tuesday
                                </label>                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={wednesday}
                                        onChange={(e) => setWednesday(e.target.checked)}
                                    />
                                    Wednesday
                                </label>                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={thursday}
                                        onChange={(e) => setThursday(e.target.checked)}
                                    />
                                    Thursday
                                </label>                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={friday}
                                        onChange={(e) => setFriday(e.target.checked)}
                                    />
                                    Friday
                                </label>                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={saturday}
                                        onChange={(e) => setSaturday(e.target.checked)}
                                    />
                                    Saturday
                                </label>
                            </div>




                            <h4>Additional Notes:</h4>
                            <textarea
                                placeholder="Enter additional notes about how you use this medicine..."
                                value={otherNotes}
                                onChange={(e) => setOtherNotes(e.target.value)}
                            />


                            <div>
                                <input
                                    type="checkbox"
                                    checked={repeatWeek}
                                    onChange={(e) => setRepeatWeek(e.target.checked)}
                                />
                                Would you like these medicine reminders to carry to future weeks?
                            </div>



                            
                            <button className="submit-modal" onClick={(e) => submitForm(e)}>This is Tim's Job 🥳 </button>
                        </form>
                        <br></br><br></br><br></br>

                        <button className="clear-modal" onClick={clearForm}>CLEAR FORM 😖</button>
                        <button className="close-modal" onClick={togglePopup}>CLOSE 🥺</button>
                    </div>
                </div>
            )}
        </>
    );
}
