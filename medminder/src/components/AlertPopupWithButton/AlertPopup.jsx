// base code from https://www.youtube.com/watch?v=9DwGahSqcEc

import React, { useState } from "react";
import TextBox from "./TextBox.jsx";
import "./AlertPopup.css";
import "./ButtonStyles.css"

export default function AlertPopup(props) {
    const [popup, setPopup] = useState(false);
    const togglePopup = () => {
        setPopup(!popup);
    };

    if(popup) {
        document.body.classList.add('active-modal')
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
                        <div>
                            <form>
                                <h2>Add a Medicine</h2>
                                <h3>
                                    Medicine's Name:
                                    <br></br>
                                    <TextBox placeholder="Enter the name of the medicine..." rows="1"/>
                                </h3>
                                <h3>
                                    Date to Take Medicine:
                                    <br></br>
                                    <TextBox placeholder="Enter the date to take the medicine..." rows="1"/>
                                </h3>
                                <h3>
                                    Time to take Medicine:
                                    <br></br>
                                    <TextBox placeholder="Enter the time to take the medicine..." rows="1"/>
                                </h3>
                                <h3>
                                    Dosage Amount:
                                    <br></br>
                                    <TextBox placeholder="Enter the amount to take..." rows="1"/>
                                </h3>
                                <h3>
                                    Dosage Units:
                                    <br></br>
                                    <TextBox placeholder="Enter the units for that amount..." rows="1"/>
                                </h3>
                                <h3>
                                    Other Notes:
                                    <br></br>
                                    <TextBox placeholder="Enter any other notes that should be included..." rows="2"/>
                                </h3>
                                <input type="submit" value="This is Tim's Job"></input>
                            </form>
                        </div>

                        <button className="close-modal" onClick={togglePopup}>
                        CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
