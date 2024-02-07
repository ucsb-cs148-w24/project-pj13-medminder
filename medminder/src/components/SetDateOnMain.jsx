import React, { useState } from 'react';
import DataDisplay from './MedicineAlerts';
import '../Dash-style.css';


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

    const formatDate = (date) => {
        return date.toLocaleDateString("en-us", options);
    };

    return (
        <div style={{ textAlign: 'center' }}> {/* Center the entire content */}
        <button className="arrow-left" onClick={() => changeDate(-1)}></button>
        <h2 style={dateStyle}>{formatDate(currentDate)}</h2> {/* Apply the styles to the date */}
        <button className="arrow-right" onClick={() => changeDate(1)}></button>
        <DataDisplay date={currentDate.getDay()} />
        </div>
    );
};

export default DateNavigator;
