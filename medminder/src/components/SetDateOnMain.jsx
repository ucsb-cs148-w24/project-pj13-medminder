import React, { useState } from 'react';
import DataDisplay from './MedicineAlerts';

import './styles.css';
import '../Dash-style.css';
import MedicineToast from './MedicineToast';

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

const dateNavigatorStyle = {
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
};
  
const buttonStyle = {
    margin: '0 30px', // Add margin for spacing between buttons and date
};

const dateStyle = {
    textAlign: 'center', // Center the text
    fontSize: '100px',    // Increase font size
    width: '540px',
    height: '130px',
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
        <h2 style={dateStyle}>{formatDate(currentDate)}</h2> {/* Apply the styles to the date */}
        <div className='date'>
        <DataDisplay date={currentDate.getDay()} />
        <MedicineToast date={currentDate.getDay()} />
        </div>
        <button className="arrow-left" onClick={() => changeDate(-1)}></button>
        <button className="arrow-right" onClick={() => changeDate(1)}></button>
        <button className="todayButton" onClick={goToToday}>Today</button>
        </div>
    );
};

export default DateNavigator;
