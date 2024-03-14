import { useState } from 'react';
import EmailToggle from './EmailToggle';
import { update } from './update';
import { useAuthContext } from './AuthContext';
import { IoSettingsOutline } from "react-icons/io5";
import "../Dash-style.css";


const Settings = () => {
    const auth = useAuthContext();
    const [sex, setSex] = useState("")
    const[age, setAge] = useState(0)
    const[name, setName] = useState("")
    const[dob, setDob] = useState("")
    const email = auth.currentUser.email;
    const userId = auth.currentUser.uid;

    const[popup, setPopup] = useState(false)

    const submitForm = (event) =>{
        console.log("hi")
        event.preventDefault();
        update(name, sex, age, dob, email, userId, togglePopup)
    };

    const togglePopup = () => {
        setPopup(!popup);
    };

    return(
        <div>
            <button className='notifButton' onClick={togglePopup}>
            <IoSettingsOutline />
            </button>

            {popup && (
                <div className="modal">
                    <div onClick={togglePopup} className="overlay"></div>
                    <div className="modal-content">
                    <h1 className='main-header'> Update your settings </h1>
                    <h4 className='header'>Turn on/off Email Notifications</h4>
                    <EmailToggle/>
                    <h4 className='header'>Update your Name:</h4>
                    <input className='textbox'
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <h4 className='header'>Update your Age:</h4>
                    <input className='textbox'
                        type="number"
                        placeholder="Enter a number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                <h4 className='header'>Update your Gender:</h4>
                    <input className='textbox'
                        placeholder="Enter your gender"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    />

                <h4 className='header'>Update your Date of Birth</h4>
                    <input className='textbox'
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                <button className="submit-modal" onClick={(e) => submitForm(e)}>Update</button>
                <button className="close-modal" onClick={togglePopup}>Close</button>

                    </div>
                </div>
            )

            }
        </div>
    )


};

export default Settings