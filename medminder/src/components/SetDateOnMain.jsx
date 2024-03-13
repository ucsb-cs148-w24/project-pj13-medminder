import React, { useState } from 'react';
import DataDisplay from './MedicineAlerts';
import '../Dash-style.css';
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
    fontSize: '80px',    // Increase font size
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

    const formatDatePicker = (date) => {
        return date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
    };

    const handleChange = (event) => {
        const parts = event.target.value.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            const date = new Date(year, month - 1, day);
            setCurrentDate(date);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={dateStyle}>
                {formatDate(currentDate)}
            </h2>
            <input type="date" value={formatDatePicker(currentDate)} onChange={handleChange}/>
            <div className='date'>
                <div className='alignment'>
                    <button className="arrow-left" aria-label="arrow-left" title="go to previous day" onClick={() => changeDate(-1)}><BsCaretLeftFill /></button>
                    <button className="todayButton" onClick={goToToday} title="go to today's date">Today</button>
                    <button className="arrow-right" aria-label="arrow-right" title="go to next day" onClick={() => changeDate(1)}><BsCaretRightFill /></button>
                </div>
                <DataDisplay date={currentDate.getDay()} dateObj={currentDate} />
                <MedicineModal date={currentDate.getDay()} />
            </div>
        </div>

    );
};

export default DateNavigator;
