import React, { useState } from 'react';
import DataDisplay from './MedicineAlerts';
import '../Dash-style.css';
import './styles.css';
import MedicineModal from './MedicineModal';
import { BsCaretLeftFill } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";


const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

const dateStyle = {
    textAlign: 'center', // Center the text
    fontSize: '100px',    // Increase font size
    marginTop: '0%',    // Adjust vertical positioning (optional)
};

const DateNavigator = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeDate = (delta) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + delta);
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-us", options);
    };

    return (
        <div style={{ textAlign: 'center' }}> {/* Center the entire content */}
        <h2 style={dateStyle}>{formatDate(currentDate)}</h2> 
{/* Apply the styles to the date */}
        <div className='date'>
        <div className='alignment'>
        <button className="todayButton" onClick={goToToday}>Today</button>
        <button className="arrow-left" aria-label="arrow-left" onClick={() => changeDate(-1)}><BsCaretLeftFill /></button>
        <button className="arrow-right" aria-label="arrow-right" onClick={() => changeDate(1)}><BsCaretRightFill /></button>
        </div>
        <DataDisplay date={currentDate.getDay()} />
        <MedicineModal date={currentDate.getDay()} />
        </div>
        </div>

    );
};

export default DateNavigator;
