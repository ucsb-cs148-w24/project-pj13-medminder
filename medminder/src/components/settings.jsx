import { useState, useEffect } from 'react';
import EmailToggle from './EmailToggle';
import { Update } from './update';
import { MdSettings } from "react-icons/md";
import "./AlertPopupWithButton/AlertPopup.css"
import "../Dash-style.css";
import { ref, get, child } from 'firebase/database';




const Settings = (props) => {
    
    const [sex, setSex] = useState("hi")
    const[age, setAge] = useState(5)
    const[name, setName] = useState("hi")
    const[dob, setDob] = useState(props.date)
    const userId = props.userId;
    const [numProfile, setProfile] = useState(1)
    const dataRef = ref(props.database);

    //Fill with existing values

    get(child(dataRef, `Users/${userId}/UserInfo/numProfiles`)).then((snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    
    const[popup, setPopup] = useState(false)
    useEffect(() => {
        setSex(props.sex);
    }, [props.sex])

    useEffect(() => {
        setName(props.name);
    }, [props.name])

    useEffect(() => {
        setAge(props.age);
    }, [props.age])

    useEffect(() => {
        setDob(props.dob);
    }, [props.dob])


    const submitForm = (event) =>{
        event.preventDefault();
        Update(name, sex, age, dob, userId, props.email, togglePopup, props.database, numProfile)
    };

    const togglePopup = () => {
        setPopup(!popup);
    };

   


    document.onkeydown = function (event) {
        if (event.key === "Escape") {
            setPopup(false);
        }
    };

    return(
        <div>
            <button className='notifButton' onClick={togglePopup}><MdSettings /></button>

            {popup && (
                <div className="modal" onClick={togglePopup}>
                    <div className="modal-content" onClick={(e) => {e.stopPropagation()}}>
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